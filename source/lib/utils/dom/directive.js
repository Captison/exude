
/**
    Aids in the creation of element directives.
    
    A directive is an event-based action involving or affecting an element.
    
    The action parameter should have the form `fn(el, ...args) => teardown`,
    where:
      - `el` is the DOM element target for the directive
      - `args` is any additional parameters for the directive
      - `teardown` is a function to cleanup the directive (it can also receive 
          `el` and `args`)
        
    @param { function } action
      The code that sets up (and tears down) the directive.
    @return { function }
      A function that receives a function that will be passed the 
      setup and teardown methods for the directive.
*/
export default function(action)
{
    let cleanups = new Map();        
  
    let setup = (el, ...args) =>
    {
        let cleanup = action(el, ...args);
        
        if (typeof cleanup === 'function')
            cleanups.set(el, cleanup);              
    }
    
    let teardown = (el, ...args) =>
    {
        let cleanup = cleanups.get(el);
        
        if (cleanup)
        {
            cleanups.delete(el);
            cleanup(el, ...args);
        }
    }
    
    return creator => creator(setup, teardown);
}
