import dire from './dire'
import toPixels from './to-pixels'


let reNum = /^-?(\d*\.)?\d+$/;
let caps = { t: 'Top', r: 'Right', b: 'Bottom', l: 'Left' };
let lows = { t: 'top', r: 'right', b: 'bottom', l: 'left' };

/**
    Converts space-separated list of scale unit values to CSS top, right,
    bottom, and left values.

    @param { string } value
      Direction values to be parsed.
    @param { string } pre
      CSS property prefix.
    @return { object }
      CSS key value pairs.
*/
export default function(value, pre = '')
{
    return dire(value, (dir, val) => 
        ({ [pre ? pre + caps[dir] : lows[dir]]: reNum.test(val) ? toPixels(val) + 'px' : val }));
}
