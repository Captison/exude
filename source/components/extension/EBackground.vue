<script>
import { extension, styler } from '_source/mixins'
import { inject, toRaw } from '_css/value'


/**
    Extension component for background styles.

    Adds style rules to its nearest extendable ancestor
    (__XApp__, __XBox__, __XFlex__, __XGrid__, __XText__).

    This component renders nothing in place.   
*/
export default
{
    name: 'EBackground',
    
    mixins: [ styler, extension ],
    
    props:
    {
        /**
            CSS background-attachment value.
        */
        attach: String,
        /**
            CSS background-clip value.
        */
        clip: String,
        /**
            Enumerated image value or CSS background-image value.
        */
        image: String,
        /**
            CSS background-origin value.
        */
        origin: String,
        /**
            CSS background-position value.
            
            Unitless numbers are treated as scale units.
        */
        pos: String,
        /**
            CSS background-repeat value.
        */
        repeat: String,
        /**
            CSS background-size value.

            Unitless numbers are treated as scale units.
        */
        size: String,
    },
    
    data: () => ({ extCat: 'backgrounds' }),
    
    computed:
    {
        sheet() { return this.cs('extension', this.useSel); },  
        
        // Dynamic CSS
        
        extensionCss()
        {
            let css =
            {
                backgroundAttachment: this.attach,                
                backgroundClip: this.clip,
                backgroundImage: inject(this.image, this.$attrs),                
                backgroundOrigin: this.origin,
                backgroundPosition: toRaw.extent.str.spaced(this.pos),
                backgroundRepeat: this.repeat,                
                backgroundSize: toRaw.extent.str.spaced(this.size)
            };
            
            return css;
        }
    }
}
</script>
