import { unwind } from '_lib/utils'
import vars from '../vars'


/**
    Converts enumerated media query definitions into CSS.
    
    @param { string | arrau } value
      Media query definition.
    @return { string }
      CSS media query value.
*/
export default function(value)
{
    return unwind(vars.media.named, value);    
}
