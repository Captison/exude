<template>
  <x-box v-bind="$attrs" :colors="clr.bg" overflow="hidden">
    <x-box pos="relative" :height="height">
      <template v-if="continuous">
        <div :class="cn('fill one')" />
        <x-keyframes name="foreverOne">
          <frame at="0%" left="0%" right="100%" />
          <frame at="40%" left="30%" right="35%" />
          <frame at="65%" left="65%" right="0%" />
          <frame at="90%" left="100%" right="0%" />
        </x-keyframes>
        <div :class="cn('fill two')" />
        <x-keyframes name="foreverTwo">
          <frame at="0%" left="0%" right="100%" />
          <frame at="20%" left="10%" right="10%" />
          <frame at="50%" left="100%" right="0%" />
        </x-keyframes>
      </template>
      <template v-else>
        <div :class="cn('fill limited')" />
      </template>
    </x-box>
  </x-box>
</template>


<script>
import { styler } from '_source/mixins'
import { color, keyframes } from '_styles/loaders'
import XBox from '_components/layout/XBox'
import XKeyframes from '_components/utility/XKeyframes'


/**
    Linear progress indication.
    
    Unused attributes are passed to __XBox__.
*/
export default
{
    name: 'XProgressBar',

    mixins: [ styler ],

    components: { XBox, XKeyframes },

    props:
    {
        /**
            Foreground and background colors.
            @see `XBox.colors` for details.
        */
        colors: String,
        /**
            Animate progress forever.
        */
        continuous: Boolean,
        /**
            Progress bar height value.
            @see `XBox.height` for details.
        */
        height: { type: [ String, Number ], default: 1 },
        /**
            Current progress value between `0` and `1`.
        */
        progress: { type: Number, default: 1 }
    },

    computed:
    {
        clr() 
        {
            let [ fg, bg ] = (this.colors || '').split(/:/);
            
            // fg = fg ? ':' + fg : null;
            bg = bg ? ':' + bg : null;
            
            return { fg, bg };
        },
        
        // Dynamic CSS
      
        fillCss() 
        {
            let css = 
            { 
                backgroundColor: color(this.clr.fg || 'current'),
                height: '100%'
            };
            
            return css;
        },
                
        limitedCss()
        {
            let percent = this.progress < 0 ? 0 : this.progress > 1 ? 1 : this.progress; 
            return { width: percent * 100 + '%' };
        },
        
        oneCss()
        {
            let css =
            {
                animationDuration: '2.4s',
                animationName: keyframes('foreverOne'),
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                position: 'absolute',
            };
          
            return css;
        },
        
        twoCss()
        {
            let css =
            {
                animationDelay: '1.8s',
                animationDuration: '2.4s',
                animationName: keyframes('foreverTwo'),
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease',
                position: 'absolute',
            };
          
            return css;
        }
    }
}
</script>
