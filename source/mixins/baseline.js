import { uid } from '_lib/utils'
import v from '_styles/vars'
import { ns } from '_styles/loaders'


/**
    Global library component mixin.

    This mixin is added to all library components via the build.
*/
export default
{
    exude: true,

    inheritAttrs: false,
    
    computed:
    {
        $hearers() { return this.$listeners; },
        
        $htmlId() 
        {
            if (v.basis.htmlIdGen)
                return ns(this.$options.name.toLowerCase(), this.$attrs.id || uid(this._uid));
            
            return this.$attrs.id;
        }
    }
}
