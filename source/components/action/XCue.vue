<template>
  <x-flex v-bind="$attrs" el="button" cursor="pointer" :trans="angle" @click="requestToggle">
    <x-icon :name="icon" :size="size" :title="title" />
  </x-flex>
</template>


<script>
import { toggle } from '_source/mixins'
import XFlex from '_components/layout/XFlex'
import XIcon from '_components/assets/XIcon'


/**
    Rotating icon hotspot used to indicate hidden content.
    
    Unused attributes are passed on to __XFlex__.
*/
export default
{
    name: 'XCue',
    
    mixins: [ toggle ],
    
    components: { XFlex, XIcon },
    
    props:
    {        
        /**
            Open and close angles of rotation in degrees.
            
            Should be of the form `open:close` where:
              - `open`: angle when cue open (default: 180)
              - `close`: angle when cue closed (default: 0)            
        */
        angles: String,
        /**
            Name of icon to display.
        */
        icon: { type: String, default: 'caretDown' },
        /**
            Icon size.
        */
        size: [ String, Number ],
    },
    
    computed:
    {
        angle() { return this.states[this.open ? 'open' : 'close' ]; },
        
        states()
        {
            let [ open, close ] = (this.angles || '').split(/:/);            
            return { open: 'rz' + (open || '180'), close: 'rz' + (close || '0') };
        },
        
        title() { return (this.open ? 'close' : 'open') + ' content'; }
    }
}
</script>
