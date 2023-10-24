<template>
  <div :class="cn('skeleton')">
    <!-- @slot default content -->
    <slot />
    <x-keyframes :name="keyname">
      <!-- 
          @slot keyframes specifications 
          
          Only __XKeyframes__ `frame` elements allowed here. Any other content
          will be ignored.
      -->
      <slot name="frames">
        <frame at="0%" background-position="150% 150%" />  
        <frame at="100%" background-position="-50% -50%" />
      </slot>
    </x-keyframes>
  </div>
</template>


<script>
import { styler } from '_source/mixins'
import { keyframes } from '_lco/utils'
import cssm from '_css/mapper'
import { toRaw } from '_css/value'
import { uid } from '_lib/utils'
import XKeyframes from '_components/utility/XKeyframes'


/**
    Applies a static or animated "skeletal" state to descendant elements.

    Only affects descendants with a `data-x-[dataAttr]` attribute.
*/
export default
{
    name: 'XSkeleton',

    mixins: [ styler ],
    
    components: { XKeyframes },
    
    props:
    {
        /**
            Linear gradient direction for zombie mode (scale angle).
        */
        degrees: { type: [ String, Number ], default: 90 },
        /**
            Foreground and background colors (valid color names only).
            
            This takes the form `foreground:background`.        
        */
        colors: { type: String, default: 'white_d.15:white_d.05' },
        /**
            Data property name identifying elements to skeletize.
        */
        dataAttr: { type: String, default: 'bone' },
        /**
            CSS animation-duration value (for zombified skeleton).

            Unitless numbers are treated as scale time.
        */
        duration: { type: [ String, Number ], default: 1.2 },
        /**
            Cover marked descendants?
        */
        skeletize: Boolean,
        /**
            Animate marked descendants when skeletized?
        */
        zombify: Boolean
    },
    
    computed:
    {
        colorData() { return cssm.colors(this.colors); },
        
        keyname() { return 'skeleton_' + uid('zombie', this._uid); },
      
        skeleton()
        {
            let { colorData, dataAttr, statics: { cover, skeleton } } = this;
            
            let ruleset =
            {
                [`& [data-x-${dataAttr}]`]: skeleton.base,
                [`& [data-x-${dataAttr}~=inline]`]: skeleton.inline,
                [`& [data-x-${dataAttr}~=radius]`]: skeleton.radius,
                [`& [data-x-${dataAttr}]::before`]: { ...cover, background: colorData.backgroundColor }
            };
            
            return ruleset;
        }, 
        
        zombie()
        {
            let { colorData, dataAttr, keyname, statics: { cover } } = this;
            
            let time = toRaw.time.str(this.duration);
            let degs = toRaw.angle.str(this.degrees);
            
            let ruleset =
            {
                ...this.skeleton,

                [`& [data-x-${dataAttr}]::after`]:
                {
                    ...cover,
                    animation: `${keyframes(keyname)} ${time} cubic-bezier(0.4, 0.0, 0.2, 1) infinite`,
                    background: `linear-gradient(${degs}, transparent 30%, ${colorData.color}, transparent 70%)`,
                    backgroundSize: '200% 200%'
                }
            };
            
            return ruleset;
        },
        
        // Dynamic CSS
      
        skeletonCss() { return this.skeletize && (this.zombify ? this.zombie : this.skeleton); },
    },

    stylesheet()
    {
        let cover =
        {
            borderRadius: 'inherit', 
            content: '""',
            position: 'absolute', 
            top: 0, 
            right: 0, 
            bottom: 0, 
            left: 0, 
            zIndex: 1 
        };
        
        let skeleton =
        {
            base:
            {
                background: 'transparent !important',
                borderColor: 'transparent !important',
                color: 'transparent !important',
                pointerEvents: 'none !important',
                position: 'relative !important',

                '> *': { opacity: '0 !important' }
            },

            inline: { display: 'inline-block !important' },
            
            radius: { borderRadius: '2px !important' }
        };
        
        return { cover, skeleton };
    }
}
</script>
