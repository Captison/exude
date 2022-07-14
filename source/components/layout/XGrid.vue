<template>
  <x-box v-bind="$attrs" :class="cn('grid alignment gap', true)" :sel="sel" :display="display" v-on="$hearers">
    <!-- @slot child content -->
    <slot />
  </x-box>
</template>


<script>
import { styler } from '_source/mixins'
import { toPixels } from '_styles/loaders'
import XBox from '_components/layout/XBox'


/**
    CSS grid/inline-grid layout box.
    
    __XBox__ (and derivatives) can be used as CSS Grid children.
    
    Unused attributes are passed on to __XBox__.  
*/
export default
{
    name: 'XGrid',

    mixins: [ styler ],

    components: { XBox },

    props:
    {
        /**
            CSS grid-auto-columns and grid-auto-rows value (space-separated).
        */
        auto: String,
        /**
            CSS grid-template-columns value.
        */
        cols: { type: String, default: 'auto' },
        /**
            Gutter width as `column:row`.
            
            A number without units this is assumed to be a scale-unit value.
        */
        gap: String,
        /**
            Display as inline element?
        */
        inline: Boolean,
        /**
            CSS place-content value.
        */
        placeContent: { type: String, default: 'stretch' },
        /**
            CSS place-items value.
        */
        placeItems: { type: String, default: 'stretch' },
        /**
            CSS grid-template-rows value.
        */
        rows: { type: String, default: 'auto' }
    },

    computed:
    {
        display() { return this.inline ? 'inline-grid' : 'grid' },

        // Dynamic CSS
        
        alignmentCss()
        {
            let [ alignContent, justifyContent = alignContent ] = (this.placeContent || '').split(/\s+/);
            let [ alignItems, justifyItems = alignItems ] = (this.placeItems || '').split(/\s+/);
            
            let alignment = {};

            if (alignContent) alignment = { ...alignment, alignContent, justifyContent };
            if (alignItems) alignment = { ...alignment, alignItems, justifyItems };
            
            return alignment;           
        },
        
        gapCss() 
        { 
            let [ colGap, rowGap ] = (this.gap || '').split(/:/);
            return { gridColumnGap: toPixels.str(colGap), gridRowGap: toPixels.str(rowGap) }; 
        },
        
        gridCss() { return { gridTemplateColumns: this.cols || 'auto', gridTemplateRows: this.rows || 'auto' }; }
    }
}
</script>
