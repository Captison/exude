<template>
  <x-text v-bind="$attrs" :inactive="isDisabled" v-on="$hearers" @focusin="focus = true" @focusout="focus = false">
    <!--
        @slot form field content.
        
        @binding { boolean } disabled
          Is this field inaccessible?
        @binding { boolean } required
          Is this field required?
        @binding { boolean } invalid
          Does this field contain an invalid value?
        @binding { boolean } in-focus
          Does this field currently have focus?
    -->
    <slot :disabled="isDisabled" :required="isRequired" :invalid="isInvalid" :in-focus="isInFocus" />
  </x-text>
</template>


<script>
import { context } from '_source/mixins'
import XText from '_components/typography/XText'


/**
    Wrapper for form field elements.

    Unused attributes are passed to __XText__.
*/
export default
{
    name: 'XField',
  
    mixins: [ context('form').provider ],
    
    components: { XText },

    data: () => ({ focus: false, hosted: {} }),

    computed:
    {
        isDisabled() { return this.hosted.disabled; },

        isInFocus() { return this.focus && !this.isDisabled; },

        isInvalid() { return this.hosted.invalid; },

        isRequired() { return this.hosted.required; },
        
        myId() { return this.hosted.id; }
    },

    methods:
    {
        provideFormContext()
        {
            let field = (name, data) =>
            {
                this.hosted = data;

                if (this.form)
                {
                    let formLink = this.form.field(name, data);
                    
                    let link = 
                    {
                        ...formLink,
                        remove: () => { this.hosted = {}; formLink.remove(); }
                    };
                    
                    return link;
                }
                
                return { remove: () => this.hosted = {} };
            }

            return { field };
        }
    }
}
</script>
