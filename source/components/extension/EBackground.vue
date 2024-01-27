<script>
import { extension, styler } from '_source/mixins'
import cssm from '_css/mapper'
import { inject } from '_css/value'


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
            let { $attrs, attach, clip, image, origin, pos, repeat, size } = this;
            return cssm.background({ attach, clip, image: inject(image, $attrs), origin, pos, repeat, size });
        }
    }
}
</script>
