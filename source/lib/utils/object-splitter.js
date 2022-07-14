
/**
    Splits object entries into accepted and rejected entries.
    
    @param { object } source
      Object from which to split entires.
    @param { function } test
      Condition for entry filter inclusion. Return `true` to accept.
    @param { function } attr
      Use to transform object key as needed.
    @return { object }
      Entries split into `accept` and `reject` containers.
*/
export default function objectSplitter(source, test = () => true, attr = k => k)
{
    let results = { accept: {}, reject: {} };
  
    let reducer = (res, key) =>
    {
        let good = test(key);
        
        res[good ? 'accept' : 'reject'][attr(key, good)] = source[key];
      
        return res;
    };

    return Object.keys(source || {}).reduce(reducer, results);
}
