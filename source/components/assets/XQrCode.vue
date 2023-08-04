<template>
  <!-- eslint-disable-next-line vue/no-v-html vue/no-v-text-v-html-on-component -->
  <x-box v-bind="$attrs" v-html="svg" />
</template>


<script>
import QRCode from 'qrcode-svg-ts'
import { color, toPixels } from '_styles/loaders'
import XBox from '_components/layout/XBox'


/**
    Displays a canvas-based QR code.
    
    Unused attributes are passed to __XBox__.
*/
export default
{
    name: 'XQrCode',
    
    components: { XBox },
    
    props:
    {
        /**
            Foreground and background colors (valid color names only).
            
            This takes the form `foreground:background`.        
        */
        colors: String,
        /**
            QR code data.
        */
        content: String,
        /**
            SVG padding.
        */
        padding: { type: Number, default: 0 },
        /**
            QR code size (square).
        */
        size: { type: Number, default: 64 },
    },
    
    computed:
    {
        options()
        {
            let { colors, content, padding, size } = this;
            let pixels = toPixels(size);
            let [ fore, back ] = (colors || '').split(/:/)
          
            let options =
            {
                background: color(back),
                color: color(fore),
                container: 'svg-viewbox',
                content,
                ecl: 'M',
                height: pixels,
                join: true,
                padding,
                pretty: false,
                width: pixels,
                xmlDeclaration: false
            };
            
            return options;
        },
        
        svg() { return new QRCode(this.options).svg(); }
    }    
}
</script>
