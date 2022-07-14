
let reOp = /^[sktr][xyz]-?(\d*\.)?\d+$/;
// CSS transform functions
let oper =
{
    s: { fn: 'scale', unit: '' },
    k: { fn: 'skew', unit: 'deg' },
    t: { fn: 'translate', unit: 'px' },
    r: { fn: 'rotate', unit: 'deg' }
}
/**
    Converts transform property shorthand into a CSS transform ruleset.
  
    @param { string } value
      Transform specifications.
    @return { string }
      CSS transform ruleset.
*/
export default function(value)
{
    let defs = (value || '').split(/\s+/);
    
    let list = defs.map(def => 
    {
        if (reOp.test(def))
        {
            let [ op, dim, ...arg ] = def.split('');
            let { fn, unit } = oper[op];
                        
            return `${fn + dim.toUpperCase()}(${arg.join('')}${unit})`; 
        }
    });
    
    return { transform: list.filter(t => t).join(' ') };
}
