import { observeResize } from '_lib/directives'


export default observeResize((bind, unbind) => 
({  
    bind: (el, { modifiers, value }) => bind(el, { value, params: modifiers }),
    unbind
}));
