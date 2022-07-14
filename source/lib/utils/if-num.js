
let reNum = /^-?(\d*\.)?\d+$/;
/**
    Calls `oper` with `value` only if `value` is numeric.
    
    @param { any } value
      The value to be processed.
    @param { function } oper
      Operation to be performed on number.
    @param { function } def
      Default value to return if not numeric.
    @return { any }
      Return value of `oper` if `value` is numeric.  Otherwise, `default`, or 
      `value` is returned.
*/
export default function(value, oper, def)
{
    if (typeof value === 'number')
        return oper(value);
    
    if (typeof value === 'string' && reNum.test(value))
        return oper(parseFloat(value));
    
    return def || def === 0 ? def : value;
}
