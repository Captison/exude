<template>
  <x-box :el="el" v-bind="embedProps" :class="cn('object')" v-on="$hearers" @load="heLoad" @error="heError">
    <!-- @slot default object content -->
    <slot v-if="el !== 'img'" />
  </x-box>
</template>


<script>
import { css, styler } from '_source/mixins'
import { urlReloader } from '_lib/utils'
import XBox from '_components/layout/XBox'


let reProto = /^[a-z0-9]+:\/\//i;
/**
    Renders an HTML replaced element.
    
    Unused attributes are passed on to __XBox__.
*/
export default
{
    name: 'XEmbed',
    
    mixins: [ styler, css.object ],
    
    components: { XBox },
    
    props:
    {
        /**
            HTML Replaced element.
            
            @values audio, img, object, video
        */
        el: { type: String, default: 'img' },
        /**
            Data source URL.
        */
        src: String
    },
    
    emits:
    {      
        /**
            On native data `error` event.
            
            @param { EventObject } event
              Native event object.
        */
        error(event) { return event !== null; },
        /**
            On data load fail status change.
            
            @param { boolean } value
              Is data currently loading?
        */
        failing(value) { return typeof value === 'boolean'; },
        /**
            On native data `load` event.
            
            @param { EventObject } event
              Native event object.
        */
        load(event) { return event !== null; },
        /**
            On data loading.
            
            @param { boolean } value
              Is data currently loading?
        */
        loading(value) { return typeof value === 'boolean'; }
    },
    
    data: () => ({  extSrc: null, failing: false, loading: false }),
    
    computed:
    {
        embedProps()
        {
            let { el, source } = this;
          
            let props = 
            {
                ...this.$attrs,
                ...source
            };
            
            return props;
        },
        
        source()
        {
            let src = this.extSrc || this.src;
          
            switch (this.el)
            {
                case 'audio': 
                case 'img': 
                case 'video': 
                    return { src };
                case 'object': 
                    return { data: src };
            }
        }
    },
    
    watch:
    {
        failing() { this.$emit('failing', this.failing); },
        
        loading() { this.$emit('loading', this.loading); },        

        src: 
        { 
            handler() { this.extSrc = null, this.failing = false; this.loading = true; },
            immediate: true 
        }
    },
    
    methods:
    {
        heError(event)
        {
            this.loading = false;
            this.failing = true;
            // propagate the event
            this.$emit('error', event);
        },
        
        heLoad(event)
        {
            this.loading = false;
            // propagate the event
            this.$emit('load', event);
        },
        
        /**
            Reload the source data.
        
            @public
        */
        reload()
        {
            if (reProto.test(this.src))
            {
                this.failing = false; 
                this.loading = true;
                this.extSrc = urlReloader(this.src);                
            }
        }
    }
}
</script>
