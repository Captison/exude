<template>
  <x-box 
    el="img" 
    v-bind="$attrs" 
    :class="cn('object')" 
    :src="image" 
    v-on="$hearers" 
    @load="handleLoad" 
    @error="handleError" 
  />
</template>


<script>
import { object, styler } from '_source/mixins'
import XBox from '_components/layout/XBox'


let reProto = /^(https?)|(ipfs)|(data):/i;
let reIpfs = /^(ipfs:(\/)+)+(ipfs\/)?/;
/**
    Renders an HTML `<img>` tag.
    
    Unused attributes are passed on to __XBox__.
*/
export default
{
    name: 'XImage',
    
    mixins: [ styler, object ],
    
    components: { XBox },
    
    props:
    {
        /**
            Image source string.
            
            Array values are concatenated as strings.
            
            Assumed to be base64 encoded if no protocol is detected.
        */
        src: [ String, Array ],
        /**
            Media type for `src` image ('image/png', 'image/jpeg', etc).
            
            Ignored unless `src` is assumed to be base64 encoded.
        */
        mediaType: String
    },
    
    emits:
    {      
        /**
            On native image `error` event.
            
            @param { EventObject } event
              Native event object.
        */
        error(event) { return event !== null; },
        /**
            On image load fail status change.
            
            @param { boolean } value
              Is image currently loading?
        */
        failing(value) { return typeof value === 'boolean'; },
        /**
            On native image `load` event.
            
            @param { EventObject } event
              Native event object.
        */
        load(event) { return event !== null; },
        /**
            On image loading.
            
            @param { boolean } value
              Is image currently loading?
        */
        loading(value) { return typeof value === 'boolean'; }
    },
    
    data: () => ({ failing: false, loading: false }),
    
    computed:
    {
        image()
        {
            let { src, mediaType } = this;
            
            if (Array.isArray(src)) src = src.join('');
            
            if (!reProto.test(src) && mediaType) return `data:${mediaType};base64,${src}`;
            // allow for IPFS image content
            if (reIpfs.test(src)) return src.replace(reIpfs, 'https://ipfs.io/ipfs/');
            
            return src;
        }
    },
    
    watch:
    {
        failing() { this.$emit('failing', this.failing); },
        
        loading() { this.$emit('loading', this.loading); },
        
        src: 
        { 
            handler() { this.failing = false; this.loading = true; },
            immediate: true 
        },
    },
    
    methods:
    {
        handleError(event)
        {
            this.loading = false;
            this.failing = true;
            // propagate the event
            this.$emit('error', event);
        },
        
        handleLoad(event)
        {
            this.loading = false;
            // propagate the event
            this.$emit('load', event);
        }
    }
}
</script>
