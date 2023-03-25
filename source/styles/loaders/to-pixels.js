import { ifnum } from '_lib/utils'
import vars from '../vars'


/**
    Converts sunits (scale units) into pixels.

    @param { string | number } sunits
      Number of scale units.  A string is parsed as a number.
    @return { number }
      Pixels, `0`, or `NaN` (unparseable string).
*/
export default function toPixels(sunits)
{
    if (typeof sunits === 'number')
        return sunits * vars.basis.sunit;
    if (typeof sunits === 'string')
        return parseFloat(sunits) * vars.basis.sunit;
    
    return 0;
}

toPixels.spaced = (value) => (value || '').split(/\s+/).map(toPixels).join(' ')
toPixels.str = (value) => ifnum(value, v => toPixels(v) + 'px')
toPixels.str.spaced = (value) => (value || '').split(/\s+/).map(toPixels.str).join(' ')
