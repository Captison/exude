<template>
  <x-flex 
    v-bind="$attrs" 
    inline
    aligns=":center"
    :height="height"
    :width="width"
    :colors="colors"
    :i-colors="iColors"
    :pad="'a' + height * 0.25"
    pos="relative"
    :radius="'a' + height / 2"
    :inactive="isDisabled"
    i-cursor="not-allowed"
    @click="handleInput"
  >
    <e-background clip="content-box" />
    <x-flex 
      ref="knob" 
      aligns=":stretch"
      :width="height" 
      overflow="hidden" 
      pos="absolute" 
      :trbl="knobPos" 
      radius="a50%"
    >
      <e-transition property="left" duration=".25" timing="ease" />
      <!-- 
          @slot knob content           
          Rendered inside a flex container.
          @binding { boolean } disabled
            Is this toggle disabled?
      -->
      <slot :disabled="isDisabled">
        <x-box width="100%" colors=":prime" hf-colors=":accent" i-colors=":prime_l.5" :inactive="isDisabled" />
      </slot>
    </x-flex>
    <input :class="cn('hideInput')" v-bind="fieldProps" type="checkbox" :checked="isTrue" />
  </x-flex>
</template>


<script>
import { formField, styler } from '_source/mixins'
import { toSunits } from '_styles/loaders'
import EBackground from '_components/extension/EBackground'
import ETransition from '_components/extension/ETransition'
import XBox from '_components/layout/XBox'
import XFlex from '_components/layout/XFlex'


/**
    Toggle (switch) boolean form control.
*/
export default
{
    name: 'XToggle',

    mixins: [ styler, formField ],

    components: { EBackground, ETransition, XBox, XFlex },

    props:
    {
        /**
            Colors for toggle control.
            @see `XBox.colors` for details.
        */
        colors: { type: String, default: ':second' },
        /**
            Scale unit height of toggle control.
            
            This is the height (and width) of the control knob.
        */
        height: { type: Number, default: 5 },
        /**
            Disabled colors for toggle control.
            @see `XBox.colors` for details.
        */
        iColors: { type: String, default: ':second_l.5' },
        /**
            Toggle state.
        */
        value: Boolean,
        /**
            Scale unit width of toggle control.
            
            This is the width of the track.
        */
        width: { type: Number, default: 10 }
    },
    
    data: () => ({ knobPos: 'v0 l0' }),

    created()
    {
        this.inputValue = () => !this.myValue
    },
    
    mounted()
    {
        let action = () =>
        {
            let { $el = {}, myValue, $refs: { knob = {} } = {} } = this;          
            this.knobPos = 'v0 l' + (myValue ? toSunits($el.offsetWidth - knob.$el.offsetWidth) : 0);            
        }
        
        this.$watch('myValue', action);
        action();
    }
}
</script>
