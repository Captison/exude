<template>
  <x-flex v-bind="$attrs" inline invert :cursor="link.cursor" v-on="link.events">
    <!-- @slot drag handle content -->
    <slot />
  </x-flex>
</template>


<script>
import { context } from '_source/mixins'
import XFlex from '_components/layout/XFlex'


/**
    Drag handle for __XDraggable__.
    
    This component requires an ancestor __WDraggable__.
    
    Unused attributes are passed to __XFlex__.
*/
export default
{
    name: 'XDragHandle',
    
    mixins: [ context('draggable').consumer ],
    
    components: { XFlex },
    
    data: () => ({ link: {} }),
    
    methods:
    {
        changeDraggableContext() { return (this.link = this.draggable()).destroy; }
    }    
}
</script>
