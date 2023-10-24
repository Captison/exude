/**
    Library Configuration Object (LCO) Structre
    ---------------------------------------------------------------------------
    Minimum required structure and parameters for the LCO.
    
    Config defined here will be in effect and cannot be overridden.    
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
            Scaling data.
            
            When raw numbers are provided for angle, time, or length data, they 
            will be multiplied by `num` nad labeled as `unit` in the resulting 
            CSS.
        */
        scale: 
        { 
            /**
                Scale angle.
            */
            // angle: { num: 1, unit: 'deg' }, 
            /**
                Scale time.
            */
            // time: { num: 1000, unit: 'ms' }, 
            /**
                Scale length.
            */
            // length: { num: 4, unit: 'px' } 
        },
        /**
            Regular expression value splitters.
        */
        sep:
        {
            /**
                Distinct value separator.
            */
            vs: /:/,
            /**
                Subvalue separator.
            */
            svs: /!/,
            /**
                Whitespace separator.
            */
            ws: /\s+/
        }
    },
    
    animation:
    {      
        /**
            Enumerated CSS animation specifications.
            
            Props that can be used in the enumerations are the same as for
            `EAnimation` component.
              
            Define "aliases" using keys that point to other keys.
        */
        keyframes: {},
        /**
            Enumerated CSS animation specifications.
            
            Define "aliases" using keys that point to other keys.                
        */
        named: {}
    },
    
    background:
    {      
        /**
            Enumerated CSS background specifications.
                          
            Define "aliases" using keys that point to other keys.
        */
        named: {}
    },
        
    color:
    {
        /**
            Enumerated color names. Valid CSS color values must be provided.
                        
            Define "aliases" using keys that point to other keys.
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
            Enumerated font definition objects.  

            Define "aliases" using keys that point to other keys.            
            
            A font object may include
              - `family`: CSS font-family
              - `height`: CSS line-height (scale units)
              - `size`: CSS font-size (scale units)
        */
        named:
        {            
            clear: { size: 'unset', height: 'unset' }
        },

        /**
            Font weight enumerations.
        */
        weight: 
        {
            '9': '900', // black
            '8': '800', // bolder
            '7': '700', // bold
            '6': '600', // strong
            '5': '500', // medium
            '4': '400', // regular
            '3': '300', // light
            '2': '200', // lighter
            '1': '100', // thin
            
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
    
    measure:
    {
        /**
            General purpose enumerated CSS angle values.
            
            Define "aliases" using keys that point to other keys.                
        */
        angle: {},
        
        /**
            General purpose enumerated CSS length values.
            
            Define "aliases" using keys that point to other keys.                
        */
        length: {},
        
        /**
            General purpose enumerated CSS duration values.
            
            Define "aliases" using keys that point to other keys.                
        */
        time: {}
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
        */
        named: {},
    },
  
    selector:
    {
        /**
            Enumerated CSS selectors for extension components.
            
            Define "aliases" using keys that point to other keys.
        */
        named:
        {
            after: '&::after',
            before: '&::before',
            focus: '&:focus',
            focusIn: '&:focus-within',
            hover: '&:hover'
        }
    },
  
    stylesheet:
    {
        /**
            Enumerated CSS stylesheet specifications.
            
            Define "aliases" using keys that point to other keys.
        */
        named: {}
    },

    transition:
    {
        /**
            Enumerated CSS transition specifications.
            
            Define "aliases" using keys that point to other keys.
        */
        named: {}
    }
}
