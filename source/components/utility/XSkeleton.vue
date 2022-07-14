<template>
  <div :class="cn('skeleton')">
    <!-- @slot default content -->
    <slot />
  </div>
</template>


<script>
import { styler } from '_source/mixins'
import { colors, keyframes } from '_styles/loaders'


/**
    Applies a static or animated "skeletal" state to descendant elements.

    Only affects descendants with a `data-s-[dataAttr]` attribute.
*/
export default
{
    name: 'XSkeleton',

    mixins: [ styler ],
    
    props:
    {
        /**
            Foreground and background colors (valid color names only).
            
            This takes the form `foreground:background`.        
        */
        colors: { type: String, default: 'prime_l.8:white_d.05' },
        /**
            Data property name identifying elements to skeletize.
        */
        dataAttr: { type: String, default: 'bone' },
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
        colorData() { return colors(this.colors); },
      
        skeleton()
        {
            let { colorData, dataAttr, statics: { cover, skeleton } } = this;
            
            let ruleset =
            {
                [`& [data-s-${dataAttr}]`]: skeleton.base,
                [`& [data-s-${dataAttr}~=inline]`]: skeleton.inline,
                [`& [data-s-${dataAttr}~=radius]`]: skeleton.radius,
                [`& [data-s-${dataAttr}]::before`]: { ...cover, background: colorData.backgroundColor }
            };
            
            return ruleset;
        }, 
        
        zombie()
        {
            let { colorData, dataAttr, statics: { cover } } = this;
                        
            let ruleset =
            {
                ...this.skeleton,

                [`& [data-s-${dataAttr}]::after`]:
                {
                    ...cover,
                    animation: keyframes('skeletonLoader') + ' 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
                    background: `linear-gradient(90deg, transparent 30%, ${colorData.color}, transparent 70%)`,
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
