import { ifnum } from '_lib/utils'
import vars from '../vars'


/**
    Converts sangle (scale angles) into degrees.

    @param { string | number } sangle
      Amount of scale degrees.  A string is parsed as a number.
    @return { number }
      Degrees, `0`, or `NaN` (unparseable string).
*/
export default function toDegrees(sangle)
{
    if (typeof sangle === 'number')
        return sangle * vars.basis.sangle;
    if (typeof sangle === 'string')
        return parseFloat(sangle) * vars.basis.sangle;
    
    return 0;
}

toDegrees.str = (value) => ifnum(value, v => toDegrees(v) + 'deg')
toDegrees.str.spaced = (value) => (value || '').split(/\s+/).map(toDegrees.str).join(' ')
