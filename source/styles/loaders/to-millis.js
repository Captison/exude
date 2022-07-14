import { ifnum } from '_lib/utils'
import vars from '../vars'


/**
    Converts stime (scale time) into milliseconds.

    @param { string | number } stime
      Amount of scale time.  A string is parsed as a number.
    @return { number }
      Milliseconds, `0`, or `NaN` (unparseable string).
*/
export default function toMillis(stime)
{
    if (typeof stime === 'number')
        return stime * vars.basis.stime;
    if (typeof stime === 'string')
        return parseFloat(stime) * vars.basis.stime;
    
    return 0;
}

toMillis.str = (value) => ifnum(value, v => toMillis(v) + 'ms')
toMillis.str.spaced = (value) => (value || '').split(/\s+/).map(toMillis.str).join(' ')
