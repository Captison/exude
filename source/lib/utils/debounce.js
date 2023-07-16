
/**
    Debouncer.
    
    @param { function } action
      Function to execute.
    @param { number } wait
      Milliseconds to timeout. If negative, `action` is never called.
*/
export default function(action, wait = 0)
{
    let id = undefined, time = wait;
  
    let timer = function(...args)
    {
        timer.stop();
        if (time >= 0) id = setTimeout(() => action.call(this, ...args), time);
    }
    
    timer.wait = (wait = 0) => time = wait;
    timer.stop = () => clearTimeout(id)
    
    return timer;
}
