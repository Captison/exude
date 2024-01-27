import ResizeObserver from 'resize-observer-polyfill';
import { dom } from '_lib/utils'


/**
    Detects changes to element dimensions.

    @see ResizeObserver javascript class
    
    Object parameters:
      - `value`: function to be called on element resize detection.
      - `params`: ResizeObserver configuration parameters
    
    @param { element } el
      Target element for this directive.
    @param { object } parameters
      See description above.
    @return { function }
      Directive creator function.
*/
function action(el, { value, params })
{
    let observer = new ResizeObserver(value);
    
    observer.observe(el, { box: 'border-box', ...params });
    
    return () => observer.disconnect();
}

export default dom.directive(action);
