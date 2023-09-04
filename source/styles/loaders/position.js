import length from './length'


let positions = { b: 'bottom', c: 'center', l: 'left', r: 'right', t: 'top' };
/**
    Converts a shorthand value into a CSS position value.
    
    Value is passed on to the `length` style loader if not understood here.

    @param { string } value
      Shorthand value to be parsed.
    @return { string }
      CSS postion value.
*/
export default function position(value)
{
    let pos = positions[value];    
    return pos ? pos : length(value);
}

position.spaced = (value) => (value || '').split(/\s+/).map(position).join(' ')
