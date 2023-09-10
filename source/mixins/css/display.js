
/**
    Display CSS property mixin.
    
    Classes: `display`
    
    @requires styler
*/
export default
{
    aliases: [ 'display' ],
  
    props:
    {
        /**
            Display as block element?
            
            Ignored if `display` is set.
        */
        block: Boolean,
        /**
            Display as flex element?

            Ignored if `display` or `block` is set.
        */
        flex: Boolean,
        /**
            Display as grid element?

            Ignored if `display`, `block` or `flex` is set.
        */
        grid: Boolean,
        /**
            CSS display value.
        */
        display: String,
        /**
            Display as inline element?

            Ignored if `display` is set.
        */
        inline: Boolean,
    },
    
    computed:
    {
        displayCss() 
        {
            if (this.display) return { display: this.display };
            if (this.block) return { display: this.inline ? 'inline-block' : 'block' };
            if (this.flex) return { display: this.inline ? 'inline-flex' : 'flex' };
            if (this.grid) return { display: this.inline ? 'inline-grid' : 'grid' };
            if (this.inline) return { display: 'inline' };
        }                
    }
}
