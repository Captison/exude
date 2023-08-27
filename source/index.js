/**
-------------------------------------------------------------------------------
    Exude UI Library Entry Point
-------------------------------------------------------------------------------
*/
import '_lib/patches'
import merge from 'deepmerge'
import { defaults, setStyles } from '_styles/vars'
import * as loaders from '_styles/loaders'


/**
    Library configuration.
    
    @param { array } configs
      Library config object(s).
*/
let config = (...configs) =>
{
    setStyles(...configs);
    // clear loader caches
    Object.values(loaders).forEach(val => val.clearCache && val.clearCache());
    
    // TODO: Refresh root component.
}

/**
    Returns a deep copy of the default config object.
*/
config.getDefaultConfig = () => merge({}, defaults)


export default config;
// export released library artifacts
export * from './exports/export.registry'
