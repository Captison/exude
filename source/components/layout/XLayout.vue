<script>
import { styler } from '_source/mixins'
import { toPixels } from '_styles/loaders'
import XFlex from '_components/layout/XFlex'


/**
    Flex-based layout manager.

    Only __XLayoutCell__ component children are accepted.

    Unused attributes passed to __XFlex__.
*/
export default
{
    name: 'XLayout',

    mixins: [ styler ],
    
    props:
    {
        /**
            Number of columns in layout.
        */
        cols: [ String, Number ],
        /**
            Scale-unit column gutter width.
        */
        colGap: [ String, Number ],
        /**
            Scale-unit row gutter width.
        */
        rowGap: [ String, Number ],
        /**
            Default number of columns to span for cells in this layout.
        */
        span: [ String, Number ]
    },

    computed:
    {
        baseAttrs()
        {
            let attrs = 
            { 
                ...this.$attrs,
                invert: false,
                wrap: true,
                // prevent changes to the attributes below
                aligns: null,
                margin: null
            }
            
            return attrs;
        },
        
        // Dynamic CSS 

        baseCss()
        {
            let cols = parseFloat(this.cols) || 2;
            let span = parseFloat(this.span) || 1;
            
            let colGap = toPixels(this.colGap || 0);
            let rowGap = toPixels(this.rowGap || 0);

            let style =
            {
                margin: `${rowGap / -2}px ${colGap / -2}px`,

                '--layout-columns': cols,
                '--layout-cell-span': span,
                '--layout-gutters': (colGap * cols) + 'px',
                '--layout-gutter-width': colGap + 'px',

                '> div': { margin: `${rowGap / 2}px ${colGap / 2}px` }
            };

            return style;
        }
    },

    render(h)
    {
        let re = /XLayoutCell$/;
        // skip nodes that are not layout cells
        let nodes = (this.$slots.default || []).filter(node => re.test(node.tag));

        return h(XFlex, { attrs: this.baseAttrs, class: this.cn('base') }, nodes);
    }
}
</script>
