<template>
  <x-box v-bind="baseProps" @click="dbClick">
    <x-icon :name="icon" :size="size" />
    <input ref="input" :class="cn('input')" v-bind="fieldProps" type="checkbox" :checked="isTrue" />
  </x-box>
</template>


<script>
import { formField, styler } from '_source/mixins'
import { debounce } from '_lib/utils'
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
        this.dbClick = debounce(5, () =>
        {
            this.$refs.input.focus();
            this.emitUpdate(!this.myValue);
        });
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
                position: 'relative'
            }
            
            if (this.isDisabled) props.cursor = 'not-allowed';
            
            return props;
        },
    },

    stylesheet()
    {
        let input =
        {
            height: 0,
            opacity: 0,
            position: 'absolute',
            width: 0
        }

        return { input };
    }
}
</script>
