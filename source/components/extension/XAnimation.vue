<script>
import { context } from '_source/mixins'
import { keyframes, toMillis } from '_styles/loaders'


/**
    Works with __XBox__ (and derivatives) to define CSS animation behavior.
    
    This component renders nothing in place.  It simply sends animation 
    handling information to the nearest __XBox__ ancestor.
*/
export default
{
    name: 'XAnimation',
    
    mixins: [ context('animation').consumer ],
    
    props:
    {
        /**
            Include this animation on focus and hover?
        */
        base: Boolean,
        /**
            CSS animation-delay value.

            Unitless numbers are treated as scale time.
        */
        delay: String,
        /**
            CSS animation-direction value.
        */
        dir: String,
        /**
            Ignore this animation spec?
        */
        disabled: Boolean,
        /**
            CSS animation-duration value.

            Unitless numbers are treated as scale time.
        */
        duration: [ String, Number ],
        /**
            Make this a focus animation?
        */
        focus: Boolean,
        /**
            Make this a hover animation?
        */
        hover: Boolean,
        /**
            CSS animation-fill-mode value.
        */
        mode: String,
        /**
            CSS animation-name value.
        */
        name: String,
        /**
            CSS animation-iteration-count value.
        */
        repeat: String,
        /**
            CSS animation-play-state value.
        */
        state: String,
        /**
            CSS animation-timing-function value.
        */
        timing: String,
    },
    
    render()
    {
        return null;
    },

    computed:
    {
        animationDelay() { return toMillis.str(this.delay) || 'initial'; },
        
        animationDirection() { return this.dir || 'initial'; },

        animationDuration() { return toMillis.str(this.duration) || 'initial'; },
        
        animationFillMode() { return this.mode || 'initial'; },

        animationName() { return keyframes(this.name) || 'initial'; },

        animationIterationCount() { return this.repeat || 'initial'; },
        
        animationPlayState() { return this.state || 'initial'; },

        animationTimingFunction() { return this.timing || 'initial'; },

        isBase() { return this.base || false; },

        isDisabled() { return this.disabled || false; },

        isFocus() { return this.focus || false; },

        isHover() { return this.hover || false; }
    },
        
    methods:
    {
        changeAnimationContext()
        {
            if (this.animation)
            {
                let keys = 
                [
                    'animationDelay',
                    'animationDirection',
                    'animationDuration',
                    'animationFillMode',
                    'animationName',
                    'animationIterationCount',
                    'animationPlayState',
                    'animationTimingFunction',
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
                
                return this.animation(keys.reduce(reducer, {}));
            }
        }
    }
}
</script>
