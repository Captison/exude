import toRaw from './to-raw'
import lco from '_source/lco'


let situations = 
{ 
    b: 'bottom', 
    c: 'center', 
    l: 'left', 
    r: 'right', 
    t: 'top' 
};
/**
    Converts a shorthand value into a CSS position value.
    
    Value is passed on to `toRaw.extent` if not understood here.

    @param { string } value
      Shorthand value to be parsed.
    @return { string }
      CSS postion value.
*/
export default function situation(value)
{
    let sit = situations[value];    
    return sit ? sit : toRaw.extent.str(value);
}

situation.spaced = value => (value || '').split(lco.basis.sep.svs).map(situation).join(' ')
