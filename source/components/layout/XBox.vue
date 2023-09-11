<template>
  <component :is="el" v-bind="$attrs" :id="$htmlId" :class="cn(aliases)" :data-inactive="inactive" v-on="$hearers">
    <!-- @slot box child content -->
    <slot />
  </component>
</template>


<script>
import { box, css, styler } from '_source/mixins'


/**
    Base layout component.
*/
export default
{
    name: 'XBox',
    
    mixins: [ styler, box, css.display ]
}
</script>
