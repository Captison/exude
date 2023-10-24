import cssm from '_css/mapper'
import { fontWeight } from '_css/rule'
import { shadow, toRaw } from '_css/value'
import subCss from '../sub-css'


/**
    CSS typography mixin.
    
    Classes: `font`, `italic`, `letter`, `textShadow`, `textTransform`, 
      `fontWeight`

    @requires styler
*/
export default
{
    aliases: [ 'display', 'font', 'fontWeight', 'italic', 'letter', 'text', 'textShadow' ],
  
    mixins: 
    [ 
        subCss('bold', Boolean, fontWeight),
        subCss('italic', Boolean, v => v ? { fontStyle: 'italic' } : {}),
        subCss('letter', [String, Number], v => ({ letterSpacing: toRaw.extent.str(v) })),
        subCss('textShadow', String, v => ({ textShadow: shadow(v) })),
        subCss('weight', String, fontWeight)
    ],

    props:
    {
        /**
            Make text bold?
        */
        bold: Boolean, 
        /**
            CSS font values as `fontFamily:fontSize:lineHeight`.
            
            @enum from lco.font.named
        */
        font: String,
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
            Colon-separated CSS text-transform and text-decoration values.
        */
        text: String,
        /**
            Enumerated text shadow value(s).

            - use `hTextShadow` prop to specify hover box shadow
            - use `fTextShadow` prop to specify focus box shadow
        */
        textShadow: String,
        /**
            Font weight value 1-9 (for 100-900).  This overrides `bold` prop.

            - use `hWeight` prop to specify hover font weight
            - use `fWeight` prop to specify focus font weight
        */
        weight: String
    },
    
    computed:
    {
        fontCss() { return cssm.font(this.font); },
        
        fontWeightCss() { return { ...this.boldCss, ...this.weightCss }; },
        
        textCss() { return cssm.text(this.text); }
    }    
}
