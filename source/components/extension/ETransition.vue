<script>
import { extension, styler } from '_source/mixins'
import { toMillis } from '_styles/loaders'


/**
    Extension component for transition behavior.

    Adds style rules to its nearest extendable ancestor
    (__XApp__, __XBox__, __XFlex__, __XGrid__, __XText__).

    This component renders nothing in place.   
*/
export default
{
    name: 'ETransition',
    
    mixins: [ styler, extension ],
    
    props:
    {
        /**
            CSS transition-delay value.

            Unitless numbers are treated as scale time.
        */
        delay: [ String, Number ],
        /**
            CSS transition-duration value.

            Unitless numbers are treated as scale time.
        */
        duration: [ String, Number ],
        /**
            CSS transition-property value.
        */
        property: String,
        /**
            CSS transition-timing-function value.
        */
        timing: String
    },
    
    data: () => ({ extCat: 'transitions' }),
    
    computed:
    {
        sheet() { return this.cs('extension', this.useSel); },  
      
        // Dynamic CSS
        
        extensionCss()
        {
            let css =
            {
                transitionDelay: toMillis.str(this.delay) || 'initial',
                transitionDuration: toMillis.str(this.duration) || 'initial',                
                transitionProperty: this.property || 'all',
                transitionTimingFunction: this.timing || 'initial'              
            };
            
            return css;
        }
    }
}
</script>
