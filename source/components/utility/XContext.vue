<template>
  <div v-frag>
    <!-- 
        @slot context content 
        All local and ancestor attributes are bound camelCased.
    -->
    <slot v-bind="cased" />
  </div>
</template>


<script>
import { camelCase, paramCase } from 'change-case'
import { context } from '_source/mixins'
import { frag } from '_source/directives'


/**
    Allows for easy provide/inject capability in component form.
    
    The name of the context used internally is 'context'.
*/
export default
{
    name: 'XContext',
    
    mixins: [ context('context').provider ],
  
    directives: { frag },

    computed:
    {
        attrs() { return { ...(this.context && this.context.attrs), ...this.$attrs }; },
      
        cased() { return Object.keys(this.attrs).reduce((o, k) => ({ ...o, [camelCase(k)]: this.attrs[k] }), {}); }        
    },
    
    methods:
    {
        provideContextContext()
        {
            let link = {};
            
            Object.defineProperty(link, 'attrs', { get: () => this.attrs, enumerable: true });
            
            return link;
        }
    }
}
</script>
