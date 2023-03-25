<script>
import { context } from '_source/mixins'
import { toPixels } from '_styles/loaders'


/**
    Works with __XBox__ (and derivatives) to define CSS background behavior.
    
    This component renders nothing in place.  It simply sends background 
    styling information to the nearest __XBox__ ancestor.
*/
export default
{
    name: 'XBackground',
    
    mixins: [ context('extension').consumer ],
    
    props:
    {
        /**
            CSS background-attachment value.
        */
        attach: String,
        /**
            Include this background on focus and hover?
            
            Set this to maintain background on focus or hover.
        */
        base: Boolean,
        /**
            CSS background-clip value.
        */
        clip: String,
        /**
            Ignore this background spec?
        */
        disabled: Boolean,
        /**
            Make this a focus background?
        */
        focus: Boolean,
        /**
            Make this a hover background?
        */
        hover: Boolean,
        /**
            Enumerated image value or CSS background-image value.
        */
        image: String,
        /**
            CSS background-origin value.
        */
        origin: String,
        /**
            CSS background-position value.
            
            Unitless numbers are treated as scale units.
        */
        pos: String,
        /**
            CSS background-repeat value.
        */
        repeat: String,
        /**
            CSS background-size value.

            Unitless numbers are treated as scale units.
        */
        size: String,
    },
    
    render()
    {
        return null;
    },

    computed:
    {
        backgroundAttachment() { return this.attach; },
        
        backgroundClip() { return this.clip; },

        backgroundImage() { return this.image; },
        
        backgroundOrigin() { return this.origin; },

        backgroundPosition() { return toPixels.str.spaced(this.pos); },

        backgroundRepeat() { return this.repeat; },
        
        backgroundSize() { return toPixels.str.spaced(this.size); },

        isBase() { return this.base || false; },

        isDisabled() { return this.disabled || false; },

        isFocus() { return this.focus || false; },

        isHover() { return this.hover || false; }
    },
        
    methods:
    {
        changeExtensionContext()
        {
            if (this.extension)
            {
                let keys = 
                [
                    'backgroundAttachment',
                    'backgroundClip',
                    'backgroundImage',
                    'backgroundOrigin',
                    'backgroundPosition',
                    'backgroundRepeat',
                    'backgroundSize',
                    'isBase',
                    'isDisabled',
                    'isFocus',
                    'isHover'
                ]
              
                let reducer = (obj, key) => 
                {
                    Object.defineProperty(obj, key, { get: () => this[key], enumerable: true });
                    return obj;
                }
                
                return this.extension('backgrounds', keys.reduce(reducer, {}));
            }
        }
    }
}
</script>
