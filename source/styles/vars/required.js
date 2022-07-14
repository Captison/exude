/**
    Required Configuration Object Structre
    ---------------------------------------------------------------------------
    Config defined here will be in effect and cannot be overridden.
    
    Generally, this is styling and structre that various components may depend 
    on directly.
*/

export default
{
    basis: 
    {
        /**
            String used to help prevent naming collisions.
        */
        // namespace: 'exude',
        /**
            Scale time value.
        */
        // stime: 100,
        /**
            Scale unit value.
        */
        // sunit: 4,
        /**
            Default overscroll behavior setting.
        */
        // defaultOverscroll: 'contain'
    },
    
    animation:
    {      
        /**
            Enumerated CSS animation keyframe definitions.
            
            Define "aliases" using keys that point to other keys.
            
            Internally, the library relies on the following names:
              - `skeletonLoad`: keyframes for skeleton loading animation
        */
        keyframes: {}
    },

    button:
    {
        /**
            Default button padding.
        */
        // defaultPad: 'v1% h1.25%'
    },
    
    color:
    {
        /**
            Enumerated color names. Valid CSS color values must be provided.
                        
            Define "aliases" using keys that point to other keys.
            
            Internally, the styleguide relies on the following names:
              - `black`: the darkest color
              - `white`: the lightest color
              - `prime`: a primary color
              - `primeDark`: a darker primary color
              - `primeLight`: a lighter primary color
              - `second`: a secondary color
              - `secondDark`: a darker secondary color
              - `secondLight`: a lighter secondary color
              - `terti`: a tertiary color
              - `tertiDark`: a darker tertiary color
              - `tertiLight`: a lighter tertiary color
              - `accent`: an accent color
              - `error`: for error or failure info
              - `info`: for informative content
              - `success`: for successful actions
              - `warn`: for dangerous actions
              
            Internally, the library relies on the following names:              
              - `buttonHover`: button foreground color
              - `link`: hyperlink foreground color
              - `linkHover`: hyperlink foreground hover color
        */
        named:
        {
            transparent: 'transparent',
            current: 'currentColor'
        },
    },
    
    font:
    {
        /**
            Font face definitions.
            
            Each element in this array must be a url that returns CSS font-face
            declaration(s).
        */
        face: [],
        
        /**
            Name of the default font face to use when none specified.
        */
        // defaultFace: 'Arial',
      
        /**
            Enumerated font size rulesets.  
            
            Each font size must have valid CSS values for:
              - `fontSize`
              - `lineHeight`            
        */
        size:
        {            
            clear: { fontSize: 'unset', lineHeight: 'unset' }
        },
        
        /**
            Font weight enumerations.
        */
        weight: 
        {
            '9': '900',
            '8': '800',
            '7': '700',
            '6': '600',
            '5': '500',
            '4': '400',
            '3': '300',
            '2': '200',
            '1': '100',
            
            '+': 'bolder',
            '-': 'lighter',

            clear: 'unset'
        }
    },
    
    icon:
    {        
        /**
            Icon names mapped to SVG markup.
            
            Define "aliases" using keys that point to other keys.
            
            Internally, the library relies on the following names:
              - `caretDown`: downward pointing circumflex for cueing content
              - `check`: a filled checkbox
              - `checkEmpty`: an empty checkbox
              - `checkInd`: an indeterminate checkbox
              - `radio`: a filled radio button
              - `radioEmpty`: an empty radio button
              - `test`: any icon used for testing
        */
        named: {},
        /**
            Async SVG icon provider.
            
            Specify a function here that accepts an icon name and returns a 
            Promise that resolves to SVG icon markup.
        */
        // loader: name => Promise.resolve()        
        /**
            Default icon size (scale units).
        */
        // defaultSize: 6,
    },
    
    image: 
    {
        /**
            Enumerated CSS image definitions (urls/gradients/etc). 
        */
        named: {}
    },
    
    transition:
    {
        /**
            CSS property lists for transition inclusion.
        */
        property: {},
        /**
            Name of the default property list enumeration to use for 
            transitions.
        */
        // defaultProperty: null,
        /**
            CSS time values for property transitions.
        */
        time: {}
        /**
            Name of the default time enumeration to use for CSS transition 
            duration.
        */
        // defaultTime: null,
        /**
            Default value for CSS transition timing function.
        */
        // defaultTimingFunction: 'ease',
    },
  
    shadow:
    {
        /**
            Enumerated box-shadow definitions.
            
            Define "aliases" using keys that point to other keys.

            The color part of the definition must be a color defined in this 
            configuration.
        */
        named: {},
    },
  
    /**
        Standardized z-index enumerations.
    */
    zIndex:
    {
        named:
        {
            head: 50,
            chest: 40,
            waist: 30,
            knee: 20,
            foot: 10,
            
            floor: 0,
            
            foot_: -10,
            knee_: -20,
            waist_: -30,
            chest_: -40,
            head_: -50
        }
    }
}
