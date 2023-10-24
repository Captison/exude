import { cacher, unwind } from '_lib/utils'
import lco from '../'


let reSvg = /<svg.*?>([^]*)<\/svg>/g;
/**
    Loads the specified icon.
    
    Enclosing <svg> tag is stripped if present.
    
    @param { string } name
      Name of SVG icon to load.
    @return { promise }
      Resolves to SVG icon markup.
*/
export default cacher(async name =>
{    
    return getIcon(name).then(svg => reSvg.test(svg) ? svg.replace(reSvg, '$1') : svg);
});

async function getIcon(name)
{
    let { loader, named } = lco.icon, result = unwind(named, name);

    if (result !== name) return result;
    // try to load icon asynchronously if provider function given
    if (typeof loader === 'function') return loader(name);
}
