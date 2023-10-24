/**
    Workbench Setup
    ---------------------------------------------------------------------------
    This file is run when styleguidist loads (via confog) so it can be used to 
    load mock data, global variabls, etc. for the examples.
*/

import lco, { defaults, setStyles } from '_lco'
import { requireContextMap } from '_lib/utils'
import config from './LCO/config'


setStyles(defaults, config);
/**
    Set global mockdata
*/
let random = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min
let colors = Object.keys(lco.color.named);
let icons = Object.keys(lco.icon.named);

global.mock =
{
    color: () => colors[random(colors.length)],
    
    icon: () => icons[random(icons.length)],
    
    data: requireContextMap(require.context('./data', false, /\.json$/))
}
