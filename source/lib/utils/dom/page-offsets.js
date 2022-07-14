
/**
    Traverses parents to get positional offsets relative to the page.
    
    @param { element } el
      The element for which to get offsets.
    @return { object }
      Page offsets:
      - `offsetTop`: element offset relative to top of page.
      - `offsetLeft`: element offset relative to left of page.
*/
export default function(el)
{
    let { offsetTop, offsetLeft } = el;
    // eslint-disable-next-line no-cond-assign
    while (el = el.offsetParent)
    {
        offsetTop += el.offsetTop;
        offsetLeft += el.offsetLeft;
    }
    
    return { offsetTop, offsetLeft };
}
