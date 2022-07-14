<template>
  <x-box v-bind="baseProps" v-on="baseEvents">
    <!-- 
        @slot draggable content 
        @binding { boolean } dragging
          Is this item currently being dragged?
    -->
    <slot :dragging="dragging" />
    <!-- replaces the standard html "ghost" image on drag -->
    <div v-if="!native" ref="empty" style="visibility:hidden;position:absolute;height:1px;width:1px" />
  </x-box>
</template>


<script>
import { context } from '_source/mixins'
import { dom } from '_lib/utils'
import binfo from '_lib/browser-info'
import XBox from '_components/layout/XBox'


let cascadingAttrs =
[
    'border-collapse',
    'border-spacing',
    'caption-side',
    'color',
    'direction',
    'empty-cells',
    'font-family',
    'font-size',
    'font-style',
    'font-variant',
    'font-weight',
    'font-size-adjust',
    'font-stretch',
    'font',
    'height',
    'letter-spacing',
    'line-height',
    'list-style-image',
    'list-style-position',
    'list-style-type',
    'list-style',
    'orphans',
    'quotes',
    'tab-size',
    'text-align',
    'text-align-last',
    'text-decoration-color',
    'text-indent',
    'text-justify',
    'text-shadow',
    'text-transform',
    'visibility',
    'white-space',
    'width',
    'widows',
    'word-break',
    'word-spacing',
    'word-wrap'
];

