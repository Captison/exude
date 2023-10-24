/**
-------------------------------------------------------------------------------
    Exude UI Library Entry Point
-------------------------------------------------------------------------------
*/
import '_lib/patches'
import merge from 'deepmerge'
import { defaults, setStyles } from '_lco'
import * as rule from '_css/rule'
import * as value from '_css/value'


let clear = x => x.clearCache && x.clearCache();
/**
    Library configuration.
    
    @param { array } configs
      Library config object(s).
*/
let config = (...configs) =>
{
    setStyles(...configs);
    // clear loader caches
    Object.values(rule).forEach(clear);
    Object.values(value).forEach(clear);
    
    // TODO: Refresh root component.
}

/**
    Returns a deep copy of the default config object.
*/
config.getDefaultConfig = () => merge({}, defaults)


export default config;
// export released library artifacts
export * from './exports/export.registry'
