<template>
  <div v-frag>
    <e-animation v-for="(spec, idx) in animationSpecs" v-bind="{ ...spec, ...$attrs }" :key="idx" />
    <e-background v-for="(spec, idx) in backgroundSpecs" v-bind="{ ...spec, ...$attrs }" :key="idx" />
    <e-stylesheet v-for="(spec, idx) in stylesheetSpecs" v-bind="{ ...spec, ...$attrs }" :key="idx" />
    <e-transition v-for="(spec, idx) in transitionSpecs" v-bind="{ ...spec, ...$attrs }" :key="idx" />
  </div>
</template>


<script>
import { enumer } from '_lco/utils'
import { frag } from '_source/directives'
import EAnimation from '_components/extension/EAnimation'
import EBackground from '_components/extension/EBackground'
import EStylesheet from '_components/extension/EStylesheet'
import ETransition from '_components/extension/ETransition'


/**
    Generates extension components from enumerated LCO  configurations.
    
    Unused attributes are passed to every extension component generated.
*/
export default
{
    name: 'EExtension',
    
    components: { EAnimation, EBackground, EStylesheet, ETransition },
    
    directives: { frag },
    
    props:
    {
        /**
            Comma-separated CSS animation enumeration(s) from the LCO.
        */
        animation: String,
        /**
            Comma-separated CSS background enumeration(s) from the LCO.
        */
        background: String,
        /**
            Comma-separated CSS stylesheet enumeration(s) from the LCO.
        */
        stylesheet: String,
        /**
            Comma-separated CSS transition enumeration(s) from the LCO.
        */
        transition: String
    },
    
    computed:
    {
        animationSpecs() { return enumer(this.animation, 'animation'); },
        
        backgroundSpecs() { return enumer(this.background, 'background'); },
                
        stylesheetSpecs() { return enumer(this.stylesheet, 'stylesheet'); },
        
        transitionSpecs() { return enumer(this.transition, 'transition'); }
    }
}
</script>
