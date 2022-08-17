<script>
import { ns } from '_styles/loaders'


/**
    Define CSS keyframes for animation.
*/
export default
{
    name: 'XKeyframes',
        
    props:
    {
        /**
            Name for this keyframes definition.
            
            This name can be used in an animation declaration (see `XBox.animation`).
            
            Remember that CSS keyframe definitions are global so be sure to use a 
            unique value here to prevent collision.
        */
        name: { type: String, required: true }
    },
    
    render(h)
    {
        /**
            @slot frame content
        */
        let slotent = this.$slots.default || [];
              
        let spec = slotent.map(node => 
        {
            if (node.tag === 'frame')
            {
                let { attrs: { at, ...oth } } = node.data;                
                                
                let def = Object.keys(oth).reduce((a, k) => ([ ...a, `${k}: ${oth[k]};` ]), []);
                
                return `${at} { ${def.join(' ')} }`;
            }
        });
        
        let content = `@keyframes ${ns(this.name)} { ${spec.filter(x => x).join(' ')} } `;
                
        return h('style', { attrs: { id: this.$htmlId } }, content);
    }    
}
</script>
