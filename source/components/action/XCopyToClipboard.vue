<template>
  <x-text 
    v-bind="$attrs" 
    :el="canCopy ? 'button' : 'span'" 
    :cursor="canCopy ? 'pointer' : null" 
    @click="copy"
  >
    <!-- @slot display content -->
    <slot :copied="copied" />
    <x-icon v-if="canCopy" name="copy" align-v="middle" />
  </x-text>
</template>


<script>
import XIcon from '_components/assets/XIcon'
import XText from '_components/typography/XText'
import { clipboard } from '_lib/browser-info'


/**
    Copies specified data to clipboard when clicked.
    
    Unused attributes are passed to __XText__.
*/
export default
{
    name: 'XCopyToClipboard',
    
    components: { XIcon, XText },
    
    props:
    {
        /**
            The data to be copied to the clipboard.
        */
        data: null,
        /**
            Timeout after successful clipboard update (milliseconds).
        */
        timeo: { type: Number, default: 2000 }
    },
    
    data: () => ({ canCopy: false, copied: false }),
    
    mounted()
    {
        // determine if browser clipboard access is available
        clipboard.check().then(value => this.canCopy = value);
    },
    
    methods:
    {
        copy()
        {
            if (this.canCopy && !this.copied)
            {
                clipboard.copyTo(this.data).then(() => 
                {
                    this.copied = true;
                    setTimeout(() => this.copied = false, this.timeo);
                });
            }
        }
    }
}
</script>
