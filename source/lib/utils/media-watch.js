
/**
    Assigns a function to watch for media query matching.
    
    @param { string } string
      Media query to watch for matching.
    @param { function } watcher
      Listener that receives a boolean (query matched?).
    @return { function }
      Teardown function that removes the match listener.
*/
export default function(string, watcher)
{
    let query = global.matchMedia(string);
    let handler = mq => watcher(mq.matches);
    // register event listener
    query.addListener(handler);
    // do an initial check (not done automatically)
    handler(query);
    // return a function to drop listener
    return () => query.removeListener(handler);
}
