import { uid } from '_lib/utils'


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
        
        $htmlId() { return this.$options.name.toLowerCase() + '_' + uid(this._uid); },
    }
}
