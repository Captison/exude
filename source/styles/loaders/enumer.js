import { unwind } from '_lib/utils'
import vars from '../vars'


/**
    Resolves enumerations from the LCO.
    
    Use commas to specify multiple enumerations in `names`.

    @param { string } names
      Enumeration name(s) of the configs to get.
    @return { array }
      List of resolved LCO configs. 
*/
export default function(names, type) 
{
    return unwind.list(vars[type].named, names);
}
