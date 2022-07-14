import { snakeCase } from 'change-case';
import vars from '../vars'


let cache = {};
/**
    Prefixes a name with a namespace.
    
    @param { string } names
      Value(s) to be joined and namespaced.
    @return { string }
      Namespaced value.
*/
export default function ns(...names)
{
    let name = names.join(' ');
  
    if (!cache[name])
    {
        let { namespace } = vars.basis;
        cache[name] = snakeCase((namespace || 'xxx') + ' ' + name);      
    }
    
    return cache[name];
}

ns.clearCache = () => cache = {}
