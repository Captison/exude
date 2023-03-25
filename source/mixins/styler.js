import { css } from '_lib/deps/stitches-core'


/**
    Styling mixin.
    
    This mixin allows styling of components via a css-in-js solution.
*/
export default
{
    props:
    {
        /**
            Descendant selector to apply all CSS to.
            
            No styling is applied to root element when specified.
            @ignore
        */
        sel: String
    },
  
    created()
    {
        this.statics = this.$options.stylesheet();
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
            let use = selector === true ? this.sel : selector;
            let sel = ruleset => use ? { [use]: ruleset } : ruleset
          
            let names = aliases.split(/\s+/).map(alias => 
            {
                let cssProp = alias + 'Css', fn = '';
                
                if (Object.keys(this[cssProp] || {}).length)
                    fn = css(sel(this[cssProp]));
                else if (this.statics[alias])
                    fn = css(sel(this.statics[alias]));
                                
                return typeof fn === 'function' ? fn() : '';
            });
            // suppress element in CSS when using selector
            if (use) names.unshift(css({ display: 'contents' }));        
            // exclude nonexistent elements (n => n) and join
            return names.filter(n => n).join(' ');
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
