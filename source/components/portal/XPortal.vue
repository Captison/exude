<template>
  <div v-frag>
    <component :is="Portal" ref="portal" />
    <!-- default content -->
    <slot />
  </div>
</template>


<script>
import { context } from '_source/mixins'
import { frag } from '_source/directives'


/**
    Renders child __XWormhole__ content.
*/
export default
{
    name: 'XPortal',

    mixins: [ context('portal').provider ],
    
    directives: { frag },
        
    data()
    {
        let ports = {}, shown = [];
        
        let Portal = 
        {
            render: h => h('div', { directives: { frag } }, shown.map(key => ports[key].default())) 
        };
                
        let setup = ({ key, worm }) =>
        {
            ports[key] = worm;
            
            let display = () =>
            {
                if (!shown.includes(key)) 
                    shown = [...shown, key ];
                
                this.$refs.portal.$forceUpdate();
            };

            let dismiss = () =>
            {
                let index = shown.indexOf(key);
                
                if (index >= 0)
                    shown = shown.slice(0, index), shown.slice(index + 1);                    

                this.$refs.portal.$forceUpdate();
            };

            let destroy = () =>
            {
                dismiss();                    
                delete ports[key];
            };

            return { destroy, toggle: active => active ? display() : dismiss() };
        }
        
        return { Portal, setup };              
    },
    
    methods:
    {
        providePortalContext() { return this.setup; }
    }
}
</script>
