import color from './color'
import length from './length'


let reLoader = /\{=(.+?)\}/g;
let loaders = { color, length };
/**
    Replaces string-embedded loader calls with their return values.
    
    Elements to be interpolated should be enclosed in "handlebars".
      e.g. `(( value ))`
    
    @param { string } string
      The string to be interpolated.
    @param { object } reps
      Replacement values for interpolation
    @return { string }
      Interpolated string.
*/
export default function(string, reps)
{
    return (string || '').replace(reLoader, (m, s1) => 
    {
        let value = reps[s1.trim()];
        
        if (value)
        {
            let [ name, param = null ] = value.split(/::/);            
            return loaders[name] && param !== null ? loaders[name](param) : name;
        }
      
        return s1;      
    });
}
