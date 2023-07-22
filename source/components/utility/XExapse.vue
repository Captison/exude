<template>
  <x-box v-bind="boxProps" :overflow="overflow" v-on="$hearers">
    <x-flex v-observe-resize="handleResize" v-bind="flexProps">
      <!-- 
          @slot expandable/collapsible content 
      -->
      <slot :collapse="expandOff" :expand="expandOn" />
    </x-flex>
  </x-box>
</template>


<script>
import { toggle } from '_source/mixins'
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
    
    mixins: [ toggle('expand') ],

    components: { XBox, XFlex },    

    directives: { observeResize },
    
    props:
    {
        /**
            Scale unit length for non-expanding dimension.
        */
        breadth: [ String, Number ],
        /**
            Foreground and background colors for the callapsible container.
            @see `XBox.colors` for details.
        */
        colors: String,
        /**
            Expand content?
        */
        expand: Boolean,
        /**
            Scale unit expansion length.
            
            Expansion length is determined by the content if omitted.
        */
        extent: Number,
        /**
            Expand on the horizontal axis?
            
            By default the expansion is vertical.
        */
        horiz: Boolean,
        /**
            Invert internal content box (flex)?
            @see `XFlex.invert` for details.
        */
        invert: Boolean,
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
            
            Used to control the maximum expansion length the content can force.
            
            Ignored when `extent` is present.    
        */
        maxExtent: Number,
        /**
            Minimum scale unit length for non-expanding dimension.
        */
        minBreadth: [ String, Number ],
        /**
            Minimum scale unit expansion length.
        */
        minExtent: { type: Number, default: 0 },
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
         
        current() { return this.expand ? this.limit : this.minExtent; },
        
        flexProps()
        {
            let { colors, horiz, invert, margin, pad } = this;          
            let props = { colors, invert, inline: horiz, margin, pad };
            // allow fixing of internal extent if set
            if (this.extent)
            {
                let dim = 'min' + (this.horiz ? 'Width' : 'Height');
                props[dim] = '100%';
            }
            // allow fixing of internal breadth if set
            if (this.breadth || this.minBreadth)
            {
                let dim = 'min' + (this.horiz ? 'Height' : 'Width');
                props[dim] = '100%';
            }

            return props;
        },
        
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
