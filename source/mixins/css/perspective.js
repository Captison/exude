import { length, position } from '_styles/loaders'
import subCss from '../sub-css'


/**
    CSS perspective related properties.
    
    Classes: `pers`, `persOrigin`, `hideBack`
    
    @requires styler
*/
export default
{
    aliases: [ 'pers', 'persOrigin', 'hideBack' ],
  
    mixins:
    [
        subCss('pers', [String, Number], v => ({ perspective: length(v) }))
    ],
  
    props:
    {
        /**
            Is the back of this box hidden from view (CSS backface-visibility)?
        */
        hideBack: Boolean,
        /**
            CSS perspective value.

            Scale units is assumed when number is given.
            
            - use `hPers` prop to specify hover perspective
            - use `fPers` prop to specify focus perspective
        */
        pers: [ String, Number ],
        /**
            CSS perspective-origin value.
        */
        persOrigin: String
    },
    
    computed:
    {
        hideBackCss() { this.hideBack && { backfaceVisibility: 'hidden' }; },
        
        persOriginCss() { this.persOrigin && { perspectiveOrigin: position(this.persOrigin) }; }
    }
}
