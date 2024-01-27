import op from 'object-path'
import { unwind } from '_lib/utils'
import lco from '../'


let sections =
{
    animation: 'animation.named',
    background: 'background.named',
    color: 'color.named',
    font: 'font.named',
    icon: 'icon.named',
    media: 'media.named',
    shadow: 'shadow.named',
    selector: 'selector.named',
    stylesheet: 'stylesheet.named',
    transition: 'transition.named'
}
/**
    Resolves enumerations from the LCO.
    
    Use commas to specify multiple enumerations in `names`.

    @param { string } names
      Enumeration name(s) of the configs to get.
    @param { string } label
      Named section of the LCO.
    @return { array }
      List of resolved LCO configs. 
*/
export default function enumer(names, label) 
{
    return unwind(op.get(lco, sections[label]), names);
}

enumer.list = (names, label) => unwind.list(op.get(lco, sections[label]), names)

Object.keys(sections).forEach(label => 
{
    enumer[label] = names => enumer(names, label)
    enumer[label].list = names => enumer.list(names, label)
});
