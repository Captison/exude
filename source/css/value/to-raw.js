import { ifnum, unwind } from '_lib/utils'
import lco from '_source/lco'


let map = { angle: 'angle', length: 'extent', time: 'time' };
/**
    Converts numerical scale units into raw units.
    
    The `name` parameter can be an enumerated 'measure' from the LCO.

    @param { string | number } name
      Number of scale units.  A string is parsed as a number.
    @param { string } type
      Scale unit type ('angle', 'length', or 'time').
    @return { number }
      Pixels, `0`, or `NaN` (unparseable string).
*/
export default function toRaw(name, type = 'length')
{
    let { scale } = lco.basis;

    let value = unwind(lco.measure[type], name);
    // convert number to string as possible
    if (typeof value === 'string') value = parseFloat(value);
    
    if (typeof value === 'number')
        return value * scale[type]?.num;  
    
    return 0;
}

Object.keys(map).forEach(type => 
{
    let tor = name => toRaw(name, type)

    tor.spaced = name => (name || '').split(/\s+/).map(tor).join(' ')
    tor.str = name => ifnum(unwind(lco.measure[type], name), v => tor(v) + lco.basis.scale[type]?.unit)
    tor.str.spaced = name => (name || '').split(/\s+/).map(tor.str).join(' ')
    
    toRaw[map[type]] = tor;
});
