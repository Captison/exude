import v from '_styles/vars'
import { fontSize, fontWeight, length, shadow } from '_styles/loaders'
import subCss from '../sub-css'


/**
    CSS typography mixin.
    
    Classes: `font`, `italic`, `letter`, `textShadow`, `textTransform`, 
      `fontWeight`

    @requires styler
*/
export default
{
    aliases: [ 'display', 'font', 'fontWeight', 'italic', 'letter', 'textShadow', 'textTransform' ],
  
    mixins: 
    [ 
        subCss('bold', Boolean, fontWeight),
        subCss('italic', Boolean, v => v ? { fontStyle: 'italic' } : {}),
        subCss('letter', [String, Number], v => ({ letterSpacing: length(v) })),
        subCss('textShadow', String, v => ({ textShadow: shadow(v) })),
        subCss('textTransform', String, v => ({ textTransform: v })),
        subCss('weight', String, fontWeight)
    ],

    props:
    {
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
            CSS letter-spacing value.

            - raw numbers are assumed to be scale units
        */
        letter: [ String, Number ],
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
        fontCss() 
        { 
            let font = fontSize(this.font) || {};
            
            if (this.fontFace) font.fontFamily = this.fontFace;
                                    
            return font;
        },
        
        fontWeightCss() { return { ...this.boldCss, ...this.weightCss }; }
    }    
}
