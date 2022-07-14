import vars from '../vars'


/**
    Translate enumerated image names from configuration.
    
    @param { string } name
      Image enumeration.
    @return { string }
      CSS image definition.
*/
export default function(name)
{
    return vars.image.named[name] || name;
}
