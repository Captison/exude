import color from './color'
import toPixels from './to-pixels'


/**
    Converts outline spec to a CSS outline and outline-offset value.
    
    An outline value should take the form: `width!color!style!space` where:
      - `width` is a scale unit number
      - `color` is a valid color name
      - `style` is a CSS outline style
      - `space` is a scale unit number

    @param { string } value
      Outline values to be parsed.
    @return { object }
      CSS ruleset.
*/
export default function(value)
{
    let [ oWidth, oColor, oStyle, oSpace ] = value.split(/!/);

    let spec = 
    [
        toPixels.str(oWidth),
        color(oColor || 'transparent'),
        oStyle || 'solid'
    ];
    
    return { outline: spec.join(' '), outlineOffset: toPixels.str(oSpace) };
}
