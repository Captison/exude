import vars from '../vars'


/**
    Returns CSS time value for a duration enum.
    
    If `value` is a number, seconds is assumed.

    @param { string | number } value
      Duration enum or value.
    @return { string }
      CSS duration value.
*/
export default function duration(value)
{
    let { time } = vars.transition;
    // check for enumeration
    if (time[value]) return time[value];
    // if number assume seconds
    if (typeof value === 'number') return value + 's';
    // assume valid CSS duration value
    return value;
}
