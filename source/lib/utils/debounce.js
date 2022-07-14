
/**
    Debouncer.
    
    @param { number } wait
      Milliseconds to timeout.
    @param { function } action
      Function to execute.
*/
export default function(wait, action)
{
    let id = undefined;
  
    let timer = () =>
    {
        timer.stop();
        id = setTimeout(action, wait);
    }
        
    timer.stop = () => clearTimeout(id)
    
    return timer;
}
