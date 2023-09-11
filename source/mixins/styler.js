import { css } from '_lib/deps/stitches-core'


/**
    Styling mixin.
    
    This mixin allows styling of components via a css-in-js solution.
*/
export default
{  
    beforeCreate()
    {
        this.statics = this.$options.stylesheet();
        this.aliases = this.$options.aliases;
    },
    
    methods:
    {
        /**
            Returns css classnames for the list of aliases.
            
            @param { string } aliases
              Space-separated list of aliases.
            @param { string, boolean } selector
              CSS child selector or true to use prop `sel`.
        */
        cn(aliases, selector)
        {
            let sel = rules => selector ? { [selector]: rules } : rules
          
            let names = this.cs(aliases, value => css(sel(value))());

            return names.join(' ');
        },
        
        cs(aliases, process = v => v)
        {
            if (typeof aliases === 'string') aliases = aliases.split(/\s+/);
            let check = v => Object.keys(v || {}).length > 0

            let reducer = (array, alias) =>
            {
                let cssProp = alias + 'Css', value = null, pval = this[cssProp];
                
                if (Array.isArray(pval))
                    value = pval.reduce((a, v) => check(v) ? [ ...a, process(v) ] : a, []);
                else if (check(pval))
                    value = process(pval);
                else if (check(this.statics[alias]))
                    value = process(this.statics[alias]);

                return value ? [ ...array, ...[].concat(value) ] : array;
            }
          
            return aliases.reduce(reducer, []);
        }
    },

    /**
        Override to define immutable styles for the component.
    */
    stylesheet()
    {
        return {};
    }
}
