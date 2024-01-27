import { dom } from '_lib/utils'


/**
    Detects changes to child element content.

    @see MutationObserver javascript class
    
    Object parameters:
      - `value`: function to be called on element mutation detection.
      - `params`: MutationObserver configuration parameters
    
    @param { element } el
      Target element for this directive.
    @param { object } parameters
      See description above.
    @return { function }
      Directive creator function.
*/
function action(el, { value, params })
{
    let observer = new MutationObserver(value);
    
    observer.observe(el, { childList: true, ...params });
    
    return () => observer.disconnect();
}

export default dom.directive(action);
