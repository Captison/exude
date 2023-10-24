<script>
import { extension, styler } from '_source/mixins'
import { keyframes } from '_lco/utils'
import { toRaw } from '_css/value'


/**
    Extension component for animation styles.

    Adds style rules to its nearest extendable ancestor
    (__XApp__, __XBox__, __XFlex__, __XGrid__, __XText__).

    This component renders nothing in place.   
*/
export default
{
    name: 'EAnimation',
    
    mixins: [ styler, extension ],
    
    props:
    {
        /**
            CSS animation-delay value.

            Unitless numbers are treated as scale time.
        */
        delay: [ String, Number ],
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
            Repeat animation forever?
            
            Ignored when `repeat` is set.
        */
        infinite: Boolean,
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
    
    data: () => ({ extCat: 'animations' }),
    
    computed:
    {        
        sheet() { return this.cs('extension ', this.useSel); },  
        
        // Dynamic CSS
        
        extensionCss()
        {
            let css =
            {
                animationDelay: toRaw.time.str(this.delay) || 'initial',
                animationDirection: this.dir || 'initial',
                animationDuration: toRaw.time.str(this.duration) || 'initial',                
                animationFillMode: this.mode || 'initial',
                animationName: keyframes(this.name) || 'initial',
                animationIterationCount: this.repeat || (this.infinite && 'infinite') || 'initial',                
                animationPlayState: this.state || 'initial',
                animationTimingFunction: this.timing || 'initial'              
            };
            
            return css;
        }
    }
}
</script>
