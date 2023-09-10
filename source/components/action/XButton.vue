<template>
  <x-text v-bind="$attrs" el="button" :font="font" :disabled="isDisabled" :inactive="isDisabled" v-on="buttonEvents">
    <e-stylesheet flex pointer place=":center" :gap="gap" :pad="pad" />
    <x-icon v-if="icons.one" :name="icons.one" :size="iconSize" />
    <!-- @slot button label (overrides `label` prop) -->
    <slot> {{ label }} </slot>
    <x-icon v-if="icons.two" :name="icons.two" :size="iconSize" />
  </x-text>
</template>


<script>
import { formAction } from '_source/mixins'
import { fontSize } from '_styles/loaders'
import EStylesheet from '_components/extension/EStylesheet'
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

    components: { EStylesheet, XIcon, XText },
    
    props:
    {
        /**
            Font size for button text.
            
            Effectively, this is the button size.
        */
        font: String,
        /**
            CSS row and column gap values as `column:row` (scale units).
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
                click: e => this.heClick(e)
            }
            
            return events;
        },
      
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
        heClick(event)
        {
            this.formAction();
            this.$emit('click', event);            
        }
    }
}
</script>
