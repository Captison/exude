<script>
import { context } from '_source/mixins'
import { frag } from '_source/directives'


/**
    Creates functional components on-the-fly via a slot
*/
export default
{
    name: 'XSlotter',
    
    mixins: [ context('slotter').provider ],
    
    directives: { frag },

    render(h)
    {
        /**
            @slot default content (binds named slot components)
        */
        return h('div', { directives: [{ name: 'frag' }] }, this.$scopedSlots.default(this.slotComponents()));
    },
    
    methods:
    {
        provideSlotterContext() { return () => this.slotComponents(); },
      
        slotComponents()
        {
            let { $scopedSlots } = this, comps = this.slotter ? this.slotter() : {};
            
            let mapper = (map, name) =>
            {
                map[name] = 
                {
                    name,
                    render() { return $scopedSlots[name](this.$attrs); }
                }
                
                return map;
            }            

            return Object.keys($scopedSlots).filter(slot => slot !== 'default').reduce(mapper, comps);
        }      
    }
}
</script>
