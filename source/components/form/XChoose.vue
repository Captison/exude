<template>
  <x-option-group v-bind="$attrs" :value="myValue" :disabled="isDisabled" @update:value="emitUpdate($event)">
    <!-- @slot choose option content -->
    <slot />
  </x-option-group>
</template>


<script>
import { formField } from '_source/mixins'
import XOptionGroup from '_components/options/XOptionGroup'


/**
    Wraps __XOptionGroup__ to adapt it for form control use.
    
    Unused attributes are passed to __XOptionGroup__.
*/
export default
{
    name: 'XChoose',
    
    mixins: [ formField ],
    
    components: { XOptionGroup },
    
    props:
    {
        /**
            Currently selected option(s).
        */
        value: null      
    }
}
</script>
