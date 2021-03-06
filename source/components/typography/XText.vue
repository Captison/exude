<template>
  <x-box 
    v-bind="$attrs" 
    :class="cn('font fontWeight italic textShadow textTransform', true)" 
    :sel="sel" 
    :display="display" 
    v-on="$hearers"
  >
    <!-- @slot default text content -->
    <slot />
  </x-box>
</template>


<script>
import { styler, subCss } from '_source/mixins'
import v from '_styles/vars'
import { fontSize, fontWeight, shadow } from '_styles/loaders'
import XBox from '_components/layout/XBox'


/**
    Renders content in the proper text styles.
    
    Unused attributes are passed on to __XBox__.
*/
export default
{
    name: 'XText',

    mixins: 
    [ 
        styler,
        subCss('bold', Boolean, fontWeight),
        subCss('italic', Boolean, v => v ? { fontStyle: 'italic' } : {}),
        subCss('textShadow', String, v => ({ textShadow: shadow(v) })),
        subCss('textTransform', String, v => ({ textTransform: v })),
        subCss('weight', String, fontWeight)
    ],

    components: { XBox },
    
    props:
    {
        /**
            Display as block element?
        */
        block: Boolean,
        /**
            Make text bold?
        */
        bold: Boolean, 
        /**
            Font size.
        */
        font: String,
        /**
            Font family name.
        */
        fontFace: { type: String, default: () => v.font.defaultFace },
        /**
            Make text italic?

            - use `hItalic` prop to set hover italics
            - use `fItalic` prop to set focus italics
        */
        italic: Boolean,
        /**
            Enumerated text shadow value(s).

            - use `hTextShadow` prop to specify hover box shadow
            - use `fTextShadow` prop to specify focus box shadow
        */
        textShadow: String,
        /**
            CSS text-transform value.

            - use `hTextTransform` prop to specify hover text shadow
            - use `fTextTransform` prop to specify focus text shadow
        */
        textTransform: String,
        /**
            Font weight value 1-9 (for 100-900).  This overrides `bold` prop.

            - use `hWeight` prop to specify hover font weight
            - use `fWeight` prop to specify focus font weight
        */
        weight: String
    },
    
    computed:
    {
        display() { return this.$attrs.display || (this.block ? 'block' : 'inline'); },
      
        // Dynamic CSS 
        
        fontCss() 
        { 
            let font = fontSize(this.font) || {};
            
            if (this.fontFace) font.fontFamily = this.fontFace;
                                    
            return font;
        },
        
        fontWeightCss() { return { ...this.boldCss, ...this.weightCss }; }     
    }    
}
</script>
