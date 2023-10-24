import cssm from '_css/mapper'
import { border, radius } from '_css/rule'
import { shadow } from '_css/value'
import subCss from '../sub-css'


/**
    Element framing related CSS properties.
    
    Classes: `border`, `outline`, `radius`, `shadow`
    
    @requires styler
*/
export default
{
    aliases: [ 'border', 'outline', 'radius', 'shadow' ],
  
    mixins:
    [
        subCss('border', String, border),
        subCss('radius', String, radius),
        subCss('shadow', String, v => ({ boxShadow: shadow(v) }))
    ],
  
    props:
    {
        /**
            Space-separated list of directional border values.
            
            Each value takes the form `nX` where `n` can be

            - `t` = top
            - `r` = right
            - `b` = bottom
            - `l` = left
            - `v` = top & bottom
            - `h` = left & right
            - `a` = top, right, bottom & left

            and `X` is a border value taking the form: `width!color!style` where:
              - `width` is a scale unit number (or valid CSS length)
              - `color` is a valid LCO color name (or valid CSS color)
              - `style` is a CSS border style

            Values are merged from left to right.
            
            - use `hBorder` prop to specify hover border
            - use `fBorder` prop to specify focus border
        */
        border: String,
        /**
            Outline specification of the form `width:color:style:space`.
            
              - `width` is a scale unit number (or valid CSS length)
              - `color` is a valid LCO color name (or valid CSS color)
              - `style` is a CSS outline style
              - `space` is a scale unit number for CSS outline-offset            
        */
        outline: String,
        /**
            Space-separated list of directional radius values.

            Each value takes the form `nX` where `n` can be

            - `t` = top-left
            - `r` = top-right
            - `b` = bottom-right
            - `l` = bottom-left
            - `v` = top-left & bottom-right
            - `h` = bottom-left & top-right
            - `a` = top-left, top-right, bottom-right, bottom-left

            and `X` is the number of scale units (or valid CSS length).

            Values are merged from left to right.

            - use `hRadius` prop to specify hover radius
            - use `fRadius` prop to specify focus radius
        */
        radius: String,
        /**
            Enumerated LCO box shadow name(s).
            
            Separate multiple names with commas.

            - use `hShadow` prop to specify hover box shadow
            - use `fShadow` prop to specify focus box shadow
        */
        shadow: String
    },
    
    computed:
    {
        outlineCss() { return cssm.outline(this.outline); }
    }
}
