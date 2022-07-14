import { unwind } from '_lib/utils'
import vars from '../vars';


let cache = {};
let reSvg = /<svg.*?>([^]*)<\/svg>/g;
/**
    Loads the specified icon.
    
    Enclosing <svg> tag is stripped if present.
    
    @param { string } name
      Name of SVG icon to load.
    @return { promise }
      Resolves to SVG icon markup.
*/
export default function icon(name)
{
    // check for cached name first
    if (cache[name]) return Promise.resolve(cache[name]);
    
    return new Promise(resolve => 
    {
        let { loader, named } = vars.icon, result = unwind(named, name);

        if (result !== name) resolve(result);
        // try to load icon asynchronously if provider function given
        else if (typeof loader === 'function') resolve(loader(name));
        // not found
        else resolve();

    }).then(svg => cache[name] = reSvg.test(svg) ? svg.replace(reSvg, '$1') : svg);
}

icon.clearCache = () => cache = {}
