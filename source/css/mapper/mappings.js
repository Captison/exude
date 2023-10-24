import { trbl } from '_css/rule'
import { borderStyle, color, position, situation, toRaw } from '_css/value'


/**
    Attribute Value Mappings
    ---------------------------------------------------------------------------
    Defines how component prop values map to LCO enumerations and CSS 
    properties.  Generally, each element of the exported object represents a 
    mapping for a single component prop value... a "data-type", of sorts.
    
    Each map element can have a `fields` array mapping or directly be this 
    array.  Each element of the array is an object that can include:
      - `attr`: the CSS property to generate
      - `proc`: function to process the value
      - `alias`: name of the value in the source when prop is an object
      
    In addition, a map element may have a `section` field that denotes the 
    LCO enumeration from which to draw should the component property specify an
    enum instead of a direct value.
*/
export default
{
    alignment:
    [
        { attr: 'textAlign' }, 
        { attr: 'verticalAlign' }
    ],
  
    colors:
    [ 
        { attr: 'color', proc: color }, 
        { attr: 'backgroundColor', proc: color } 
    ],
    
    cursor:
    [
        { attr: 'cursor', alias: 'pointer' },
        { attr: 'cursor' },
        { attr: 'cursor', alias: 'not-allowed' }
    ],
    
    dims:
    [
        { attr: 'height', proc: toRaw.extent.str }, 
        { attr: 'width', proc: toRaw.extent.str } 
    ],
    
    font:
    {
        section: 'font',
        fields:
        [ 
            { attr: 'fontFamily', alias: 'family' }, 
            { attr: 'fontSize', alias: 'size', proc: toRaw.extent.str }, 
            { attr: 'lineHeight', alias: 'height', proc: toRaw.extent.str } 
        ]
    },
    
    gap:
    [
        { attr: 'columnGap', proc: toRaw.extent.str }, 
        { attr: 'rowGap', proc: toRaw.extent.str }
    ],

    gridAuto:
    [
        { attr: 'gridAutoColumns', proc: toRaw.extent.str.spaced }, 
        { attr: 'gridAutoRows', proc: toRaw.extent.str.spaced } 
    ],
    
    gridTemplate:
    [
        { attr: 'gridTemplateColumns', proc: toRaw.extent.str.spaced }, 
        { attr: 'gridTemplateRows', proc: toRaw.extent.str.spaced }      
    ],

    hide:
    [
        { attr: 'visibility', alias: 'hidden' }
    ],

    hideBack:
    [
        { attr: 'backfaceVisibility', alias: 'hidden' }
    ],

    layoutAlignment:
    [
        { attr: 'alignContent' }, 
        { attr: 'alignItems' }, 
        { attr: 'justifyContent' }      
    ],

    layoutPlacement: 
    [
        { attr: 'placeContent' }, 
        { attr: 'placeItems' }
    ],
      
    margin:
    [
        { proc: val => trbl(val, 'margin') }
    ], 
    
    maxDims:
    [
        { attr: 'maxHeight', proc: toRaw.extent.str }, 
        { attr: 'maxWidth', proc: toRaw.extent.str } 
    ],
    
    minDims:
    [
        { attr: 'minHeight', proc: toRaw.extent.str }, 
        { attr: 'minWidth', proc: toRaw.extent.str } 
    ],
    
    object:
    [ 
        { attr: 'objectFit' }, 
        { attr: 'objectPosition', proc: situation } 
    ],

    outline:
    [ 
        { attr: 'outlineWidth', proc: toRaw.extent.str }, 
        { attr: 'outlineColor', proc: color }, 
        { attr: 'outlineStyle', proc: borderStyle, def: 'solid' }, 
        { attr: 'outlineOffset', proc: toRaw.extent.str } 
    ],
    
    pad:
    [
        { proc: val => trbl(val, 'padding') }
    ], 
    
    paints:
    [ 
        { attr: 'stroke', proc: color }, 
        { attr: 'fill', proc: color } 
    ],
    
    perspective:
    [ 
        { attr: 'perspective', proc: toRaw.extent.str }, 
        { attr: 'perspectiveOrigin', proc: situation } 
    ],
    
    position:
    [
        { attr: 'position', alias: 'fixed' },
        { attr: 'position', alias: 'absolute' },
        { attr: 'position', alias: 'relative' },
        { attr: 'position', proc: position }
    ],
    
    text:
    [
        { attr: 'textTransform', alias: 'transform' }, 
        { attr: 'textDecoration', alias: 'decoration' } 
    ],
    
    trbl:
    [
        { proc: trbl }
    ]
}
