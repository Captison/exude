import { unwind } from '_lib/utils'
import toPixels from './to-pixels'
import vars from '../vars'


/**
    Returns the CSS length value for an enumerated LCO length.
    
    @param { string } name
      Name of length to return.
    @return { string }
      A valid CSS length value.
*/
export default function length(name)
{
    return toPixels.str(unwind(vars.length.named, name));    
};

length.spaced = (value) => (value || '').split(/\s+/).map(length).join(' ')
