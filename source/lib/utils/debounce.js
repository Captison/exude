
/**
    Debouncer.
    
    @param { function } action
      Function to execute.
    @param { number } wait
      Milliseconds to timeout. If negative, `action` is never called.
*/
export default function(action, wait)
{
    let id = undefined;
  
    let timer = (time = wait) =>
    {
        timer.stop();
        if (time >= 0) id = setTimeout(action, time);
    }
    
    timer.stop = () => clearTimeout(id)
    
    return timer;
}
