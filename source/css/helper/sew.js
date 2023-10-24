import { exists } from '_lib/utils'
import lco from '_lco'
import { splitter } from '_lco/utils'


/**
    Sews a delimited list of values into a CSS ruleset.
    
    @param { array | object } values
      Values to be sewn.
    @param { array(string|object) } schemes
      List of CSS props or object (`{ attr, proc }`).
      This must be in same order as `values`.
    @return { object }
      Resulting ruleset or empty object.
*/
export default function sew(values, schemes)
{
    let rules = {};        
    
    if (exists(values) && typeof values === 'object')
    {
        let isArr = Array.isArray(values);
      
        (schemes || []).forEach(({ alias, attr, proc, def }, index) => 
        {
            let val = isArr ? values[index] : alias && Object.hasOwn(values, alias) ? values[alias] : values[attr];
            
            if (!exists.andNotEmpty(val)) val = def;
            if (val === true) val = alias;
            
            if (exists.andNotEmpty(val) && val !== false)
            {
                let procVal = typeof proc === 'function' ? proc(val) : val;
                            
                if (attr)
                    rules[attr] = procVal;
                else if (procVal && typeof procVal === 'object')
                    rules = { ...rules, ...procVal };            
            }
        });
    }
    
    return rules;
}

Object.keys(lco.basis.sep).forEach(s => sew[s] = splitter(sew, lco.basis.sep[s]));