/**
    Creates draggable content.
    
    Unused attributes are passed to __XBox__.
*/
export default
{
    name: 'XDraggable',
    
    mixins: [ context('draggable').provider, context('dragDrop').receiver, context('dropZone').receiver ],
    
    components: { XBox },
    
    props:
    {
        /**
            Axis of allowable movement.            
            @values x, y, xy
        */
        axis: { type: String, default: 'xy', validator: value => ['x', 'y', 'xy'].indexOf(value) >= 0 },        
        /**
            Turn off draggable behavior?
        */
        disabled: Boolean,
        /**
            Limit drag area to within nearest positioned parent?
            
            Entire document body is used by default.
            
            Note that CSS flex containers do not work well as fences as they can break dragging.
        */
        fenced: Boolean,
        /**
            Use only built-in HTML drag functionality? 
            
            This causes use of a snapshot of the dragged item rather than a clone.
            
            Pros:
            - may improve performance in some situations
            - better visual representation of dragged element
            
            Cons:
            - dragged item is "ghosted" (partial transparency)
            - axis of movement cannot be controlled (`axis` prop ignored)
            - area of drag cannot be limited (`fenced` prop ignored).
            
            @ignore
        */
        native: Boolean,
        /**
            Prevent collapse of vacated space while dragging?
        */
        noCollapse: Boolean,
        /**
            Data associated with this draggable.
        */
        payload: null,
        /**
            Resync the draggabe clone with the original element on end of drag?
            
            The cloned element will return to the original element's location on an invalid drop.
            
            Set this if the original element moved during the drag and you want the clone to return there.
            @ignore
        */
        syncAtEnd: Boolean
    },
    
    emits:
    {
        /**
            On drag.
            @param { object } event
              Native event object.
            @param { element } clone
              Clone element in drag.
        */
        drag(event, clone) { /* nothing to check here */  },
        /**
            On end of dragging.
            @param { object } event
              Native event object.
        */
        dragend(event) { /* nothing to check here */  },
        /**
            On start of dragging.
            @param { object } event
              Native event object.
        */
        dragstart(event) { /* nothing to check here */  },
        /**
            On enter or leave of legal droppable area.             
            @param { boolean } droppable
              Is this draggable droppable?
        */
        droppable(value) { return typeof value === 'boolean'; }
    },
    
    data: () => ({ dragging: false, droppable: false, handleCt: 0, init: false }),
    
    created()
    {
        this.clone = undefined;
    },
    
    beforeDestroy()
    {
        // for safety in case of unmounting during drag
        if (this.dragging) this.endDrag();
    },
    
    computed:
    {
        baseEvents() { return this.handleCt > 0 ? this.dragEvents : { ...this.dragEvents, ...this.initEvents }; },
        
        baseProps()
        {
            let props =
            {
                ...this.$attrs,
                draggable: this.init, 
                opacity: this.dragging ? 0 : 1,
                pos: !this.dragging || this.noCollapse ? 'static' : 'absolute',
            };
            
            if (this.handleCt <= 0) props.cursor = this.dragCursor;
            
            return props;
        },
        
        canMoveX() { return this.axis && this.axis.indexOf('x') >= 0; },

        canMoveY() { return this.axis && this.axis.indexOf('y') >= 0; },
        
        context() { return this.dropZone || this.dragDrop; },

        dragCursor() { return this.init ? 'grabbing' : 'grab'; },
        
        dragEvents()
        {
            let events =
            {
                dragend: e => this.evtDragEnd(e),
                dragstart: e => this.evtDragStart(e),
                drag: (e) => this.evtDrag(e)
            };
            
            return events;
        },
        
        fenceEl() { return (this.fenced && this.$el.offsetParent) || global.document.body; },
        
        initEvents()
        {
            let events =
            {
                mousedown: () => this.init = !this.disabled,
                mouseup: () => this.init = false
            };
            
            return events;
        }        
    },
    
    watch:
    {
        droppable() { this.$emit('droppable', this.droppable); },
        
        init() 
        {
            if (this.context)
            {
                if (this.init)
                    this.context.target = this.getDragInfo();
                else
                    this.$nextTick(() => this.context.target = null);
            }
        }
    },
    
    methods:
    {
        endDrag()
        {
            this.dragging = false;
            this.init = false;
            this.context && this.context.endDrag();
            
            if (this.clone) this.clone.detach();
        },
        
        getFencing()
        {
            let { fenceEl } = this;
            let { offsetHeight: height, offsetWidth: width } = fenceEl;
            let { offsetTop: top, offsetLeft: left } = dom.pageOffsets(fenceEl);
            let fencing = { top, left, bottom: top + height, right: left + width }
            // adjustments for border box sizing
            if (dom.computeStyle(fenceEl, 'box-sizing') === 'border-box')
            {
                let btw = parseInt(dom.computeStyle(fenceEl, 'border-top-width'));
                let blw = parseInt(dom.computeStyle(fenceEl, 'border-left-width'));
                let bbw = parseInt(dom.computeStyle(fenceEl, 'border-bottom-width'));
                let brw = parseInt(dom.computeStyle(fenceEl, 'border-right-width'));
                
                fencing.bottom -= btw + bbw;
                fencing.right -= blw + brw;
            }

            return fencing;
        },
        
        getDragInfo()
        {
            let dragInfo =
            {
                height: this.$el.offsetHeight,
                width: this.$el.offsetWidth,
                payload: this.payload                
            };
            // this lets us know when we are droppable
            Object.defineProperty(dragInfo, 'droppable', 
            { 
                get: () => this.droppable, 
                set: value => this.droppable = value 
            });
          
            return dragInfo;
        },
      
        evtDrag(event)
        {
            this.dragging = this.init;
            // note that when disabled, a clone will not have been created
            if (this.clone) this.clone.update();

            this.$emit('drag', event, this.clone);         
        },
        
        evtDragEnd(event)
        {
            if (this.init)
            {
                if (this.clone) 
                {
                    if (this.syncAtEnd) this.syncClone();

                    if (!this.droppable)
                    {                        
                        let { info, style } = this.clone;                      
                        style.transition = null; // allow transition (if any) for drop
                        style.left = info.offsetLeft - info.limits.left + 'px';
                        style.top = info.offsetTop - info.limits.top + 'px';                
                    }
                    // timeout allows clone to return to origin on invalid drop
                    setTimeout(() => this.endDrag(), 250);
                }
                else
                {
                    this.endDrag();
                }

                this.$emit('dragend', event);
            }
        },
        
        evtDragStart(event)
        {
            if (this.init)
            {
                this.context && this.context.startDrag();
                // for now all drag ops are 'move'
                event.dataTransfer.dropEffect = 'move';
                
                if (!this.native)
                {
                    // use empty element for html drag (invisible)
                    event.dataTransfer.setDragImage(this.$refs.empty, 0, 0);
                    // prepare clone image for dragging
                    this.setupClone();                    
                }

                this.$emit('dragstart', event);
            }
        },
        
        provideDraggableContext() 
        {
            let link = 
            { 
                events: this.initEvents, 
                destroy: () => this.handleCt-- 
            };
            
            Object.defineProperty(link, 'cursor', { get: () => this.dragCursor });
            
            return () => (this.handleCt++, link)
        },
        
        positionClone()
        {
            let { clone } = this, { info } = clone, { limits } = info;
            // calculate clone position based on mouse position
            let x = this.canMoveX ? binfo.pageX - info.pointerX : info.offsetLeft;
            let y = this.canMoveY ? binfo.pageY - info.pointerY : info.offsetTop;
            // fence in the clone horizontally
            if (x < limits.left) 
                x = limits.left;
            else if (x + clone.offsetWidth > limits.right) 
                x = limits.right - clone.offsetWidth;
            // fence in the clone vertically
            if (y < limits.top) 
                y = limits.top;
            else if (y + clone.offsetHeight > limits.bottom) 
                y = limits.bottom - clone.offsetHeight;
            // assign left and top, adjusting for local fence
            clone.style.left = x - limits.left + 'px';
            clone.style.top = y - limits.top + 'px';
        },
        
        setupClone()
        {
            this.clone = this.$el.cloneNode(true);        
            let { clone, fenceEl } = this;

            this.syncClone();
            // copy cascading attributes to maintain clone visual integrity
            cascadingAttrs.forEach(name => clone.style[name] = dom.computeStyle(this.$el, name));            
            clone.style.position = 'absolute'; 
            clone.style.opacity = 0; // prevent flicker
            
            clone.detach = () => 
            { 
                fenceEl.removeChild(clone);
                this.clone = undefined;
            }
            
            clone.update = () =>
            {
                clone.style.transition = 'none';
                clone.style.opacity = 1;
                clone.update = () => this.positionClone();
                clone.update();      
            }
            
            fenceEl.appendChild(clone);
        },
        
        syncClone()
        {
            let { clone } = this;
            let { offsetTop, offsetLeft } = dom.pageOffsets(this.$el);
                        
            clone.info = 
            { 
                pointerX: binfo.pageX - offsetLeft, 
                pointerY: binfo.pageY - offsetTop, 
                offsetLeft, 
                offsetTop,
                limits: this.getFencing()
            };
        }                
    }    
}
</script>
