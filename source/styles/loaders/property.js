import vars from '../vars'


/**
    Returns CSS property list for a property enum.
    
    @param { string } value
      Property enum or property list.
    @return { string }
      CSS property list.
*/
export default function property(value)
{
    let { property } = vars.transition;
    // check for enumeration
    if (property[value]) return property[value];
    // assume valid CSS property list
    return value;
}
