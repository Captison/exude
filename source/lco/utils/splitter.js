import lco from '../'


/**
    Splitter for multi-value parameters.
    
    @param { function } handler
      Function to handle split values.  Each value is a separate parameter.
    @param { regexp } delim
      Delimiter expression.
    @return { function }
      Receives value, splits it, and returns the result of `handler` call.
*/
export default function splitter(handler, delim)
{
    return (value, ...args) => handler((value || '').split(delim), ...args)
}

Object.keys(lco.basis.sep).forEach(s => splitter[s] = handler => splitter(handler, lco.basis.sep[s]));
