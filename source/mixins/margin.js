import { trbl } from '_styles/loaders'


/*
    CSS margin mixin.
    @requires styler
*/
export default
{
    props:
    {
        /**
            Space-separated list of scale unit margin values.

            Each value takes the form `nX` where `n` can be

            - `t` = top
            - `r` = right
            - `b` = bottom
            - `l` = left
            - `v` = top & bottom
            - `h` = left & right
            - `a` = top, right, bottom & left

            and `X` is the number of scale units or 'auto'.

            Values are merged from left to right.
        */
        margin: String
    },

    computed:
    {
        marginCss() { return this.margin && trbl(this.margin, 'margin'); }
    }
}
