<template>
  <x-button v-bind="$attrs" @click.stop="handleClick">
    <x-icon v-if="icon" :name="icon" :size="size" /> {{ label }}
  </x-button>
</template>


<script>
import XButton from '_components/action/XButton'
import XIcon from '_components/assets/XIcon'


/**
    Allows display of element in full screen mode.
    
    The container element is relatively positioned.
    
    Unused attributes are passed on to __XButton__.    
*/
export default
{
    name: 'XFullscreen',
    
    components: { XButton, XIcon },
    
    props:
    {
        /**
            Icon name.
        */
        icon: { type: String, default: 'fullscreen' },
        /**
            Button label.
        */
        label: String,
        /**
            Icon size.
        */
        size: [ String, Number ],
        /**
            Id of the element to trigger fullscreen mode for.
        */
        targetId: String
    },
    
    methods:
    {
        handleClick()
        {
            document.getElementById(this.targetId).requestFullscreen();
        }
    }
}
</script>
