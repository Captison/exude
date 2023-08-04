<script>
import { context } from '_source/mixins'
import { set } from '_lib/utils'
import { frag } from '_source/directives'


/**
    Top-level drag and drop coordinator that allows descendant __XDropZone__s 
    to share __XDraggable__s.
    
    Any attributes added to this component are passed to descendant 
    __XDropZone__ components as default attributes.
*/
export default
{
    name: 'XDragYard',
    
    mixins: [ context('dragDrop').provider ],
    
    directives: { frag },

    render(h)
    {
        /** @slot default content */
        return h('div', { directives: [{ name: 'frag' }] }, this.$slots.default);
    },
    
    methods:
    {
        provideDragDropContext()
        {
            let listeners = { start: set(), end: set(), drop: set() };
            let state = {};
            
            Object.defineProperty(state, 'attrs', { get: () => this.$attrs || {}, enumerable: true });
          
            let link =
            {
                state,
                // listener calls
                startDrag: () => listeners.start.array.forEach(fn => fn()),
                endDrag: () => listeners.end.array.forEach(fn => fn()),
                itemDrop: () => listeners.drop.array.forEach(fn => fn()),
                
                listen: ({ startDrag, endDrag, itemDrop }) =>
                {
                    let unregs = [];
                    
                    if (startDrag && listeners.start.add(startDrag))
                        unregs.push(() => listeners.start.del(startDrag));
                        
                    if (endDrag && listeners.end.add(endDrag))
                        unregs.push(() => listeners.end.del(endDrag));
                                        
                    if (itemDrop && listeners.drop.add(itemDrop))
                        unregs.push(() => listeners.drop.del(itemDrop));
                                            
                    return () => unregs.forEach(unreg => unreg());
                }                
            };
            
            let specs = {};

            Object.defineProperty(link, 'target', 
            {
                get: () => specs,
                set: data => { specs = data; },
                configurable: false
            });
            
            return link;
        }
    }
}
</script>
