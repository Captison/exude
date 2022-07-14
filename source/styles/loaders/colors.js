import color from './color'
import vars from '../vars'


/**
    Converts a color prop to a CSS ruleset.
    
    `value` should take the form `foreground:background`.
    
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
        let [ fore, back ] = value.split(/:/);
                        
        if (fore) rules.color = color(fore);
        if (back) rules.backgroundColor = color(back);        
    }
    
    return rules;
}
