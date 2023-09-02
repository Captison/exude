<template>
  <x-text v-if="available" v-bind="baseProps" @click="handleClick">
    <!-- @slot color value display -->
    <slot> {{ myValue || '???' }} </slot>
    <input ref="input" :class="cn('hideInput')" v-bind="fieldProps" :value="myValue" />
  </x-text>
</template>


<script>
import color from 'color'
import { formField, styler } from '_source/mixins'
import XText from '_components/typography/XText'


/**
    Color Picker.
    
    Currently this supports only the experimental EyeDropper functionality, 
    so nothing is rendered in non-supporting browsers.
    
    Unused attributes are passed to __XText__.
*/
export default
{
    name: 'XColor',
    
    mixins: [ styler, formField ],
    
    components: { XText },
    
    props:
    {
        /**
            Invert color display.            
        */
        invert: Boolean,
        /**
            Color value (hex).
        */
        value: String
    },
    
    computed:
    {
        available() { return !!global.EyeDropper; },
        
        baseProps()
        {
            let { contrast, useValue } = this;
            
            let props =
            {
                display: 'flex',
                colors: contrast + ':' + useValue,
                ...this.$attrs,
                el: 'button',
                disabled: this.isDisabled,
                inactive: this.isDisabled
            };
            
            if (this.invert && props.colors)
                props.colors = props.colors.split(/:/).reverse().join(':');
            
            return props;
        },
              
        contrast() { return this.isDark ? 'white' : 'black'; },
      
        isDark() { return color(this.useValue).isDark(); },
        
        useValue() { return this.myValue || 'black'; }
    },
    
    methods:
    {
        handleClick()
        {
            if (!this.isDisabled)
            {
                // eslint-disable-next-line no-undef
                new EyeDropper().open()
                    .then(res => this.emitUpdate(res.sRGBHex))
                    .catch(error => console.log('eyedropper error', error))
            }
        }
    }
}
</script>
