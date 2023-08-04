
let dirs = [ 't', 'r', 'b', 'l' ];
let re =
{
    split: /\s+/,

    top: /[tva]/,
    right: /[rha]/,
    bottom: /[bva]/,
    left: /[lha]/
};
let defaultSettle = (key, val) => ({ [key]: val })

/**
    Converts space-separated list of values to CSS top, right, bottom, 
    and left values.

    Each value takes the form `nX` where `n` can be

    - `t` = top
    - `r` = right
    - `b` = bottom
    - `l` = left
    - `v` = top & bottom
    - `h` = left & right
    - `a` = top, right, bottom & left

    and `X` is the value to be applied. Values are merged from left to right.
    
    Ultimately, each individual directional value is passed to `settle` along
    with the its final value.  The `settle` must return an object with the CSS 
    rule(s) to be applied.

    @param { string } value
      Direction values to be parsed.
    @param { function } settle
      Resolves CSS for direction value
      (`settle(letter: string, value: string): object`).
    @return { object }
      Result of settled properties.
*/
export default function(value, settle)
{
    if (value)
    {
        let styles = [ "", "", "", "" ];

        value.split(re.split).forEach(str =>
        {
            let dir = str.slice(0, 1), val = str.slice(1);
            // top, vert, all
            if (re.top.test(dir)) styles[0] = val;
            // right, horiz, all
            if (re.right.test(dir)) styles[1] = val;
            // bottom, vert, all
            if (re.bottom.test(dir)) styles[2] = val;
            // left, horiz, all
            if (re.left.test(dir)) styles[3] = val;
        });
        
        let sfn = settle || defaultSettle;
        // settle CSS key value pairs
        return styles.reduce((obj, val, idx) => (val === "" ? obj : { ...obj, ...sfn(dirs[idx], val) }), {});
    }
}
