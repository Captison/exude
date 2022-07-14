import dire from './dire'
import color from './color'
import toPixels from './to-pixels'


let props =
{
    t: 'borderTop',
    r: 'borderRight',
    b: 'borderBottom',
    l: 'borderLeft'
};
/**
    Converts space-separated list of directional values to CSS border values.
    
    A border value should take the form: `width!color!style` where:
      - `width` is a scale unit number
      - `color` is a valid color name
      - `style` is a CSS border style

    @param { string } value
      Direction values to be parsed.
    @return { object }
      CSS ruleset.
*/
export default function(value)
{
    return dire(value, (dir, val) =>
    {
        let [ bWidth, bColor, bStyle ] = val.split(/!/);

        let spec = 
        [
            toPixels.str(bWidth),
            color(bColor || 'transparent'),
            bStyle || 'solid'
        ];
        
        return { [props[dir]]: spec.join(' ') };
    });
}
