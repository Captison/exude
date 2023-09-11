<template>
  <x-flex v-bind="cellAttrs" :class="cn('span')">
    <div :class="cn('contentWidth contentMaxWidth')">
      <!-- @slot cell content -->
      <slot />
    </div>
  </x-flex>
</template>


<script>
import { styler } from '_source/mixins'
import { length } from '_styles/loaders'
import XFlex from '_components/layout/XFlex'


/**
    A content cell for flex-based layout.
    
    This component works only as a child of __XLayout__.
    
    Unused attributes passed to __XFlex__.
*/
export default
{
    name: 'XLayoutCell',

    mixins: [ styler ],
    
    components: { XFlex },

    props:
    {
        /**
            Colon-separated content alignment positions (`vertical:horizontal`).

            @values vert: (top, center, bottom)
            @values horiz: (left, center, right)
        */
        anchor: String,
        /**
            Force full width content cell?
            
            Content cell will use all available width up to `maxWidth`.
        */
        expanded: Boolean,
        /**
            Maximum content cell width.

            - as a string this is a valid CSS max-width value
            - as a number this is a pixel unit value
        */
        maxContentWidth: [ String, Number ],
        /**
            Number of columns to span for this cell.
        */
        span: [ String, Number ]
    },

    data: () =>
    ({
        hanch: { left: 'flex-start', center: 'center', right: 'flex-end' },
        vanch: { top: 'flex-start', center: 'center', bottom: 'flex-end' }
    }),

    computed:
    {
        aligns() 
        {            
            let [ vert, horiz ] = (this.anchor || '').split(/:/);
            
            let alignItems = this.hanch[horiz] || 'stretch';
            let justifyContent = this.vanch[vert] || 'stretch';
            
            return `:${alignItems}:${justifyContent}`;
        },
        
        cellAttrs()
        {
            // remove additional attributes
            let attrs = 
            { 
                ...this.$attrs,
                invert: true,
                aligns: this.aligns,
                // prevent changes to the attributes below
                height: null, 
                margin: null, 
                'max-height': null, 
                'max-width': null, 
                'min-width': null, 
                width: null
            }
            return attrs;
        },
        
        // Dynamic CSS 
        
        contentMaxWidthCss() { return this.maxContentWidth && { maxWidth: length(this.maxContentWidth) }; },

        contentWidthCss() { return this.expanded && { width: '100%' }; },

        spanCss()
        {
            let style =
            {
                width: `calc(((100% - var(--layout-gutters)) / var(--layout-columns) * var(--layout-cell-span)) + ` +
                    `(var(--layout-gutter-width) * (var(--layout-cell-span) - 1)))`
            };
            // possible override of default span setting from parent
            if (this.span) style['--layout-cell-span'] = parseFloat(this.span) || 1;
            
            return style;
        }        
    }
}
</script>
