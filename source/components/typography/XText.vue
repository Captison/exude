<template>
  <component :is="el" v-bind="$attrs" :id="$htmlId" :class="cn(aliases)" :data-inactive="inactive" v-on="$hearers">
    <!-- @slot text child content -->
    <slot />
  </component>
</template>


<script>
import { box, css, styler } from '_source/mixins'


/**
    Renders content in the proper text styles.
*/
export default
{
    name: 'XText',

    mixins: [ styler, box, css.text ],
    
    aliases: [ 'display' ],

    props:
    {
        /**
            Display as block element?
        */
        block: Boolean      
    },
    
    computed:
    {
        displayCss() { return { display: this.block ? 'block' : 'inline' }; }
    }    
}
</script>
