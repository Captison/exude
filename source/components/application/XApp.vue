<template>
  <x-text :id="$htmlId" block v-bind="$attrs" v-on="$hearers">
    <!-- @slot application -->
    <slot>
      ✰ ✰ ✰ ✰ ✰
      <b :style="{ padding: '0 8px' }">
        Exude Application Goes Here
      </b>
      ✰ ✰ ✰ ✰ ✰
    </slot>
  </x-text>
</template>


<script>
import XText from '_components/typography/XText'


/**
    Root application component.
*/
export default
{
    name: 'XApp',
    
    components: { XText }
}
</script>
