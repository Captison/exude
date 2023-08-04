/**
    Workbench Setup
    ---------------------------------------------------------------------------
    This file is run when styleguidist loads (via confog) so it can be used to 
    load mock data, global variabls, etc. for the examples.
*/

import Vue from 'vue/dist/vue'
import { defaults, setStyles } from '_styles/vars'
import lco from './LCO/config'


setStyles(defaults, lco);

/**
    Register custom components for use in styleguide.
*/ 
let font = { fontFamily: 'Arial', fontSize: '12px' }

Vue.component('Ctrls', 
{
    template:
    `
      <div :style="style">
        <slot/>
      </div>
    `,
    data: () => ({ style: { ...font, borderLeft: '2px dotted #777', marginTop: '18px', padding: '0px 8px' } })
});
Vue.component('Grp', 
{
    template:
    `
      <div :style="style">
        <span style="font-weight:bold">{{ label }}:</span>
        <slot/>
      </div>
    `,
    props: [ 'label' ],
    data: () => ({ style: font })
});
Vue.component('Opt', 
{
    template:
    `
      <button :style="style" @click="$emit('update:data', isFn ? value() : value)">
        <span :style="{ color: isFn || value === data ? 'blue' : 'inherit' }">
          {{ label || (isFn ? data : value) }}
        </span>
      </button>
    `,
    props: [ 'label', 'value', 'data' ],
    data: () => ({ style: { ...font, cursor: 'pointer', padding: '2px 4px' } }),
    computed: { isFn() { return typeof this.value === 'function'; } }
});


/**
    Set global mockdata
*/
import vars from '_styles/vars'

let random = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min
let colors = Object.keys(vars.color.named);
let icons = Object.keys(vars.icon.named);

global.mock =
{
    color: () => colors[random(colors.length)],
    
    icon: () => icons[random(icons.length)]
}
