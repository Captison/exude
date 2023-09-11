<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <svg :class="cn(aliased)" :viewBox="boxed" role="img" v-html="content" />
</template>


<script>
import v from '_styles/vars'
import { css, styler, subCss } from '_source/mixins'
import { paints, svgIcon, toPixels } from '_styles/loaders'


/**
    Renders an SVG icon.
*/
export default
{
    name: 'XIcon',

    mixins: [ styler, css.squareDims, css.margin, subCss('colors', String, paints) ],

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
    
    data: () => ({ content: '' }),
    
    created()
    {
        this.aliased = [ `base`, ...this.aliases, 'colors', 'valign', 'strokeWidth' ];
    },
        
    computed:
    {
        boxed() { return toPixels.spaced(this.viewBox); },
        
        // Dynamic CSS
      
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
