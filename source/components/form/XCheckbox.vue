<template>
  <x-box v-bind="baseProps" @click="handleInput">
    <x-icon :name="icon" :size="size" />
    <input ref="input" :class="cn('hideInput')" v-bind="fieldProps" type="checkbox" :checked="isTrue" />
  </x-box>
</template>


<script>
import { formField, styler } from '_source/mixins'
import XBox from '_components/layout/XBox'
import XIcon from '_components/assets/XIcon'


/**
    HTML checkbox wrapper.
*/
export default
{
    name: 'XCheckbox',

    mixins: [ styler, formField ],

    components: { XBox, XIcon },

    props:
    {
        /**
            Checkbox size.
            @see `XIcon.size` for details.
        */
        size: [ String, Number ],
        /**
            Checkbox state.
        */
        value: Boolean
    },

    created()
    {
        this.inputValue = () => !this.myValue
    },

    computed:
    {
        icon() { return this.isTrue ? 'check' : 'checkEmpty'; },
        
        baseProps()
        {
            let props =
            {
                ...this.$attrs,
                el: 'span', 
                display: 'inline-flex',
                pos: 'relative'
            }
            
            if (this.isDisabled) 
            {
                props.cursor = 'not-allowed';
                props.inactive = true;
            }
            
            return props;
        }
    }
}
</script>
