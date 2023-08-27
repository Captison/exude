import op from '_lib/deps/object-path'


/**
    Creates a function to filter value(s) against.

    All filtration tests are wrapped into functions of the general form:
      `function(any, $path) => boolean`
    where `$path` is the dot-delimited path to test value in target objects.

    When `criteria` is
      - a function, it is used directly as a test.
      - a RegExp, target value is tested to pass the regex.
      - an array, target value is tested against all values in the array.
      - an object, target value is tested against all values in the object.
      - any other type, target value is tested for equality against that value.

    If `criteria` is an object with a `$test` paameter, then the object is
    treated as sub-criteria configuration and NOT as test values (as described
    above).

    The configuration for a sub-criteria object may include:
      - `$test` (any): The `criteria` to test against (recursive).
      - `$and` (boolean): Are tests ANDed (instead of ORed) for child criteria?
      - `$path` (string/array): Path(s) in target objects to test against.
      - `$negate` (boolean): Flip the boolean result of the test?
      
    To clarify, the `$test` parameter is a `criteria` definition, allowing for
    for the recursiveness of the filtration tree.

    The returned function, when passed a value, will return true/false for 
    pass/fail of filtration tests, respectively, and is suitable for use like 
    so:
      `
        let array = [ ... ];
        let filterFn = filter( CRITERIA_GOES_HERE );
        let filteredValues = array.filter(filterFn);
        let firstFilteredValue = array.find(filterFn);
      `

    @param { any } criteria
      Criteria for filtration.
    @return { object }
      A filter function of the form `function(any) => boolean`.
*/
export default function unit(criteria)
{
    // ensure required structure
    if (typeof criteria !== 'object' || !Object.hasOwn(criteria, '$test')) 
        criteria = { $test: criteria };
  
    let { $and = false, $negate = false, $path, $test } = criteria;    
    
    let check = value =>
    {
        let values = toValues(value, $path);      

        let tester = test =>
        {
            // `test` is already a function
            if (typeof test === 'function') return test(value);       
            // test for a regular expression match    
            if (test instanceof RegExp) return values.findIndex(v => test.test(v)) >= 0;
            // at least one criteria must pass when `test` is an array
            if (Array.isArray(test)) return test.findIndex(t => tester(t)) >= 0;
            // new group/unit or test against the values of an object
            if (typeof test === 'object' && test !== null)
            {
                if (Object.hasOwn(test, '$test')) return unit(test)(value);
                // test against keys and values
                return tester(Object.values(test));
            }
            // default to an equality test
            return values.findIndex(v => v === test) >= 0;
        }
        // properly AND, OR, and NEGATE results
        return (!$and == ([].concat($test).findIndex(test => !$and == tester(test)) >= 0)) == !$negate;
    }
    
    
    /**
        Filter an array/iterable.
        
        @param { array } array
          Data to be filtered.
        @return { array }
          The filtered data.
    */
    check.list = array => array.filter(check)
        

    /**
        Creates an iterator for filtering iterables.
        
        @param { iterable } iterable
          Iterable to be filtered.
        @param { function } abort
          Called for every element (`abort(element) => boolean`).  
          If it returns a truthy value, the iterator will abort.
        @return { iterator }
          Filtering iterator
    */
    check.iterate = function*(iterable, abort = () => false)
    {
        for (var element of iterable) 
        {
            if (abort(element)) return;
            if (check(element)) yield element;
        }
    }

    return check;
}


function toValues(value, paths)
{
    if (paths && typeof value === 'object' && value !== null)
    {
        let reducer = (array, string) =>
        {
            let [ path, hint ] = (string || '').split(/\//);
            return path ? [ ...array, ...toArray(op.get(value, path), hint) ] : array;
        }
        
        return [].concat(paths).reduce(reducer, []);
    }     

    return toArray(value);
}
        

function toArray(value, hint)
{
    if (Array.isArray(value)) return value;
    // target value is `key::value` for objects
    if (typeof value === 'object' && value !== null)
    {
        // target values are all the keys of the object
        if (hint === 'keys') return Object.keys(value);
        // target values are all the keys of the object
        if (hint === 'keyvals') return Object.entries(value).map(e => e.join('/'));
        // target values are all the values of the object
        return Object.values(value);
    }
    
    return [ value ];
}
