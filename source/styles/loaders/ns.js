import { cacher } from '_lib/utils'
import { snakeCase } from 'change-case';
import vars from '../vars'


/**
    Prefixes a name with a namespace.
    
    @param { string } names
      Value(s) to be joined and namespaced.
    @return { string }
      Namespaced value.
*/
export default cacher((...names) => snakeCase((vars.basis.namespace || 'xxx') + ' ' + names.join(' ')));
