<template>
  <x-box el="img" v-bind="$attrs" v-on="$hearers" />
</template>


<script>
import XBox from '_components/layout/XBox'


/**
    Renders an HTML `<img>` tag.
    
    Unused attributes are passed on to __XBox__.
*/
export default
{
    name: 'XImage',
    
    components: { XBox }
}
</script>
