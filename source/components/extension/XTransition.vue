<script>
import { context } from '_source/mixins'
import { toMillis } from '_styles/loaders'


/**
    Works with __XBox__ (and derivatives) to define CSS transition behavior.
    
    This component renders nothing in place.  It simply sends transition 
    handling information to the nearest __XBox__ ancestor.
*/
export default
{
    name: 'XTransition',
    
    mixins: [ context('extension').consumer ],
    
    props:
    {
        /**
            Include this transition on focus and hover?
        */
        base: Boolean,
        /**
            CSS transition-delay value.

            Unitless numbers are treated as scale time.
        */
        delay: [ String, Number ],
        /**
            Ignore this transition spec?
        */
        disabled: Boolean,
        /**
            CSS transition-duration value.

            Unitless numbers are treated as scale time.
        */
        duration: [ String, Number ],
        /**
            Make this a focus transition?
        */
        focus: Boolean,
        /**
            Make this a hover transition?
        */
        hover: Boolean,
        /**
            CSS transition-property value.
        */
        property: String,
        /**
            CSS transition-timing-function value.
        */
        timing: String
    },
    
    render()
    {
        return null;
    },

    computed:
    {
        transitionDelay() { return toMillis.str(this.delay) || 'initial'; },
        
        transitionDuration() { return toMillis.str(this.duration) || 'initial'; },
        
        transitionProperty() { return this.property || 'all'; },

        transitionTimingFunction() { return this.timing || 'initial'; },

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
                    'transitionDelay',
                    'transitionDuration',
                    'transitionProperty',
                    'transitionTimingFunction',
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
                
                return this.extension('transitions', keys.reduce(reducer, {}));
            }
        }
    }
}
</script>
