<template>
  <x-box v-bind="$attrs" el="fieldset" :disabled="disabled">
    <!-- 
        @slot fieldset content 
        
        @binding { object } values
          Values for this fieldset.
    -->
    <slot v-bind="myValue" />
  </x-box>
</template>


<script>
import { context, formField } from '_source/mixins'
import { uid } from '_lib/utils'
import XBox from '_components/layout/XBox'


/**
    Object input control derived from descendant form controls.

    Features:
    - submits object data to ancestor __XForm__.
    - disable all descendant form controls and buttons at once

    Unused attributes are passed to __XBox__.
*/
export default
{
    name: 'XFieldset',

    mixins: [ context('form').provider, formField ],
    
    components: { XBox },

    props:
    {
        /**
            Fieldset value.
        */
        value: Object
    },
    
    data: () => ({ valid: true, fields: {} }),

    computed:
    {
        isInvalid() { return this.invalid || !this.valid; }     
    },
    
    methods:
    {
        provideFormContext()
        {
            let status = {}, { fields } = this;
            
            Object.defineProperty(status, 'disabled', { get: () => this.isDisabled, enumerated: true });
            Object.defineProperty(status, 'valid', { get: () => !this.isInvalid, enumerated: true });
            Object.defineProperty(status, 'submitDisabled', 
                { get: () => this.formLink.status.submitDisabled, enumerated: true });
                            
            let field = (name, data) =>
            {
                name = name || uid.next();                

                let link =
                {
                    status,
                    update: () => this.valid = !Object.keys(fields).find(name => fields[name].invalid),
                    change: value => this.emitUpdate({ ...this.myValue, [name]: value }),
                    remove: () => { delete fields[name]; link.update(); },
                    value: () => (this.myValue || [])[name]
                };

                fields[name] = data;

                return link;
            }

            return { ...this.form, field };
        }
    }
}
</script>
