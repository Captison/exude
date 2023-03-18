import merge from 'deepmerge'
import { keyframes } from '_lib/deps/stitches-core'
import required from './required'
import { ns } from '_styles/loaders'


// let mergeOpts = { arrayMerge: (dest, src) => src };
let vars = {}, styleElem = null;
/**
    Sets style object configuration(s) aas current styles.
    
    Refresh the rendered component hierarchy after calling this to make
    changes visible.
*/
export function setStyles(...objects)
{
    let temp = merge.all([...objects, required]);
    // replace styles ensuring only necessary top-level keys are used
    Object.keys(required).forEach(key => vars[key] = temp[key]);
    // update font imports
    if (vars.font.face.length)
    {
        if (!styleElem)
        {
            // create a style element in document head.
            styleElem = document.head.appendChild(document.createElement('style'));
            styleElem.type = 'text/css';
        }
        styleElem.textContent = vars.font.face.map(url => `@import url(${url});`).join('\n');
    }

    let { keyframes: kf } = vars.animation;
    let reducer = (names, key) => ({ ...names, [ns(key)]: keyframes(kf[key])() })
    // prepare animation keyframes
    vars.animation._keyframes_mapped = Object.keys(kf).reduce(reducer, {});
}

export { default as defaults } from './defaults'

export default vars;

// ensure the required setup
setStyles();
