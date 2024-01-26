import { dom } from '_lib/utils'


/**
    Detects element intersection with the viewport.
    
    Subject to defaults within the imported intersection observation code.
    
    Object parameters:
      - `value`: function to be called on viewport intersection detection.
    
    @param { element } el
      Target element for this directive.
    @param { object } parameters
      See description above.
    @return { function }
      Directive creator function.
*/
function action(el, { value })
{
    let observer = dom.observeIntersections();
    
    return observer(el, value);
};

export default dom.directive(action);
