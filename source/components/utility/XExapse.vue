<template>
  <x-box v-bind="boxProps" :overflow="overflow" v-on="$hearers">
    <x-flex v-observe-resize="handleResize" invert :inline="horiz" :margin="margin" :pad="pad">
      <!-- @slot expandable/collapsible content -->
      <slot />
    </x-flex>
  </x-box>
</template>


<script>
import { observeResize } from '_source/directives'
import { toSunits } from '_styles/loaders'
import XBox from '_components/layout/XBox'
import XFlex from '_components/layout/XFlex'


/**
    Expands and collapses (exapses) content.
*/
export default
{
    name: 'XExapse',
    
    components: { XBox, XFlex },    

    directives: { observeResize },
    
    props:
    {
        /**
            Scale unit length for non-expanding dimension.
        */
        breadth: [ String, Number ],
        /**
            Expand content?
        */
        expand: Boolean,
        /**
            Scale unit expansion length.
        */
        extent: Number,
        /**
            Expand on the horizontal axis?
            
            By default the expansion is vertical.
        */
        horiz: Boolean,
        /**
            Expand from the lower edge?
            
            The lower edge is bottom (`horiz = false`) or right 
            (`horiz = true`).
        */
        lower: Boolean,
        /**
            Maximum scale unit length for non-expanding dimension.
        */
        maxBreadth: [ String, Number ],
        /**
            Maximum scale unit expansion length.            
        */
        maxExtent: Number,
        /**
            Minimum scale unit length for non-expanding dimension.
        */
        minBreadth: [ String, Number ],
        /**
            Prevent scrolling?
        */
        noScroll: Boolean,
        /**
            Space-separated list of directional padding values for content box.
            @see `XBox.pad` for details.
        */
        pad: String
    },
    
    emits:
    {
        /**
            On content resize.
            
            @param { object } value
              Content container element.
        */
        'content-resize'(value) { /* nothing to check */ },      
    },

    data: () => ({ contentExtent: 0 }),
    
    computed:
    {   
        boxProps()
        {
            let props = { ...this.$attrs };
            let { breadth, current, maxBreadth, minBreadth } = this;
          
            if (this.horiz)
            {
                props.width = current;
                
                props.height = breadth || 'auto';
                props.maxHeight = maxBreadth;
                props.minHeight = minBreadth;
            }
            else
            {
                props.height = current;

                props.width = breadth || 'auto';
                props.maxWidth = maxBreadth;
                props.minWidth = minBreadth;
            }
                      
            return props;
        },
         
        current() { return this.expand ? this.limit : 0; },
        
        limit() 
        {
            if (typeof this.extent === 'number') 
              return this.extent; 
              
            if (typeof this.maxExtent === 'number')
              return Math.min(this.contentExtent, this.maxExtent);
              
            return this.contentExtent;
        },
        
        margin()
        {
            let { horiz, lower } = this;
            let dir = horiz === lower ? (horiz ? 'r' : 't') : (horiz ? 'l' : 'b');

            return dir + (this.current - this.limit);
        },
        
        overflow() { return this.noScroll ? 'hidden' : 'auto'; }
    },
    
    methods:
    {
        handleResize([ entry ])
        {
            let { offsetHeight, offsetWidth } = entry.target;
            this.contentExtent = toSunits((this.horiz ? offsetWidth : offsetHeight) || 0);
            
            this.$emit('content-resize', entry.target);
        }      
    }
}
</script>
