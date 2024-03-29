import cssm from '_css/mapper'
import subCss from '../sub-css'


/**
    Color CSS properties (background/foreground).
    
    Classes: `colors`
    
    @requires styler
*/
export default
{
    aliases: [ 'colors' ],
  
    mixins:
    [
        subCss('colors', String, cssm.colors)
    ],
  
    props:
    {
        /**
            Foreground and background colors.
            
            This takes the form `foreground:background`.        

            - use `hColors` prop to specify hover colors
            - use `fColors` prop to specify focus colors
        */
        colors: String
    }    
}
