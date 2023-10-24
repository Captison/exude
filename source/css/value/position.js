
let map = 
{ 
    abs: 'absolute', 
    rel: 'relative', 
    fix: 'fixed', 
    sta: 'static', 
    sti: 'sticky', 
};
/**
    Converts a shorthand value into a CSS position value.
    
    @param { string } value
      Shorthand value to be parsed.
    @return { string }
      CSS postion value.
*/
export default function(value)
{
    return map[value] || value;
}
