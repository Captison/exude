import context from '../context'
import { exists, optionIndexer, watch } from '_lib/utils'


/**
    Option chooser mixin.

    Members for implementers:
    - `updateOptions` (function): receive option updates
    - `multi` (boolean): set for multiple selection
    - `limit` (number): limit number of selections
    - `isDisabled` (boolean): disabled state
    - `readonly` (boolean): uneditable but non-disabled state
    - `value` (any): current selected option(s)
*/
export default
{
    mixins: [ context('chooser').provider ],

    props:
    {
        /**
            Name of identifying `value` property for option objects.
            
            This should be specified when using JS objects as option values.
        */
        optionKey: String
    },

    emits:
    {
        /**
            On option toggle.
            
            @param { any } value
              Value of toggled option.
            @param { boolean } active
              Was option toggled on?
        */
        option(value, active) { return typeof active === 'boolean'; }
    },

    data: () => ({ map: new Map(), optionChange: 0 }),

    beforeCreate()
    {
        this.getOptionKey = value => 
        {
            let { optionKey } = this;
            return optionKey && typeof value === 'object' && value ? value[optionKey] : value;
        }
        this.getOption = value => this.map.get(this.getOptionKey(value))
        this.getOptionLabel = value => this.map.get(this.getOptionKey(value))?.label || ''
        this.getOptionFrom = (step = 0) => this.indexer.move(step)
        this.indexOf = value => this.keyValues.indexOf(this.getOptionKey(value))
    },
      
    created()
    {
        watch(this, 'currentOption', null, (now, old) =>
        {
            if (now !== old)
            {
                this.getOption(old)?.blur();
                this.getOption(now)?.focus();
                
                /**
                    On current option change.
                    @param { string } value
                      Value of option receiving focus.                 
                */
                this.$emit('option:focus', now);
            }
        });
        
        Object.defineProperty(this, 'totalOptions', { get: () => this.indexer ? this.indexer.total() : 0 });
        Object.defineProperty(this, 'availableOptions', { get: () => this.indexer ? this.indexer.count() : 0 });
        Object.defineProperty(this, 'optionCount', { get: () => this.map.size });
    },

    mounted()
    {
        this.indexer = optionIndexer(this.$el, () => this.currentOption, this.chooserContext);
    },

    computed:
    {
        isDisabled() { return false; },
      
        isUnavailable() { return this.disabled || this.readonly },
        
        keyValues() { return this.optionKey ? this.values.map(this.getOptionKey) : this.values; },
        
        values() { return [undefined, null, ''].indexOf(this.value) >= 0 ? [] : [].concat(this.value); }
    },

    watch:
    {
        optionChange: { immediate: true, handler() { if (this.indexer) this.indexer.clear(); } },      
    },

    methods:
    {
        convertOptionHints(hints)
        {
            if (typeof hints === 'string')
            {
                let reducer = (object, string) =>
                {
                    let [ attr, value = true ] = string.split(/:/);
                    return { ...object, [attr.trim()]: value };
                };

                return hints.split(/\s*,\s*/).reduce(reducer, {});
            }

            return hints;
        },

        createKeyNav(xStep, yStep)
        {
            return keycode =>
            {
                switch (keycode.toLowerCase())
                {
                    case 'arrowleft': this.currentOption = this.indexer.move(-xStep); return keycode;
                    case 'arrowright': this.currentOption = this.indexer.move(xStep); return keycode;
                    case 'arrowup': this.currentOption = this.indexer.move(-yStep); return keycode;
                    case 'arrowdown': this.currentOption = this.indexer.move(yStep); return keycode;
                }
            }
        },
        
        flashOption(message, option = this.currentOption)
        {
            this.getOption(option)?.flash(message);
        },
        
        provideChooserContext()
        {
            let state = {};
            
            Object.defineProperty(state, 'attrs', { get: () => this.boxProps || {}, enumerable: true });
            Object.defineProperty(state, 'disabled', { get: () => this.isDisabled, enumerable: true });
            Object.defineProperty(state, 'multi', { get: () => this.multi, enumerable: true });
          
            return config =>
            {
                let { data } = config;
                let optionKey = this.getOptionKey(data);
                                
                let link =
                {
                    clearOption: () =>
                    {
                        this.map.delete(optionKey);
                        // trigger update for any current option changes
                        this.optionChange += 1;
                    },
                    isInactive: () => !!this.readonly,
                    isSelected: () => this.keyValues.indexOf(optionKey) >= 0,
                    setCurrent: () => this.currentOption = data,
                    state,
                    toggle: bool => this.toggleOption(data, bool),                    
                };

                this.map.set(optionKey, config);
                // trigger update for any current option changes
                this.optionChange += 1;

                return link;
            }
        },
        
        refocus(focus)
        {
            if (exists(this.currentOption))
                this.getOption(this.currentOption)[focus ? 'focus' : 'blur']();
        },

        toggleOption(value, bool)
        {
            let index = this.indexOf(value);
            let limit = typeof this.limit === 'number' ? this.limit : Infinity;
            let isBool = typeof bool === 'boolean';

            if (index >= 0 && (!isBool || !bool))
            {
                if (this.multi)
                {
                    this.$emit('option', value, false);
                    this.updateOptions(this.values.slice(0, index).concat(this.values.slice(index + 1)));
                }
            }
            else if (index < 0 && (!isBool || bool) && this.values.length < limit)
            {
                this.$emit('option', value, true);
                this.updateOptions(this.multi ? [ ...this.values, value ] : value);
            }
        }
    }
}
