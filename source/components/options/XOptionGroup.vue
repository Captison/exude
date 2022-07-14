<template>
  <div style="display:contents">
    <!-- @slot options list -->
    <slot />
    <!-- TODO: Address potential accessibility issue with 'display:contents' box -->
  </div>
</template>


<script>
import { context } from '_source/mixins'


/**
    Parent component for selectable option elements.
    
    Attributes are passed on to child __XOption__ elements.
*/
export default
{
    name: 'XOptionGroup',
  
    mixins: [ context('optionGroup').provider ],

    props:
    {
        /**
            Are the options in this group disabled?
        */
        disabled: Boolean,
        /**
            Are the options in this group inactive?
        */
        inactive: Boolean,
        /**
            Limit the number of options that can be selected.
        */
        limit: { type: Number, default: Infinity },
        /**
            Allow multiple options to be selected?
        */
        multi: Boolean,
        /**
            Name of identifying `value` property for option objects.
            
            This should be specified when using JS objects as option values.
        */
        optionKey: String,
        /**
            Currently selected option(s).
        */
        value: null
    },

    emits:
    {
        /**
            On value update.
            
            If multi prop set, `value` will be an array.
            
            @param { any } value
              Updated value ar array of values.
        */
        'update:value'(value) { return true; }
    },

    data: () => ({ map: new Map(), optionChange: 0 }),

    beforeCreate()
    {
        this.getOptionKey = value => 
        {
            let { optionKey } = this;
            return optionKey && typeof value === 'object' && value ? value[optionKey] : value;
        }
        this.indexOf = value => this.keyValues.indexOf(this.getOptionKey(value))
    },
      
    computed:
    {
        hints()
        {
            let { multi } = this;
            let hints = { multi };
            
            return hints;
        },
      
        keyValues() { return this.optionKey ? this.values.map(this.getOptionKey) : this.values; },
        
        values() { return [undefined, null, ''].indexOf(this.value) >= 0 ? [] : [].concat(this.value); }
    },

    methods:
    {
        /**
            Returns details for a specified option in this group.
            @public
            
            @param { any } value
              Value of the option needed.
            @return { object }
              Details object for the given option or undefined if not found.
        */
        getOption(value) { this.map.get(this.getOptionKey(value)); },

        provideOptionGroupContext()
        {
            let state = {};
            
            Object.defineProperty(state, 'attrs', { get: () => this.$attrs || {}, enumerable: true });
            Object.defineProperty(state, 'disabled', { get: () => this.disabled, enumerable: true });
            Object.defineProperty(state, 'hints', { get: () => this.hints, enumerable: true });
            Object.defineProperty(state, 'inactive', { get: () => this.inactive, enumerable: true });
          
            return config =>
            {
                let { data } = config;
                let optionKey = this.getOptionKey(data);
                                
                let link =
                {
                    clearOption: () => this.map.delete(optionKey),
                    isSelected: () => this.keyValues.indexOf(optionKey) >= 0,
                    toggle: bool => this.toggleOption(data, bool),                    
                    state
                };

                this.map.set(optionKey, config);

                return link;
            }
        },
        
        toggleOption(value, bool)
        {
            let index = this.indexOf(value);
            let limit = typeof this.limit === 'number' ? this.limit : Infinity;
            let isBool = typeof bool === 'boolean';

            if (index >= 0 && (!isBool || !bool))
            {
                if (this.multi)
                    this.$emit('update:value', this.values.slice(0, index).concat(this.values.slice(index + 1)));
            }
            else if (index < 0 && (!isBool || bool) && this.values.length < limit)
            {
                this.$emit('update:value', this.multi ? [ ...this.values, value ] : value);
            }
        }
    }
}
</script>
