import { splitter } from '_source/lco/utils'
import { dire } from '_css/helper'
import { borderStyle, color, toRaw } from '_css/value'


let props =
{
    t: 'borderTop',
    r: 'borderRight',
    b: 'borderBottom',
    l: 'borderLeft'
};

let handler = splitter.svs(([ bWidth, bColor, bStyle ]) => 
{
    return [ toRaw.extent.str(bWidth), color(bColor || 'transparent'), borderStyle(bStyle || 's') ];
});
/**
    Converts space-separated list of directional values to CSS border values.
    
    A border value should take the form: `width!color!style` where:
      - `width` is a scale unit number or CSS length
      - `color` is an LCO color name or CSS color value
      - `style` is a CSS border style

    @param { string } value
      Direction values to be parsed.
    @return { object }
      CSS ruleset.
*/
export default function(value)
{
    return dire(value, (dir, val) => ({ [props[dir]]: handler(val).join(' ') }));
}
