<template>
  <x-text 
    v-bind="$attrs" 
    :el="href ? 'a' : 'button'" 
    :colors="colors" 
    :hf-colors="hfColors" 
    :cursor="cursor" 
    :href="href"
    v-on="$hearers"
  >
    <!-- @slot link content -->
    <slot />
  </x-text>
</template>


<script>
import { styler } from '_source/mixins'
import XText from '_components/typography/XText'


/**
    Renders a clickable link.
    
    Unused attributes are passed on to __XText__.
*/
export default
{
    name: 'XLink',

    mixins: [ styler ],
    
    components: { XText },
    
    props:
    {
        /**
            Foreground and background colors (valid color names only).
            
            This takes the form `foreground:background`.            
        */
        colors: { type: String, default: 'link' },
        /**
            CSS cursor value.
        */
        cursor: { type: String, default: 'pointer' },
        /**
            Foreground and background hover and focus colors (valid color names only).
            
            This takes the form `foreground:background`.            
        */
        hfColors: { type: String, default: 'linkHover' },
        /**
            HTML `href` value.
            
            If not provided, `<button>` is rendered instead of `<a>`.
        */
        href: { type: String, default: null }
    }    
}
</script>
