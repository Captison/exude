<template>
  <x-box el="img" v-bind="$attrs" :src="image" v-on="$hearers" />
</template>


<script>
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
    }
}
</script>
