import vars from '../vars'


/**
    Converts pixels into sunits (scale units).

    @param { string | number } pixels
      Number of scale units.  A string is parsed as a number.
    @return { number }
      Scale units, `0`, or `NaN` (unparseable string).
*/
export default function(pixels)
{
    if (typeof pixels === 'number')
        return pixels / vars.basis.sunit;
    if (typeof pixels === 'string')
        return parseFloat(pixels) / vars.basis.sunit;
    
    return 0;
}
