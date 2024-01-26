
let boxing = 
{ 
    border: 'border-box', 
    content: 'content-box', 
    padding: 'padding-box'
};
/**
    Converts a shorthand value into a CSS "boxing" value.
    
    Value is returned as-is if not understood here.

    @param { string } value
      Shorthand value to be parsed.
    @return { string }
      CSS "boxing" value.
*/
export default function(value)
{
    return boxing[value] || value;
}
