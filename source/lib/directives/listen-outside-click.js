import { dom } from '_lib/utils'


/**
    Detects clicks outside of element.
    
    Object parameters:
      - `value`: function to be called on outside click detection.
          Receives click target as parameter.
    
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

    global.document.body.addEventListener('click', eventFn);
    
    return () => global.document.body.removeEventListener('click', eventFn);
}

export default dom.directive(action);
