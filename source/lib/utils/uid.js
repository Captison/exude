import shash from 'string-hash'


let counter = 10000;
/**
    Generates a unique string id suitable for use in html.
    
    Return value will be the same for the same input (including child values
    in arrays/objects).  However, a unique value is generated when `value` is 
    `undefined` or `null`.

    @param { any } value
      Key based on this value is returned.
    @return { string }
      A base16 string value.
*/
export default function uid(value)
{
    if (typeof value === 'undefined' || value === null)
        value = 'undef' + counter++;
    else if (Array.isArray(value))
        value = value.map(uid).join();
    else if (typeof value === 'object')
        value = Object.keys(value).map(key => key + uid(value[key])).join();

    return shash(value.toString()).toString(16);
}
