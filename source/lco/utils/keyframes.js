import lco, { ns } from '../'


/**
    Translates an enumerated name into a CSS-defined keyframes name. 
    
    @param { string } value
      Enumerated keyframes name.
    @return { string }
      CSS defined keyframes name.
*/
export default function(value)
{
    let name = ns(value);    
    return lco.animation._keyframes_mapped[name] || name;    
}
