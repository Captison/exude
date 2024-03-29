import { cacher, unwind } from '_lib/utils'
import color from 'color'
import lco from '_source/lco'


let reOp = /^[bdfglnorsuw]-?\d*([.]\d+)?$/;
let map =
{
    b: 'blacken',
    d: 'darken',
    f: 'fade',
    g: 'grayscale',
    l: 'lighten',
    n: 'negate',
    o: 'opaquer',
    r: 'rotate',
    s: 'saturate',
    u: 'desaturate',
    w: 'whiten'
};
/**
    Returns the CSS color value for a named library color.

    Note that `name` can be suffixed with `_xa` to trigger a transformation on the 
    color where `x` is the letter:
    
      - `b`: to blacken the color
      - `d`: to darken the color
      - `f`: to fade the color
      - `g`: to grayscale the color
      - `l`: to lighten the color
      - `n`: to negate the color
      - `o`: to opaquer the color
      - `r`: to rotate the color
      - `s`: to saturate the color
      - `u`: to desaturate the color
      - `w`: to whiten the color
    
    and `a` is an optional argument to the transformation.
    
    Use consecutive suffixes to stack effects.
        
    Please see the documentation for the `color` dependency for details on 
    the above functions.

    @param { string } name
      Name (or hex value) of color to return.
    @return { string }
      A valid CSS color value.  The `name` parameter (less any suffix) is
      returned if color name cannot be resolved.
*/
export default cacher(name =>
{
    let { named } = lco.color;
    // check for a transform extension
    let [ base, ...ext ] = (name || '').split(/_/);
    
    let value = unwind(named, base);
    
    if (ext.length)
    {
        let reducer = (c, t) => reOp.test(t) ? c[map[t.slice(0, 1)]](parseFloat(t.slice(1))) : c                        
        return ext.reduce(reducer, color.rgb(value)).rgb().string();
    }
    
    return value;      
});
