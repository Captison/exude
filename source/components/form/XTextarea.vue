<template>
  <x-text v-bind="baseProps" v-on="evts">{{ myValue }}</x-text>
</template>


<script>
import { formField } from '_source/mixins'
import XText from '_components/typography/XText'


/**
    HTML textarea control.
    
    Unused attributes are passed to __XText__/textarea.
*/
export default
{
    name: 'XTextarea',
    
    mixins: [ formField ],
    
    components: { XText },
    
    computed:
    {
        baseProps() 
        {
            let props = 
            {
                ...this.$attrs, 
                ...this.fieldProps,
                el: 'textarea'
            };

            if (this.isDisabled) props.cursor = 'not-allowed';
            
            return props; 
        }
    } 
}
</script>
