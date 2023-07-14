<template>
  <x-box el="img" v-bind="$attrs" :src="image" v-on="$hearers" />
</template>


<script>
import XBox from '_components/layout/XBox'


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
        */
        src: [ String, Array ],
        /**
            Set the `src` type ('png', 'jpeg', etc).
            
            When set, image is assumed to be base64 data.
            
            Leave unset when `src` is a URL.
        */
        type: String
    },    
    
    computed:
    {
        image()
        {
            let { src, type } = this;
            
            if (Array.isArray(src)) src = src.join('');
            
            if (type) return `data:image/${type};base64,${src}`;
            // allow for IPFS image content
            if (reIpfs.test(src)) return src.replace(reIpfs, 'https://ipfs.io/ipfs/');
            
            return src;
        }
    }
}
</script>
