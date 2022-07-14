
/**
    Wraps an array to treat it like a set.
    
    @param { array } array
      Target array.
    @returns { object }
      - `array`: the array
      - `add`: adds a new item to the end of the array
      - `del`: removes an existing item from the array
*/
export default function(array = [])
{
    let iface =
    {
        array,
        
        add: item =>
        {
            if (array.indexOf(item) < 0) 
            {
                array.push(item);
                return true;
            }
            
            return false;
        },
        
        del: item =>
        {
            let index = array.indexOf(item);
            if (index >= 0) 
            {
                array.splice(index, 1);
                return true;
            }
            
            return false;
        }
    };
    
    return iface;
}
