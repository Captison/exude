<script>
import { context } from '_source/mixins'
import { color, toPixels } from '_styles/loaders'
import { exists, objectSplitter, omeda } from '_lib/utils'
import XFlex from '_components/layout/XFlex'
import XBox from '_components/layout/XBox'
import XDraggable from '_components/drag-and-drop/XDraggable'


/**
    Drop zone for draggable elements.
    
    Sharing elements between drop zones requires a common __XDragYard__ ancestor.

    Unused attributes are passed to __XFlex__.
*/
export default
{
    name: 'XDropZone',
    
    mixins: [ context('dropZone').provider, context('dragDrop').consumer ],
    
    props:
    {
        /**
            Set fencing on internal draggables?
            
            Note that this component should not be used as a fence as it is rooted on `XFlex`.
        */
        fenced: Boolean,
        /**
            Use vertical layout?
        */
        invert: Boolean,
        /**
            Space-separated list of scale unit margin values for each drag item.
            @see `XBox.margin` for details.
        */
        itemMargin: String,
        /**
            Item payloads to display in this dropzone.
        */
        items: { type: Array, default: () => ([]) },
        /**
            Maximum number of items that can be dragged into this drop zone.
        */
        max: { type: Number, default: Infinity },
        /**
            A name for this drop zone.            
        */
        name: String,
        /**
            Reject the item currently being dragged?
            
            Item is rejected anyway if:
            - dragged item has no payload set
            - dragged item payload is already represented in this drop zone
            - this drop zone is at or beyond its `max`
            
            Use the `drag-start` event to inform this prop.
        */
        rejectItem: Boolean,
        /**
            Scale unit drop spacer overlap with draggable items.
        */
        spacerOverlap: { type: Number, default: 2 }
    },
    
    emits:
    {
        /**
            On end of dragging an item.                    

            Event parameter `info` includes:
              - `payload` (any): dragged item data.
              - `zone` (string): name of originating drop zone.
                                                    
            The item being dragged must be a descendant of the same `XDragYard`.
            
            @param { object } info
              Details about the dragged item.
        */
        dragend(info) { /* nothing to check here */ },
        /**
            On start of dragging an item.
            
            Event parameter `info` includes:
              - `payload` (any): dragged item data.
              - `zone` (string): name of originating drop zone.
            
            The item being dragged must be a descendant of the same `XDragYard`.
                                                    
            @param { object } info
              Details about the dragged item.
        */
        dragstart(info) { /* nothing to check here */ },
        /**
            On change to items in drop zone.
            
            @param { array } items
              Payloads of current items in drop zone.
        */
        'update:items'(items) { /* nothing to check here */ },
    },
    
    data() 
    {
        let actions = 
        {
            startDrag: () => this.dragging = true,
            endDrag: () => this.dragging = false,
            itemDrop: () => this.itemDrop()
        };
      
        let parent = this;

        let spacer =
        {
            name: 'XDropSpacer',
            
            props: { index: Number },
            
            data: () => ({ dropped: false, inside: false }),
            
            created()
            {
                this.on =
                {
                    drop: () => this.dropped = true,
                    dragenter: () => { this.inside = true; parent.atIndex = this.index; },
                    dragover: e => parent.acceptive && e.preventDefault(),
                    dragleave: () => { this.inside = false; parent.atIndex = -1; }
                };                
            },

            render(h)
            {
                let attrs = 
                { 
                    placeSelf: 'stretch', 
                    pos: 'relative', 
                    // control spacer accessibility via z-index
                    zIndex: parent.acceptive ? '1' : '-1' 
                };
                let target = parent.context.target || {};
                
                if (parent.invert)
                {
                    attrs.height = (this.inside ? target.height || 0 : 0) + 'px';
                    attrs.pad = 'v' + parent.spacerOverlap;
                    attrs.margin = 'v-' + parent.spacerOverlap;
                }
                else
                {
                    attrs.width = (this.inside ? target.width || 0 : 0) + 'px';
                    attrs.pad = 'h' + parent.spacerOverlap;
                    attrs.margin = 'h-' + parent.spacerOverlap;
                }
              
                let style = { boxSizing: 'content-box' };
                if (!parent.dragging) style.transition = 'none';
                
                return h(XBox, { attrs, on: this.on, style });
            },
            
            updated()
            {
                // using `dropped` to clear `inside` here ensures that the
                // spacer doesn't collapse before the dropped element appears.
                if (this.dropped) this.inside = false;
                    
                this.dropped = false;
            }            
        }
        
        return { actions, allowDrop: false, atIndex: -1, dragDropState: {}, dragging: false, spacer };
    },
    
    render(h)
    {
        let { dragDropContext, dropZoneContext, fenced, invert, itemMargin } = this;
      
        let attrs = 
        { 
            ...this.myAttrs.accept, 
            ...(this.acceptive ? this.myAttrs.reject : {}),
            invert, 
            wrap: false 
        };
        
        let content = [];

        content.push(h(this.spacer, { key: 'spacer-0', attrs: { index: 0 } }));
        
        this.items.forEach((payload, index) => 
        {
            let attrs = { dragDropContext, dropZoneContext, payload, margin: itemMargin, fenced };
            // determine a key for this element
            let key = typeof payload !== 'object' ? payload : omeda(payload).key;      
            /**
                @slot item layout
                
                Wrapped in `XDraggable` and repeated for every item in the drop zone.
                
                `XDraggable` default slot bindings are also available here.
                
                @binding { any } payload
                  Item data.
            */
            let scopedSlots = { default: slotdata => this.$scopedSlots.default({ ...slotdata, payload }) };

            content.push(h(XDraggable, { key, attrs, scopedSlots }));
            // add drop spacers if drop-ready
            content.push(h(this.spacer, { key: 'spacer-' + key, attrs: { index: index + 1 } }));
        });

        return h(XFlex, { attrs, on: { drop: () => this.context.itemDrop() } }, content);
    },
    
    computed:
    {
        acceptive() { return this.dragging && this.allowDrop; },
      
        context() { return this.dragDrop || this.actions; },
        // acceptance indicator attributes
        myAttrs()
        {
            let source = { ...this.dragDropState.attrs, ...this.$attrs };
            let tester = val => !/^ind-/.test(val)
            let editor = key => key.replace(/^ind-/, '')
            // objectSplitter 'reject' items are indicator state attributes 
            return objectSplitter(source, tester, editor);
        }
    },
    
    watch:
    {
        atIndex() { this.context.target.droppable = this.atIndex >= 0; },
        
        dragging()
        {
            if (this.context.target)
            {
                let { payload, zone } = this.context.target;
                
                if (this.dragging)
                {
                    this.allowDrop = this.canAccept();
                    this.$emit('dragstart', { payload, zone });
                }
                else
                {
                    this.allowDrop = false;
                    this.atIndex = -1;                
                    this.$emit('dragend', { payload, zone });
                }
            }
        }
    },
        
    methods:
    {
        canAccept()
        {
            let { origin, payload } = this.context.target || {};
            // reject if there is no payload
            if (!exists(payload)) return false;
            // reject if this drop zone at or over maximum
            if (this.items.length >= this.max) return false;
            // reject if payload is already represented in this drop zone
            if (this.items.indexOf(payload) >= 0 && origin !== this._uid) return false;
            // accept/reject based on external input
            return !this.rejectItem;
        },
        
        changeDragDropContext() 
        { 
            if (this.dragDrop)
            {
                this.dragDropState = this.dragDrop.state;
                return this.dragDrop.listen(this.actions); 
            }
        },
        
        itemDrop()
        {
            let list = null;
            let { origin, payload } = this.context.target;
            let pindex = this.items.indexOf(payload);
            
            let remove = () => [ ...this.items.slice(0, pindex), ...this.items.slice(pindex + 1) ]
            
            if (this.atIndex >= 0)
            {
                let index = this.atIndex;
                
                list = pindex >= 0 ? remove() : this.items;
                // adjust index for deletion
                if (pindex >= 0 && index > pindex) index -= 1;
                
                list = [ ...list.slice(0, index), payload, ...list.slice(index) ];
            }
            else if (this._uid === origin)
            {
                if (pindex >= 0) list = remove();
            }
            // emit change to item list if necessary
            if (list) this.$emit('update:items', list);
        },
        
        provideDropZoneContext() 
        {
            let link = 
            {
                startDrag: () => this.context.startDrag(),
                endDrag: () => this.context.endDrag()
            };
            
            Object.defineProperty(link, 'target', 
            {
                get: () => this.context.target,
                set: data => 
                {
                    this.context.target = Object.create({},
                    {
                        ...Object.getOwnPropertyDescriptors(data || {}),
                        origin: { value: this._uid }, 
                        zone: { value: this.name },
                        index: { value: this.items.indexOf(data && data.payload) }
                    });
                },
                configurable: false
            });
            
            return link;
        }
    }    
}
</script>
