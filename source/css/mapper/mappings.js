import { keyframes } from '_lco/utils'
import { trbl } from '_css/rule'
import { borderStyle, boxing, color, position, situation, toRaw } from '_css/value'


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
  
    animation:
    [
        { attr: 'animationDelay', alias: 'delay', proc: toRaw.time.str, def: 'initial' }, 
        { attr: 'animationDirection', alias: 'dir', def: 'initial' }, 
        { attr: 'animationDuration', alias: 'duration', proc: toRaw.time.str, def: 'initial' }, 
        { attr: 'animationFillMode', alias: 'mode', def: 'initial' }, 
        { attr: 'animationName', alias: 'name', proc: keyframes, def: 'initial' }, 
        { attr: 'animationIterationCount', alias: 'repeat', def: 'initial'}, 
        { attr: 'animationPlayState', alias: 'state', def: 'initial' },
        { attr: 'animationTimingFunction', alias: 'timing', def: 'initial' } 
    ],
    
    background:
    [
        { attr: 'backgroundAttachment', alias: 'attach' },
        { attr: 'backgroundClip', alias: 'clip', proc: boxing },
        { attr: 'backgroundImage', alias: 'image' },
        { attr: 'backgroundOrigin', alias: 'origin', proc: boxing },
        { attr: 'backgroundPosition', alias: 'pos', proc: situation.spaced },
        { attr: 'backgroundRepeat', alias: 'repeat' },
        { attr: 'backgroundSize', alias: 'size', proc: toRaw.extent.str.spaced }      
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
        { attr: 'fill', proc: color }, 
        { attr: 'stroke', proc: color } 
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
    
    transition:
    [
        { attr: 'transitionDelay', alias: 'delay', proc: toRaw.time.str, def: 'initial' }, 
        { attr: 'transitionDuration', alias: 'duration', proc: toRaw.time.str, def: 'initial' }, 
        { attr: 'transitionProperty', alias: 'property', def: 'all' }, 
        { attr: 'transitionTimingFunction', alias: 'timing', def: 'initial' } 
    ],
    
    trbl:
    [
        { proc: trbl }
    ]
}
