import shash from 'string-hash'


/**
    Generates a unique string hash that can be used to identify a given value.
    
    Return value will be the same for the same input (including for `NaN`), 
    including evaluating child values in arrays/objects.

    @param { any } values
      A unique id based on these values are returned.
    @return { string }
      A base16 string value.
*/
export default function uid(...values)
{
    return shash(vid(values)).toString(16);
}


function vid(value)
{
    let type = typeof value;
  
    if (Array.isArray(value))
        return type + value.map(vid).join();
    
    if (type === 'object' && value !== null)
        return type + vid(Object.entries(value));

    return type + value;
}


let counter = 10000;
/**
    Generates a unique string on every call.

    @return { string }
      A base16 string value.
*/
uid.next = () => uid(counter++)
