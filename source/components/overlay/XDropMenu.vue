<template>
  <x-box v-listen-outside-click="showOff" v-observe-resize="doBaseResize" v-bind="baseProps" v-on="$hearers">
    <!-- @slot menu target -->
    <slot name="target" />
    <x-exapse
      ref="box"
      pos="absolute"
      :expand="show"
      :trbl="trbl"
      :breadth="breadth"
      :max-extent="maxExtent"
      :horiz="!vertOpen"
      :lower="side === 'top' || side === 'left'"
      :z-index="20"
      :hide="!visible"
      @transitionstart="handleTransStart"
      @transitionend="handleTransEnd"
    >
      <!-- @slot menu options -->
      <slot />
    </x-exapse>
  </x-box>
</template>


<script>
import { toggle } from '_source/mixins'
import { toPixels, toSunits } from '_styles/loaders'
import { listenOutsideClick, observeResize } from '_source/directives'
import XBox from '_components/layout/XBox'
import XExapse from '_components/utility/XExapse'


/**
    An overlay for menu items.

*/
export default
{
    name: 'XDropMenu',

    mixins: [ toggle('show') ],

    components: { XBox, XExapse },

    directives: { listenOutsideClick, observeResize },

    props:
    {
        /**
            Percentage offset from edge of target.

            - origin is left edge when `side` is `top` or `bottom`
            - origin is top edge when `side` is `left` or `right`

            @values range from -1 to 1
        */
        edgeOffset: { type: Number, default: 0, validator: value => value >= -1 && value <= 1 },
        /**
            Maximum scale unit height.
        */
        maxHeight: Number,
        /**
            Maximum scale unit width.
        */
        maxWidth: Number,
        /**
            Menu scale unit distance from target.
        */
        offset: { type: Number, default: 0 },
        /**
            CSS position value.

            The default setting forces the root element to serve as the 
            positioned parent for the drop menu.
            
            @see `XBox.pos` for details.
        */
        pos: { type: String, default: 'relative' },
        /**
            Side of target or positioned parent to display.
            @values top, right, bottom, left
        */
        side: { type: String, default: 'bottom' },
        /**
            Switch offset origin to opposite edge of target?

            if `true`, `edgeOffset` origin changes
            - to right edge when `side` is `top` or `bottom`
            - to bottom edge when `side` is `left` or `right`
        */
        swapEdge: Boolean
    },

    data: () => ({ targetHeight: 0, targetWidth: 0, visible: false }),

    mounted()
    {
        this.doBaseResize();
    },
    
    computed:
    {
        baseProps()
        {
            let props =
            {
                // relative position default if target
                pos: this.$slots.target ? 'relative' : null,
                // inline display default if target
                display: this.$slots.target ? 'inline-block' : null,
                ...this.$attrs
            };
            
            return props;
        },
      
        breadth() { return this.vertOpen ? this.maxWidth : this.maxHeight; },

        maxExtent() { return this.vertOpen ? this.maxHeight : this.maxWidth; },
        
        trbl()
        {
            let { swapEdge, targetHeight, targetWidth } = this;
            let offset = toPixels(this.offset || 0);
            let edgeOffset = this.edgeOffset * 100 + '%';

            switch (this.side)
            {
                case 'top': 
                  return 'b' + (targetHeight + offset) + 'px ' + (swapEdge ? 'r' : 'l') + edgeOffset;
                case 'right':
                  return 'l' + (targetWidth + offset) + 'px ' + (swapEdge ? 'b' : 't') + edgeOffset;
                case 'bottom':
                  return 't' + (targetHeight + offset) + 'px ' + (swapEdge ? 'r' : 'l') + edgeOffset;
                case 'left':
                  return 'r' + (targetWidth + offset) + 'px ' + (swapEdge ? 'b' : 't') + edgeOffset;
            }
        },

        vertOpen() { return this.side === 'top' || this.side === 'bottom'; }
    },
    
    methods:
    {
        doBaseResize()
        {
            let { offsetHeight, offsetWidth } = this.$refs.box.$el.offsetParent || {};
            
            this.targetHeight = offsetHeight || 0;
            this.targetWidth = offsetWidth || 0;
        },

        handleTransStart() { if (this.show) this.visible = true; },
        
        handleTransEnd() { if (!this.show) this.visible = false; }
    }
}
</script>
