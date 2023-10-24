import cssm from '_css/mapper'
import { trbl } from '_css/rule'


/**
    Stacking context related CSS properties.
    
    Classes: `pos`, `trbl`, `zIndex`
    
    @requires styler
*/
export default
{
    aliases: [ 'pos', 'trbl', 'zIndex' ],
  
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
            CSS position and direction values. 
            
            Takes the form `position:top:left:bottom:right`.
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
        */
        zIndex: [ String, Number ]
    },
    
    computed:
    {
        posCss() { return cssm.position([ this.fixed, this.absolute, this.relative, this.pos ]); },

        trblCss() { return cssm.trbl(this.trbl); },
        
        zIndexCss() { return cssm.zIndex(this.zIndex); }    
    }
}
