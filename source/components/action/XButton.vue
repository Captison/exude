<template>
  <x-text 
    v-bind="$attrs" 
    block 
    el="button" 
    :font="font" 
    :cursor="cursor" 
    :pad="pad"
    :disabled="isDisabled"
    :inactive="isDisabled"
    v-on="buttonEvents"
  >
    <x-flex aligns=":center" :gap="gap">
      <x-icon v-if="icons.one" :name="icons.one" :size="iconSize" />
      <!-- @slot button label (overrides `label` prop) -->
      <slot> {{ label }} </slot>
      <x-icon v-if="icons.two" :name="icons.two" :size="iconSize" />
    </x-flex>
  </x-text>
</template>


<script>
import { formAction } from '_source/mixins'
import { fontSize } from '_styles/loaders'
import XFlex from '_components/layout/XFlex'
import XIcon from '_components/assets/XIcon'
import XText from '_components/typography/XText'


/**
    Renders a HTML button.
    
    Unused attributes are passed on to __XText__.
*/
export default
{
    name: 'XButton',
    
    mixins: [ formAction ],

    components: { XFlex, XIcon, XText },
    
    props:
    {
        /**
            Font size for button text.
            
            Effectively, this is the button size.
        */
        font: String,
        /**
            CSS row and column gap values as `column:row` (scale units).
            @see `XFlex.gap` for details.
        */
        gap: { type: String, default: '1' },        
        /**
            Name of icon to display.
        */
        icon: String,
        /**
            Button label.
        */
        label: String,
        /**
            Space-separated list of directional padding values.
            @see `XBox.pad` for details.
        */
        pad: { type: String, default: 'v0.75em h1.25em' }
    },
    
    emits:
    {
        /**
            On button click.
            
            @param { object } event
              Native event object.
        */
        click(event) { return event instanceof DragEvent; }        
    },
    
    computed:
    {
        buttonEvents()
        {
            let events =
            {
                ...this.$hearers,
                click: e => this.evtClick(e)
            }
            
            return events;
        },
      
        cursor() { return this.disabled ? 'default' : 'pointer'; },
        
        icons()
        {
            let [ one, two ] = (this.icon || '').split(/:/);
            return { one, two };
        },
        // icon-size depends on internals of XText
        iconSize() { return (fontSize(this.font) || {}).lineHeight; }
    },
    
    methods:
    {
        evtClick(event)
        {
            this.formAction();
            this.$emit('click', event);            
        }
    }
}
</script>
