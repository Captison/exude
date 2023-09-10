import { unwind } from '_lib/utils'
import vars from '../vars'


/**
    Returns LCO value(s) for specified selector enumerations in the LCO.
    
    @param { string } names
      Name of selector(s) to return.
    @return { string }
      The selectors found or original values.
*/
export default function(names)
{
    return unwind.list(vars.selector.named, names);
}
