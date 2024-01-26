import { observeChanges } from '_lib/directives'


export default observeChanges((bind, unbind) => 
({  
    bind: (el, { modifiers, value }) => bind(el, { value, params: modifiers }),
    unbind
}));
