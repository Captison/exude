
let reItems = /\s*,\s*/; 
/**
    Returns the value at `key` in `object` following any aliased keys.
    
    Circular aliasing will result in `undefined`.
    
    @param { object } object
      Source object from which to get value.      
    @param { string } key
      Property key in `object`.
    @return { any }
      Value at `key` or `key` if not found.
*/
export default function unwind(object, key, seen = [])
{
    let resolve = key =>
    {
        // circular searches are unresolvable
        if (seen.includes(key)) return undefined;
        
        if (object.hasOwnProperty(key))
        {
            seen.push(key);
            return resolve(object[key]);
        }
        
        return key;
    }
    
    return resolve(key);
}

unwind.list = (object, key) =>
{
    let resolve = key =>
    {
        if (!key) return [];
        // split the key if comma delimited
        if (typeof key === 'string' && reItems.test(key)) key = key.split(reItems);
        // try all elements of the array against this function
        if (Array.isArray(key)) return key.reduce((a, key) => ([ ...a, ...resolve(key) ]), []);
        
        let value = unwind(object, key);
        // if key and value different try unwinding value
        if (key !== value) return resolve(value);
        // no more resolution can occur as key and value are the same
        return [ value ];        
    }
    
    return resolve(key);
}
