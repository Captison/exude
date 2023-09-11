import * as css from './css'


/**
    Box mixin.
    
    @requires styler
*/
export default
{
    mixins: 
    [
        css.boxSizing, 
        css.clip, 
        css.colors, 
        css.cursor, 
        css.dims, 
        css.extendable, 
        css.filter, 
        css.flexChild,     
        css.frame, 
        css.gridChild, 
        css.hide, 
        css.layout, 
        css.margin, 
        css.pad, 
        css.perspective, 
        css.squareDims, 
        css.stack, 
        css.transform 
    ],
    
    props:
    {
        /**
            Root HTML element.
            
            Unused attrivutes are applied to this element.
        */
        el: { type: String, default: 'div' },
        /**
            Sets a 'data-inactive' attribute.
        */
        inactive: Boolean,
    },
    
    emits:
    {
        /**
            On hover/unhover.
            
            @param { boolean } isHovered
              Is element currently hovered?
        */
        hover(isHovered) { return typeof isHovered === 'boolean'; }
    },
    
    mounted()
    {
        if (this.$hearers.hover)
        {
            this.$el.addEventListener('mouseenter', () => this.$emit('hover', true));
            this.$el.addEventListener('mouseleave', () => this.$emit('hover', false));
        }
    }
}
