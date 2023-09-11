import { trbl } from '_styles/loaders'
import subCss from '../sub-css'


/**
    Stacking context related CSS properties.
    
    Classes: `pos`, `trbl`, `zIndex`
    
    @requires styler
*/
export default
{
    aliases: [ 'pos', 'trbl', 'zIndex' ],
  
    mixins:
    [
        subCss('zIndex', [String, Number], value => ({ zIndex: value })),
    ],
  
    props:
    {
        /**
            Set element as absolute positioned?
            
            Ignored if `pos` is set.
        */
        absolute: Boolean,
        /**
            Set element as fixed positioned?
            
            Ignored if `pos` is set.
        */
        fixed: Boolean,
        /**
            CSS position value.
        */
        pos: String,
        /**
            Set element as relative positioned?
            
            Ignored if `pos` is set.
        */
        relative: Boolean,
        /**
            Space-separated list of scale unit directional values.

            Each value takes the form `nX` where `n` can be

            - `t` = top
            - `r` = right
            - `b` = bottom
            - `l` = left
            - `v` = top & bottom
            - `h` = left & right
            - `a` = top, right, bottom & left

            and `X` is the number of scale units (or valid CSS length).

            Values are merged from left to right.
        */
        trbl: String,      
        /**
            CSS z-index value.

            - use `hZIndex` prop to specify hover z-index
            - use `fZIndex` prop to specify focus z-index
        */
        zIndex: [ String, Number ]
    },
    
    computed:
    {
        posCss() 
        { 
            if (this.pos) return { position: this.pos }; 
            if (this.relative) return { position: 'relative' }; 
            if (this.absolute) return { position: 'absolute' }; 
            if (this.fixed) return { position: 'fixed' }; 
        },

        trblCss() { return this.trbl && trbl(this.trbl); },      
    }
}
