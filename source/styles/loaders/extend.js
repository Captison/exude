import { exists } from '_lib/utils'


let selector =
{
    focus: '&:focus-within',
    hover: '&:hover',
    hoverFocus: '&:hover, &:focus-within',
    inactive: '&[data-inactive]'
};
/**
    Extends a CSS values to pre-defined selectors.

    @param { function } adapter
      Function called to adapt raw `values` data.
    @param { object } values
      Data to be adapted.
    @return { object }
*/
export default function(adapter, values)
{
    let reducer = (rules, key) =>
    {
        if (exists(values[key]) && values[key] !== '')
        {
            let adapted = adapter(values[key]) || {};

            if (Object.keys(adapted).length)
            {
                let sel = selector[key];
                
                if (!sel) 
                  rules = { ...rules, ...adapted };
                else
                  rules[sel] = { ...rules[sel], ...adapted };
            }
        }
        
        return rules;
    }
    
    return Object.keys(values).reduce(reducer, {});
}
