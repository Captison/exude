import { snakeCase } from 'change-case';
import merge from 'deepmerge'
import { keyframes } from '_lib/deps/stitches-core'
import { cacher } from '_lib/utils'
import defaults from './defaults'
import required from './required'


let lco = {}, styleElem = null;
let ns = cacher((...names) => snakeCase([lco.basis.namespace || 'xxx', ...names].join(' ')));
/**
    Sets style object configuration(s) aas current styles.
    
    Refresh the rendered component hierarchy after calling this to make
    changes visible.
*/
let setStyles = (...objects) =>
{
    ns.clearCache();
    
    let temp = merge.all([ ...objects, required ]);
    // replace styles ensuring only necessary top-level keys are used
    Object.keys(required).forEach(key => lco[key] = temp[key]);
    // update font imports
    if (lco.font.face.length)
    {
        if (!styleElem)
        {
            // create a style element in document head.
            styleElem = document.head.appendChild(document.createElement('style'));
            styleElem.type = 'text/css';
        }
        styleElem.textContent = lco.font.face.map(url => `@import url(${url});`).join('\n');
    }

    let { keyframes: kf } = lco.animation;
    let reducer = (names, key) => ({ ...names, [ns(key)]: keyframes(kf[key])() })
    // prepare animation keyframes
    lco.animation._keyframes_mapped = Object.keys(kf).reduce(reducer, {});
}

export default lco
export { defaults, ns, setStyles }
// ensure the required setup
setStyles();
