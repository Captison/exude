<template>
  <x-box v-listen-outside-click="showOff" v-observe-resize="doResize" v-bind="baseProps" v-on="$hearers">
    <!-- 
        @slot affected content
        
        If omitted, this component will not provide the positioned parent for 
        the drop menu.
    -->
    <slot name="target" />
    <x-exapse
      ref="box"
      v-bind="$attrs"
      pos="absolute"
      :expand="show"
      :trbl="trbl"
      :horiz="!vertOpen"
      :lower="side === 'top' || side === 'left'"
      :hide="!visible"
      @content-resize="doResize"
      @transitionstart="handleTransStart"
      @transitionend="handleTransEnd"
    >
      <!-- @slot drop menu content -->
      <slot />
    </x-exapse>
  </x-box>
</template>


<script>
import { toggle } from '_source/mixins'
import { toScale } from '_css/value'
import { listenOutsideClick, observeResize } from '_source/directives'
import XBox from '_components/layout/XBox'
import XExapse from '_components/utility/XExapse'


/**
    An overlay for menu items.

    Requires a positioned parent within which to anchor itself.
    
    Unused attributes are passed to __XExapse__.
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
            Menu distance from target (scale units).
        */
        gap: { type: Number, default: 0 },
        /**
            Alignment of target with menu by percentage (0 to 1).
            
            This takes two values in form of `target:menu`.
        */
        offsets: { type: String, default: '0:0' },
        /**
            Side of target or positioned parent to display.
            @values top, right, bottom, left
        */
        side: { type: String, default: 'bottom' }
    },

    data: () => ({ menuHeight: 0, menuWidth: 0, targetHeight: 0, targetWidth: 0, visible: false }),

    mounted()
    {
        this.doResize();
    },
    
    computed:
    {
        baseProps() { return this.$slots.target ? { pos: 'relative', display: 'inline-block' } : {};  },
      
        trbl()
        {
            let { targetHeight, targetWidth } = this;
            let [ t, c ] = this.offsets.split(/:/).map(parseFloat);
            
            if (this.vertOpen) // top or bottom
            {
                return (this.side === 'top' ? 'b' : 't') + (toScale(targetHeight) + this.gap) +
                    ' l' + toScale((t * targetWidth) - (c * this.menuWidth));
            }
            else // left or right
            {
                return (this.side === 'left' ? 'r' : 'l') + (toScale(targetWidth) + this.gap) +
                    ' t' + toScale((t * targetHeight) - (c * this.menuHeight));
            }
        },

        vertOpen() { return this.side === 'top' || this.side === 'bottom'; }
    },
    
    methods:
    {
        doResize()
        {
            let { $el } = this.$refs.box;
            let { offsetHeight, offsetWidth } = $el.offsetParent || {};
            
            this.menuHeight = $el.offsetHeight || 0;
            this.menuWidth = $el.offsetWidth || 0;
            this.targetHeight = offsetHeight || 0;
            this.targetWidth = offsetWidth || 0;
        },

        handleTransStart() { if (this.show) this.visible = true; },
        
        handleTransEnd() { if (!this.show) this.visible = false; }
    }
}
</script>
