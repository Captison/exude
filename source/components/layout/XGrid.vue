<template>
  <component :is="el" v-bind="$attrs" :id="$htmlId" :class="cn(aliases)" :data-inactive="inactive" v-on="$hearers">
    <!-- @slot grid child content -->
    <slot />
  </component>
</template>


<script>
import { box, css, styler } from '_source/mixins'


/**
    CSS grid/inline-grid layout box.
*/
export default
{
    name: 'XGrid',

    mixins: [ styler, box, css.grid, css.layoutSystem ],
    
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
        displayCss() { return { display: this.inline ? 'inline-grid' : 'grid' }; }
    }
}
</script>
