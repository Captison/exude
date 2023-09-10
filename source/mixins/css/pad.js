import { trbl } from '_styles/loaders'


/*
    CSS padding mixin.
    @requires styler
*/
export default
{
    aliases: [ 'pad' ],
  
    props:
    {
        /**
            Space-separated list of scale unit padding values.

            Each value takes the form `nX` where `n` can be

            - `t` = top
            - `r` = right
            - `b` = bottom
            - `l` = left
            - `v` = top & bottom
            - `h` = left & right
            - `a` = top, right, bottom & left

            and `X` is the number of scale units.

            Values are merged from left to right.
        */
        pad: String
    },

    computed:
    {
        padCss() { return this.pad && trbl(this.pad, 'padding'); }
    }
}
