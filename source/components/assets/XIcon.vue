<template>
  <svg :class="cn('base size color margin valign')" viewBox="0 0 24 24" role="img" v-html="content" />
</template>


<script>
import v from '_styles/vars'
import { styler, margin } from '_source/mixins'
import { color, svgIcon, toPixels } from '_styles/loaders'


/**
    Renders an SVG icon.
*/
export default
{
    name: 'XIcon',

    mixins: [ styler, margin ],

    props:
    {
        /**
            CSS vertical-align value.
        */
        alignV: { type: String, default: null },
        /**
            Stroke and fill colors (valid color names only).
            
            This takes the form `fill:stroke`.            
        */
        colors: { type: String, default: null },
        /**
            Name of icon to display.
        */
        name: { type: String, required: true },
        /**
            Icon size.
        */
        size: { type: [ String, Number ], default: () => v.icon.defaultSize },
        /**
            Label for icon.
        */
        title: { type: String, default: null }
    },
    
    data: () => ({ content: '' }),
        
    computed:
    {
        colorCss()
        {
            let colors = {};
            let [ fill, stroke ] = (this.colors || '').split(/:/);
            
            if (fill) colors.fill = color(fill);
            if (stroke) colors.stroke = color(stroke);
            
            return  colors;            
        },
        
        sizeCss()
        {          
            let size = toPixels.str(this.size || '24px');            
            return { height: size, width: size };
        },
        
        valignCss() { return this.alignV && { verticalAlign: this.alignV }; }
    },
    
    // mounted()
    // {
    //     console.log(global.getComputedStyle(this.$el).getPropertyValue('line-height'));        
    // },
    
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
