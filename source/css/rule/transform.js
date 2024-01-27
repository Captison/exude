import { toRaw } from '_css/value'
import lco from '_source/lco'


let reOp = /^[sktr][xyz].+/;
// CSS transform functions
let oper =
{
    s: { fn: 'scale', proc: v => v },
    k: { fn: 'skew', proc: toRaw.angle.str },
    t: { fn: 'translate', proc: toRaw.extent.str },
    r: { fn: 'rotate', proc: toRaw.angle.str }
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
    let list = [], defs = (value || '').split(lco.basis.sep.ws);
    
    defs.forEach(def => 
    {
        if (reOp.test(def))
        {
            let [ op, dim, ...arg ] = def.split('');
            let { fn, proc } = oper[op];
                        
            list.push(`${fn + dim.toUpperCase()}(${proc(arg.join(''))})`); 
        }
    });
    
    return list.length ? { transform: list.join(' ') } : {};
}
