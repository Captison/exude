<template>
  <x-text v-bind="baseProps" v-on="$hearers" @input="handleInput" />
</template>


<script>
import { formField } from '_source/mixins'
import XText from '_components/typography/XText'


/**
    HTML input control.
    
    Unused attributes are passed to __XText__/input.
*/
export default
{
    name: 'XInput',
    
    mixins: [ formField ],
    
    components: { XText },
    
    computed:
    {
        baseProps() 
        {
            let props = 
            {
                autocomplete: 'off',
                ...this.$attrs, 
                ...this.fieldProps,
                el: 'input',
                value: this.myValue
            };

            if (this.isDisabled) props.cursor = 'not-allowed';
            
            return props; 
        }
    }
}
</script>
