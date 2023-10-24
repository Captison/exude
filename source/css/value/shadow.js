import { unwind } from '_lib/utils'
import color from './color'
import toRaw from './to-raw'
import lco from '_source/lco'


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
    let { basis: { sep }, shadow: { named } } = lco;
    
    let values = unwind.list(named, value).map(spec => 
    {        
        let parts = spec.split(sep.ws);
        let [ lens, clr ] = [ parts.slice(0, -1), parts.slice(-1)[0] ];
        
        return [ ...lens.map(len => toRaw.extent.str(len)), color(clr) ].join(' ');
    });
    
    return values.join(', ');
}
