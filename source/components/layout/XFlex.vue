<template>
  <component :is="el" v-bind="$attrs" :id="$htmlId" :class="cn(aliases)" :data-inactive="inactive" v-on="$hearers">
    <!-- @slot flex child content -->
    <slot />
  </component>
</template>


<script>
import { box, css, styler } from '_source/mixins'


/**
    CSS flex/inline-flex layout box.
*/
export default
{
    name: 'XFlex',

    mixins: [ styler, box, css.flex, css.layoutSystem ],
    
    aliases: [ 'display' ],
    
    props:
    {
        /**
            Display as inline element?
        */
        inline: Boolean
    },
    
    computed:
    {
        displayCss() { return { display: this.inline ? 'inline-flex' : 'flex' }; }      
    }
}
</script>
