<template>
  <x-draggable 
    v-if="show"
    v-bind="$attrs" 
    float="fixed" 
    :native="false"
    @mouseenter="() => closeTimer.stop()"
    @mouseleave="() => closeTimer()"
  >
    <x-box :margin="frame" cursor="default" @mousedown.stop>
      <!-- @slot floater content -->
      <slot :close="() => showOff()" />
    </x-box>
  </x-draggable>
</template>


<script>
import XBox from '_components/layout/XBox'
import XDraggable from '_components/drag-and-drop/XDraggable'
import { toggle } from '_source/mixins'
import { debounce } from '_lib/utils'


/**
    A non-modal floating window for short messages/displays.
    
    Unused attributes are passed to __XDraggable__.
*/
export default
{
    name: 'XFloater',
    
    mixins: [ toggle('show') ],
    
    components: { XBox, XDraggable },
    
    props:
    {
        /**
            Floater window frame thickness.
            
            Effectively the margin setting for the floater content box.
            @see `XBox.margin` for details.
        */
        frame: [ String, Number ],
        /**
            Time before floater close (ms).            
        */
        timeo: { type: Number, default: -1 },
    },
    
    created()
    {
        this.closeTimer = debounce(() => this.showOff(), this.timeo);
    },
    
    watch:
    {
        show() { this.show ? this.closeTimer(this.timeo) : this.closeTimer.stop(); }
    }
}
</script>
