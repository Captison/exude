<template>
  <x-link v-if="canCopy" v-bind="$attrs" @click="copy">
    <x-icon :name="icon" :size="size" />
  </x-link>
</template>


<script>
import XIcon from '_components/assets/XIcon'
import XLink from '_components/action/XLink'
import { toRaw } from '_css/value'
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
            Names of icons to use (`copy:done`).
        */
        icons: { type: String, default: 'copy:done' },
        /**
            The data to be copied to the clipboard.
        */
        data: null,
        /**
            Clipboard icon size.
        */
        size: [ String, Number ],
        /**
            Length of time to show copied status (in scale time).
            @ignore
        */
        duration: { type: [ String, Number ], default: 2 }
    },
    
    emits:
    {
        /**
            On copy to clipboard action.
            
            Event fires a second time with `false` after `duration` has passed.
            
            @param { boolean } value
              True on copy success.
        */
        copied(value) { return typeof value === 'boolean'; }
    },
    
    data: () => ({ canCopy: false, copied: false }),
    
    mounted()
    {
        // determine if browser clipboard access is available
        clipboard.check().then(value => this.canCopy = value);
    },
    
    computed:
    {
        icon() { return this.names[this.copied ? 1 : 0]; },

        names() { let [ copy, done = copy ] = this.icons.split(/:/); return [ copy, done ]; }      
    },
    
    watch:
    {
        copied() 
        {
            if (this.copied)
            {
                clearTimeout(this.tid);
                this.tid = setTimeout(() => this.copied = false, toRaw.time(this.duration));
            }

            this.$emit('copied', this.copied);
        }
    },
    
    methods:
    {
        copy() { this.canCopy && clipboard.copyTo(this.data).then(() => this.copied = true); },        
    }
}
</script>
