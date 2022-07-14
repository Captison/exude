<template>
  <x-text v-bind="boxProps" v-on="boxEvents">
    <!-- @slot option content -->
    <slot 
      :hints="link.state.hints"
      :disabled="isDisabled"
      :selected="isSelected"
      :dismiss="() => toggle(false)"
      :select="() => toggle(true)"
      :toggle="toggle" 
    > 
      {{ myLabel }} 
    </slot>
  </x-text>
</template>


<script>
import { context } from '_source/mixins'
import { objectSplitter } from '_lib/utils'
import XText from '_components/typography/XText'


/**
    Selectable elements. Generally used with a __XOptionGroup__ ancestor.

    Unused attributes are passed on to __XText__.
*/
export default
{
    name: 'XOption',
    
    mixins: [ context('optionGroup').consumer ],
    
    components: { XText },
    
    props:
    {
        /**
            Option data value (you can also use `key` instead).
        */
        data: null,
        /**
            Is this option disabled?
        */
        disabled: Boolean,
        /**
            Option display value.
        */
        label: String,
        /**
            Is this option not selectable?
        */
        inactive: Boolean
    },
    
    data()
    {
        let defaultLink =
        {
            // cleanup option
            clearOption: () => {},
            // am I currently selected?
            isSelected: () => this.$attrs.selected || false,
            // option group state
            state: 
            { 
                attrs: {}, // container attributes
                disabled: false, // option group is disabled?
                hints: {}, // option hints
            },
            // set option selected status
            toggle: () => {}
        }

        let toggle = (on) => !this.isDisabled && this.link.toggle(on)

        return { defaultLink, link: defaultLink, toggle };
    },

    computed:
    {
        boxEvents() { return this.isInactive ? {} : { ...this.$hearers, click: () => this.toggle() }; },
      
        boxProps()
        {
            let attrs = { ...this.myAttrs.accept, ...(this.isSelected ? this.myAttrs.reject : {}) };
                      
            let props =
            {
                ...attrs,
                el: this.isInactive ? 'div' : 'button',
                cursor: this.isDisabled ? 'not-allowed' : (this.isInactive ? 'auto' : attrs.cursor || 'pointer'),
                disabled: this.isDisabled
            };
            
            return props;
        },
        
        isDisabled() { return this.disabled || this.link.state.disabled; },
        
        isInactive() { return this.inactive || this.link.state.inactive; },

        isSelected() { return this.link.isSelected(); },
        
        myAttrs()
        {
            let source = { ...this.link.state.attrs, ...this.$attrs };
            let tester = val => !/^sel-/.test(val)
            let editor = key => key.replace(/^sel-/, '')
            // objectSplitter 'reject' items are select state attributes 
            return objectSplitter(source, tester, editor);
        },
        
        myData() { return typeof this.data === 'undefined' ? this.$vnode.key : this.data; },

        myLabel() { return this.label || this.myData + ''; }
    },
    
    watch:
    {
        myData() { this.resetOptionGroupContext(); }
    },

    methods:
    {
        changeOptionGroupContext()
        {
            let data = { data: this.myData };
            
            Object.defineProperty(data, 'label', { get: () => this.myLabel, enumerable: true });
            
            this.link = { ...this.defaultLink, ...(this.optionGroup && this.optionGroup(data)) };
            
            return () => this.link.clearOption();            
        }
    }
}
</script>
