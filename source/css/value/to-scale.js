import lco from '_source/lco'


let map = { angle: 'angle', length: 'extent', time: 'time' };
/**
    Converts numerical raw units into scale units.

    @param { string | number } value
      Number of raw units.  A string is parsed as a number.
    @return { number }
      Scale units, `0`, or `NaN` (unparseable string).
*/
export default function toScale(value, type = 'length')
{
    let { scale } = lco.basis;
    // convert number to string as possible
    if (typeof value === 'string') value = parseFloat(value);
    
    if (typeof value === 'number')
        return value / scale[type]?.num;
    
    return 0;
}

['angle', 'length', 'time'].forEach(type => 
{
    let tos = name => toScale(name, type)
    
    toScale[map[type]] = tos;
});
