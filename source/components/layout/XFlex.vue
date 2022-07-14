<template>
  <x-box v-bind="$attrs" :class="cn('dir aligns wrap gap', true)" :sel="sel" :display="display" v-on="$hearers">
    <!-- @slot flex child content -->
    <slot />
  </x-box>
</template>


<script>
import { ifnum } from '_lib/utils'
import { styler } from '_source/mixins'
import { toPixels } from '_styles/loaders'
import XBox from '_components/layout/XBox'


/**
    CSS flex/inline-flex layout box.

    __XBox__ (and derivatives) can be used as CSS Flex children.
    
    Unused attributes are passed on to __XBox__.    
*/
export default
{
    name: 'XFlex',

    mixins: [ styler ],

    components: { XBox },

    props:
    {
        /**
            Colon-separated CSS align-content, align-items, and justify-content 
            values.            
            
            Takes the form `align-content:align-items:justify-content`.
        */
        aligns: String,
        /**
            CSS row and column gap values as `column:row` (scale units).
        */
        gap: String,        
        /**
            Display as inline element?
        */
        inline: Boolean,
        /**
            Use column flow (a la `flex-direction: column`)?
        */
        invert: Boolean,
        /**
            Reverse direction flow?
        */
        reverse: Boolean,
        /**
            Wrap flex items onto multiple lines?
        */
        wrap: Boolean,
        /**
            Reverse wrap (bottom to top)?
        */
        wrapRev: Boolean
    },

    computed:
    {
        display() { return this.inline ? 'inline-flex' : 'flex' },
        
        // Dynamic CSS
        
        alignsCss()
        {
            let aligns = {};
            let [ alignContent, alignItems, justifyContent ] = (this.aligns || '').split(/:/);
            
            if (alignContent) aligns.alignContent = alignContent;
            if (alignItems) aligns.alignItems = alignItems;
            if (justifyContent) aligns.justifyContent = justifyContent;
            
            return aligns;
        },
        
        dirCss() { return { flexDirection: (this.invert ? 'column' : 'row') + (this.reverse ? '-reverse' : '') }; },
        
        gapCss() 
        { 
            let gap = {};
            let [ col, row ] = (this.gap || '').split(/:/);
            
            if (col) gap.columnGap = toPixels.str(col);
            if (row) gap.rowGap = toPixels.str(row);
            
            return gap;
        },
                
        wrapCss() { return (this.wrap || this.wrapRev) && { flexWrap: this.wrapRev ? 'wrap-reverse' : 'wrap' }; }
    }
}
</script>
