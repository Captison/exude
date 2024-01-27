import { uid } from '_lib/utils'
import lco, { ns } from '_lco'


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
            if (lco.basis.htmlIdGen)
                return ns(this.$options.name.toLowerCase(), this.$attrs.id || uid(this._uid));
            
            return this.$attrs.id;
        }
    }
}
