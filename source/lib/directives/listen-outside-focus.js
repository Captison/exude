import { dom } from '_lib/utils'


/**
    Detects focus change outside of element.
    
    Object parameters:
      - `value`: function to be called on outside focus detection.
          Receives focus target as parameter.
    
    @param { element } el
      Target element for this directive.
    @param { object } parameters
      See description above.
    @return { function }
      Directive creator function.
*/
function action(el, { value })
{
    let eventFn = evt =>
    {
        if (el === evt.target || !el.contains(evt.target))
            value(evt.target);
    };

    global.document.body.addEventListener('focusin', eventFn);
    
    return () => global.document.body.removeEventListener('focusin', eventFn);
}

export default dom.directive(action);
