import { dom } from '_lib/utils'


/**
    Detects element intersection with the viewport.
    
    Specifically, the bound function is triggered when one pixel of the
    target element is within 5 pixels from entering the viewport.
    
    @binding value
      Function is passed a boolean true/false when element enters/leaves the
      viewport.
*/
export default
{
    bind(el, { value }, { context })
    {
        let observer = dom.observeIntersections();
        
        context.stopObserving = observer(el, value);      
    },

    unbind(el, bindings, { context })
    {
        context.stopObserving();
    }
}
