
let map =
{
    b: 'double',
    d: 'dashed',
    g: 'groove',
    n: 'none',
    h: 'hidden',
    i: 'inset',
    o: 'outset',
    r: 'ridge',
    s: 'solid',
    t: 'dotted'
};
/**
    Returns the CSS border-style value for an enumerated value.

      - 'b': double
      - `d`: dashed
      - `g`: groove
      - `n`: none
      - `h`: hidden
      - `i`: inset
      - `o`: outset
      - `r`: ridge
      - `s`: solid
      - 't': dotted
    
    @param { string } value
      Border style enumeration to be interpreted.
    @return { string }
      Mapped CSS border-style value or `value` if not found.
*/
export default function(value)
{
    return map[value] || value;  
}
