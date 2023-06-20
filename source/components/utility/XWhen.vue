<template>
  <div v-frag>
    <!-- @slot variating content -->
    <slot v-bind="params" />
  </div>
</template>


<script>
import { camelCase, paramCase } from 'change-case'
import { frag } from '_source/directives'


/**
    Generates alternative values when a condition is met.
    
    Alternative values are attributes prefixed with a `w`.
*/
export default
{
    name: 'XWhen',
  
    directives: { frag },

    props:
    {
        /**
            Trigger alternative `w` values?
        */
        test: Boolean
    },
    
    created()
    {
        this.refix = /^w-/;
    },
    
    computed:
    {
        params() 
        {
            let whens = {}, statics = {}, { $attrs, refix, test } = this;

            Object.keys($attrs).forEach(name =>
            {
                if (typeof $attrs[name] !== 'undefined')
                {
                    let kebab = paramCase(name);
                  
                    if (!refix.test(kebab))
                        statics[kebab] = $attrs[name];
                    else if (test)    
                        whens[kebab.replace(refix, '')] = $attrs[name];
                }
            });

            let params = { ...statics, ...whens };
            
            return Object.keys(params).reduce((o, k) => ({ ...o, [camelCase(k)]: params[k] }), {});
        }
    }
}
</script>
