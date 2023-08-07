<template>
  <svg :class="cn(aliases)" :viewBox="toPixels.spaced(viewBox)" role="img" v-html="content" />
</template>


<script>
import v from '_styles/vars'
import { styler, margin, subCss } from '_source/mixins'
import { paints, svgIcon, toPixels } from '_styles/loaders'


let aliases = 
[ 
    'base', 
    'size', 
    'colors', 
    'margin', 
    'maxSize', 
    'minSize', 
    'valign', 
    'strokeWidth'
].join(' ');

/**
    Renders an SVG icon.
*/
export default
{
    name: 'XIcon',

    mixins: 
    [ 
        styler, 
        margin, 
        subCss('colors', String, paints),
    ],

    props:
    {
        /**
            CSS vertical-align value.
        */
        alignV: String,
        /**
            Stroke and fill colors (valid color names only).
            
            This takes the form `fill:stroke`.            
        */
        colors: String,
        /**
            Maximum Icon size.
        */
        maxSize: [ String, Number ],
        /**
            Maximum Icon size.
        */
        minSize: [ String, Number ],
        /**
            Name of icon to display.
        */
        name: { type: String, required: true },
        /**
            Icon size.
        */
        size: { type: [ String, Number ], default: () => v.icon.defaultSize },
        /**
            Width of image stroke (scale units).
        */
        strokeWidth: [ String, Number ],
        /**
            Label for icon.
        */
        title: String,
        /**
            SVG viewBox value (scale units).
        */
        viewBox: { type: String, default: '0 0 6 6' }
    },
    
    data: () => ({ aliases, content: '', toPixels }),
        
    computed:
    {
        maxSizeCss() { return this.resolveSize(this.maxSize, 'max'); },
        
        minSizeCss() { return this.resolveSize(this.minSize, 'min'); },
        
        sizeCss() { return this.resolveSize(this.size); },
        
        strokeWidthCss() { return this.strokeWidth && { strokeWidth: this.strokeWidth }; },
        
        valignCss() { return this.alignV && { verticalAlign: this.alignV }; }
    },
    
    watch:
    {
        name:
        {
            immediate: true,
            
            handler()
            {
                let promise = svgIcon(this.name);
                
                promise.then(content => 
                {
                    if (!content) content = '';
                    // svg title text for accessibility
                    if (this.title) content += `<title>${this.title}</title>`;
                    
                    this.content = content;                    
                });
                
                promise.catch(() => this.content = '');
            }
        }
    },
    
    methods:
    {
        resolveSize(size, prefix)
        {
            let hprop = prefix ? prefix + 'Height' : 'height';
            let wprop = prefix ? prefix + 'Width' : 'width';
                        
            let value = toPixels.str(size);            
            
            return { [hprop]: value, [wprop]: value };
        }      
    },

    stylesheet()
    {
        let base =
        {
            boxSizing: 'border-box',
            fontSize: 0
        }

        return { base };
    }
}
</script>
