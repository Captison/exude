import { unwind } from '_lib/utils'
import color from './color'
import vars from '../vars'


/**
    Converts enumerated box shadow definitions into CSS.
    
    Multiple shadow definitions can be specified in a string by separating with 
    commas.
    
    @param { string | arrau } value
      Box shadow and color definition (`shadow!color`)
    @return { string }
      CSS box-shadow value(s).
*/
export default function shadow(value)
{
    let { named = {} } = vars.shadow;
    
    let results = unwind.list(named, value).map(spec => 
    {        
        let parts = spec.split(/\s+/);
        return parts.slice(0, -1).join(' ') + ' ' + color(parts.slice(-1)[0]);        
    });
    
    return results.length ? results.join(', ') : undefined;
}
