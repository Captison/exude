import { unwind } from '_lib/utils'
import vars from '../vars'


let cache = {};
let reducer = (object, type) =>
{
    /**
        Translates enumerations from the LCO into CSS.
        
        Use commas to specify multiple enumerations in `names`.

        @param { string } names
          Enumeration name(s) of the CSS to get.
        @return { array }
          List of CSS rulesets. 
    */
    object[type] = names =>
    {
        let cname = type + ':' + names;
        if (cache[cname]) return cache[cname];
        
        return cache[cname] = unwind.list(vars[type].named, names).map(rules => 
        {
            return Object.keys(rules).reduce((o, k) => ({ ...o, [type + '-' + k]: rules[k] }), {});
        });    
    }

    return object;
}

export default
{
    ...[ 'animation', 'background', 'transition' ].reduce(reducer, {}),    
    clearCache: () => cache = {}
}
