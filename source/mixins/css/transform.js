import { transform } from '_styles/loaders'
import subCss from '../sub-css'


/**
    CSS transform properties.
    
    Classes: `transform`, `transformOrigin`
    
    @requires styler
*/
export default
{
    aliases: [ 'trans', 'transOrigin' ],
  
    mixins:
    [
        subCss('trans', String, transform),
    ],
  
    props:
    {
        /**
            CSS transform specifications.
            
            The value should take the form `faX` where:            
              - `f` is a letter for CSS transform function
                - `s` for scale (scalar)
                - `k` for skew (degrees)
                - `t` for translate (pixels)
                - `r` for rotate (degrees)
              - `a` is a letter for the transform axis `x`, `y`, or `z`
              - `X` is a numerical parameter for the transform function
              
            Use spaces to specify multiple transformations.

            - use `hTrans` prop to specify hover transformations
            - use `fTrans` prop to specify focus transformations
        */
        trans: String,
        /**
            CSS transform-origin value.
        */
        transOrigin: String,
    },
    
    computed:
    {
        transOriginCss() { return this.transOrigin && { transformOrigin: this.transOrigin }; }      
    }
}
