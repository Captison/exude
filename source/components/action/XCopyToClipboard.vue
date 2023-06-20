<template>
  <x-link v-if="canCopy" v-bind="$attrs" @click="copy">
    <x-icon name="copy" :size="size" />
  </x-link>
</template>


<script>
import XIcon from '_components/assets/XIcon'
import XLink from '_components/action/XLink'
import { clipboard } from '_lib/browser-info'


/**
    Copies specified data to clipboard when clicked.
    
    Nothing is rendered if browser does not support clipboard access.
    
    Unused attributes are passed to __XText__.
*/
export default
{
    name: 'XCopyToClipboard',
    
    components: { XIcon, XLink },
    
    props:
    {
        /**
            The data to be copied to the clipboard.
        */
        data: null,
        /**
            Clipboard icon size.
        */
        size: [ String, Number ]
    },
    
    emits:
    {
        /**
            On successful copy to clipboard action.
        */
        copied() { /* do nothing */ }
    },
    
    data: () => ({ canCopy: false }),
    
    mounted()
    {
        // determine if browser clipboard access is available
        clipboard.check().then(value => this.canCopy = value);
    },
    
    methods:
    {
        copy() { this.canCopy && clipboard.copyTo(this.data).then(() => this.$emit('copied')); }
    }
}
</script>
