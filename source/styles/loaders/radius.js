import dire from './dire'
import toPixels from './to-pixels'


let reNum = /^-?(\d*\.)?\d+$/;
let props =
{
    t: 'borderTopLeftRadius',
    r: 'borderTopRightRadius',
    b: 'borderBottomRightRadius',
    l: 'borderBottomLeftRadius'
};
/**
    Converts scale unit values to CSS directional radius values.
    
    The directional markers are translated as:
      - `t` for top left corner
      - `r` for top right corner
      - `b` for bottom right corner
      - `l` for bottom left corner

    @param { string } value
      Direction values to be parsed.
    @return { object }
      CSS ruleset.
*/
export default function(value)
{
    return dire(value, (dir, val) => ({ [props[dir]]: reNum.test(val) ? toPixels(val) + 'px' : val }));
}
