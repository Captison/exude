import op from '_lib/deps/object-path'
import uid from './uid'


let defaults = { configurable: false, enumerable: false, writable: false };      
/**
    Returns the ui library metadata object for the given object.
    
    A non-enumerable metadata object property (`__ui_object_metadata__`) will 
    be added to `item` if none exists.
    
    @param { object } item
      Target object for metadata.
    @return { object }
      Meta data for `item`.
*/
export default function omeda(item)
{
    if (!item[omeda.key])
    {
        let define = (object, meta = {}) => 
        {
            Object.defineProperty(meta, 'get', { ...defaults, value: path => op.get(meta, path) });        
            Object.defineProperty(meta, 'set', { ...defaults, value: (path, value) => op.set(meta, path, value) });      

            Object.defineProperty(object, omeda.key, { ...defaults, value: meta, configurable: true });
        }
        
        define(item);
        // set a default key
        item[omeda.key].set('key', uid.next());
    }
    
    return item[omeda.key];                
}

omeda.key = '__exude_omeda__';
