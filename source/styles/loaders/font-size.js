import vars from '../vars'
import toPixels from './to-pixels'


/**
    Translates a font size enumeration into a CSS ruleset.
    
    The `size` object should contain `fontSize` and `lineHeight` properties
    that will be translated as scale units of type number.
    
    @param { object } size
      Font size object.
    @return { object }
      A CSS ruleset or undefined if `size` cannot be translated.
*/
export default function(size)
{
    let { font } = vars;
    let spec = font.size[size];
  
    if (spec)
    {
        let { fontSize = 'inherit', lineHeight = 'normal' } = spec;
        
        if (typeof fontSize === 'number')
            fontSize = toPixels(fontSize) + 'px';
        
        if (typeof lineHeight === 'number')
            lineHeight = toPixels(lineHeight) + 'px';
            
        return { fontSize, lineHeight }
    }
}
