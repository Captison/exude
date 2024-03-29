
/**
    Debouncer.
    
    @param { function } action
      Function to execute.
    @param { number } wait
      Milliseconds to timeout. If negative, `action` is called immediately
      and in the current thread.
*/
export default function(action, wait = 0)
{
    let id = undefined, time = wait;
  
    let timer = function(...args)
    {
        timer.stop();

        let func = () => action.call(this, ...args);

        id = time >= 0 ? setTimeout(func, time) : (func(), id);        
    }
    
    timer.wait = (wait = 0) => time = wait;
    timer.stop = () => clearTimeout(id)
    
    return timer;
}
