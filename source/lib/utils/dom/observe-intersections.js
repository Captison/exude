
let intersectors = new Map();
/**
    Returns a function for observing intersections on a scrollable container.

    The function returned is of the form `(node: element, func: function): function`.
    - `node`: is the node to watch for intersection with `root`
    - `func`: function to be called with a boolean to indicate intersection.
    - returned function stops and tears down the listener when called. 
    
    Internally, an IntersectionObserver with `rootMargin: '-5px'` and
    `threshold: 0` is used.   
    
    @param { element } root
      Scrollable container.
    @return { function }
      Returns a function to setup an intersection listener for `root`.
*/
export default function(root)
{
    let key = root || 'viewport';
  
    if (!intersectors.get(key))
    {
        let intersector = null;
        let listeners = new Map();
        
        let observe = entries =>
        {
            entries.forEach(entry => 
            {
                let update = listeners.get(entry.target);
                if (update) update(entry.intersectionRatio > 0);
            });            
        }

        intersectors.set(key, (node, update) => 
        {
            listeners.set(node, update);
            // create the intersector if not existing
            if (!intersector)
                intersector = new IntersectionObserver(observe, { root, rootMargin: '-5px', threshold: 0 });
            
            intersector.observe(node);
            // return a listener teardown function
            return () => 
            {
                listeners.delete(node);
                intersector.unobserve(node);
                // stop observer and remove if there are no more listeners
                if (listeners.size === 0)
                {
                    intersector.disconnect();
                    intersector = null;
                    intersectors.delete(root);
                }
            }
        });
    }
    
    return intersectors.get(key);
}
