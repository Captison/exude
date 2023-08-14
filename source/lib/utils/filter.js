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
      - `$path` (string): Path in target objects to test value(s) against.
      - `$negate` (boolean): Flip the boolean result of the test?
      
    To clarify, the `$test` parameter is a `criteria` definition, allowing for
    for the recursiveness of the filtration tree.

    The returned function, when passed a value, will return true/false for pass/fail
    of filtration tests, respectively, and is suitable for use like so:
      `
        let array = [ ... ];
        let filterFn = filter( CRITERIA_GOES_HERE );
        let filteredValues = array.filter(filterFn);
        let firstFilteredValue = array.find(filterFn);
      `

    @param { any } criteria
      Criteria for filtration.
    @return { function }
      A filter function of the form `function(any) => boolean`.
*/
export default function unit(criteria)
{
    // ensure required structure
    if (typeof criteria !== 'object' || !Object.hasOwn(criteria, '$test')) 
        criteria = { $test: criteria };
  
    let { $and = false, $negate = false, $path, $test } = criteria;      
    let all = [].concat($test);
    
    return value => 
    {
        let useValue = value;

        if ($path && typeof value === 'object' && value !== null)
            useValue = op.get(value, $path);
        
        return (!$and == !!all.find(test => !$and == toFunc(test)(useValue))) == !$negate
    }
}


function toFunc(test)
{
    // `test` is already a function
    if (typeof test === 'function') return test;
    // test for a regular expression match    
    if (test instanceof RegExp) return value => test.test(value)
    // at least one criteria must pass when `test` is an array
    if (Array.isArray(test)) return value => !!test.find(t => toFunc(t)(value))
    // new group/unit or test against the values of an object
    if (typeof test === 'object' && test !== null) 
        return Object.hasOwn(test, '$test') ? unit(test) : toFunc(Object.values(test));
    // default to an equality test
    return value => value === test      
}
