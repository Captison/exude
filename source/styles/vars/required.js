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
        // sunit: 4
    },
    
    animation:
    {      
        /**
            Enumerated CSS animation keyframe definitions.
            
            Define "aliases" using keys that point to other keys.
            
            Internally, the library relies on the following names:
              - `skeletonLoad`: keyframes for skeleton loading animation
        */
        keyframes: {},
        /**
            Enumerated CSS animation specifications.
            
            Specify CSS animation property names using camelCase without 
            `animation` prefix.
              
            Define "aliases" using keys that point to other keys.                
        */
        named: {}
    },
    
    background:
    {      
        /**
            Enumerated CSS background specifications.
            
            Specify CSS background property names using camelCase without 
            `background` prefix.
              
            Define "aliases" using keys that point to other keys.                
        */
        named: {}
    },
    
    button:
    {
        /**
            Default button padding.
        */
        // defaultPad: 'v1em h1.25em'
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
            transparent: '#fff0',
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
              - `copy`: copy to clipboard
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
    
    media:
    {
        /**
            Enumerated CSS media queries.
            
            Define "aliases" using keys that point to other keys.                
        */
        named: {}
    },
    
    shadow:
    {
        /**
            Enumerated box|text-shadow definitions.
            
            Define "aliases" using keys that point to other keys.

            The color part of the definition must be a color defined in this 
            configuration.
        */
        named: {},
    },
  
    transition:
    {
        /**
            Enumerated CSS transition specifications.
            
            Specify CSS transition property names using camelCase without 
            `transition` prefix.
              
            Define "aliases" using keys that point to other keys.
            
            Internally, the library relies on the following names:
              - `default`: default transition spec applied to everything
        */
        named: {}
    }
}
