<template>
  <w-flex v-bind="$attrs" inline :aligns="aligns" :space="space" v-on="$hearers">
    <!-- @slot ingot content (overrides `label` prop) -->
    <slot><span>{{ label }}</span></slot>
  </w-flex>
</template>


<script>
import XFlex from '_components/layout/XFlex'


/**
    Simple base component for "label" or "badge" assets.

    Unused attributes are passed on to __XFlex__.    
*/
export default
{
    name: 'XIngot',

    components: { XFlex },

    props:
    {
        /**
            Content alignment.            
            @see `XFlex.aligns` for details.
        */
        aligns: { type: String, default: ':center:center' },
        /**
            Ingot label.
        */
        label: String,
        /**
            CSS white-space value.
            @see `XBox.space` for details.
        */
        space: { type: String, default: 'nowrap' }
    }
}
</script>
