/**
-------------------------------------------------------------------------------
    Exude UI Library Entry Point
-------------------------------------------------------------------------------
*/
import merge from 'deepmerge'
import { defaults, setStyles } from '_styles/vars'
import * as loaders from '_styles/loaders'


/**
    Library configuration.
    
    @param { object } config
      Library config object.
*/
export function config(configObj)
{
    setStyles(configObj);
    // clear loader caches
    Object.values(loaders).forEach(val => val.clearCache && val.clearCache());
    
    // TODO: Refresh root component.
}

/**
    Returns a deep copy of the default config object.
*/
export function getDefaultConfig()
{ 
    return merge({}, defaults);
}

// export released components
export * from './components/export.registry'
