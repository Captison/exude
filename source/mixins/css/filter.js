import subCss from '../sub-css'


/**
    Filter effects CSS properties.
    
    Classes: `filter`, `opacity`
    
    @requires styler
*/
export default
{
    aliases: [ 'filter', 'opacity' ],
  
    mixins:
    [
        subCss('filter', String, v => ({ filter: v })),
        subCss('opacity', [String, Number], v => ({ opacity: v })),
    ],
  
    props:
    {
        /**
            CSS filter value.

            - use `hFilter` prop to specify hover filter
            - use `fFilter` prop to specify focus filter
        */
        filter: String,
        /**
            CSS opacity value.

            - use `hOpacity` prop to specify hover opacity
            - use `fOpacity` prop to specify focus opacity
        */
        opacity: [ String, Number ]  
    }    
}
