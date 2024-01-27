import equals from './equals'


/**
    Returns `true` if `value` is not undefined or null.
    
    @param { any } value
      Value to be checked.
    @return { boolean }
      Returns `false` if `value` is undefined or null.
*/
export default function exists(value)
{
    return typeof value !== 'undefined' && value !== null;
}

exists.andNotEmpty = value => exists(value) && value !== '' && !equals(value, []) && !equals(value, {})
