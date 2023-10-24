import { exists } from '_lib/utils'


/**
    Extends a CSS values to given selectors.

    @param { function } adapter
      Function called to adapt raw `values` data.
    @param { object } values
      Data to be adapted.
    @param { object } basis
      Object to merge data with.
    @return { object }
      Complete CSS ruleset.
*/
export default function(adapter, values, basis)
{
    adapter = adapter || (v => v);
  
    let reducer = (rules, sel) =>
    {
        let styles = values[sel];
      
        if (exists(styles) && styles !== '')
        {
            let adapted = adapter(styles) || {};

            if (Object.keys(adapted).length)
            {
                if (sel === '_') 
                  rules = { ...rules, ...adapted };
                else if (sel)
                  rules[sel] = { ...rules[sel], ...adapted };
            }
        }

        return rules;
    }
    
    return Object.keys(values).reduce(reducer, basis || {});
}
