import { exists } from '_lib/utils'
import lco from '_lco'
import { enumer, splitter } from '_lco/utils'
import { sew } from '_css/helper'
import mappings from './mappings'


let split = splitter(sew, lco.basis.sep.vs);
/**

    @param { array | object} scheme
      Value mapping scheme.
    @return { function }
      Value mapping function.
*/
function map(scheme)
{
    let { section, fields } = Array.isArray(scheme) ? { fields: scheme } : scheme;
  
    return value =>
    {
        if (section && enumer[section])
            value = enumer[section](value);
        
        if (typeof value === 'string')
            return split(value, fields);

        if (typeof value === 'object') // arrays too!
            return sew(value, fields);        

        return exists(value) ? sew([ value ], fields) : {};
    }
} 

let mapper = Object.keys(mappings).reduce((obj, key) => ({ ...obj, [key]: map(mappings[key]) }), {});

export default new Proxy(mapper,
{
    get(target, prop) 
    {
        // simply return value if `target` already has `prop` defined
        if (Object.hasOwn(target, prop)) return target[prop];
        // assume simplified mapping scheme
        return value => exists(value) ? { [prop]: value } : {}
    }
});
