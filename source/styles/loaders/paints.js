import color from './color'


/**
    Converts a color prop to a CSS ruleset.
    
    `value` should take the form `fill:stroke`.
    
    @param { string } value
      Value to be converted.
    @return { object }
      Resulting ruleset or emppty object.
*/
export default function(value)
{
    let rules = {};
    
    if (value)
    {
        let [ fill, stroke ] = value.split(/:/);
                        
        if (fill) rules.fill = color(fill);
        if (stroke) rules.stroke = color(stroke);        
    }
    
    return rules;
}
