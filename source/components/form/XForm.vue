<template>
  <x-box v-bind="$attrs" el="form" @submit.prevent>
    <!-- 
        @slor form content 
        
        @binding { boolean } valid
          Is the form currently valid?
    -->
    <slot :valid="valid" />
  </x-box>
</template>


<script>
import { context } from '_source/mixins'
import { uid } from '_lib/utils'
import XBox from '_components/layout/XBox'


/**
    A container to help data entry controls and buttons work together.

    Features:
    - disable all descendant form controls and buttons at once
    - disables submit actions automatically when invalid

    Unused attributes are passed to __XBox__.
*/
export default
{
    name: 'XForm',

    mixins: [ context('form').provider ],
    
    components: { XBox },

    props:
    {
        /**
            Make this form inaccessible?

            Disables all fields and buttons in the form.
        */
        disabled: Boolean,
        /**
            Disable form action buttons?

            Disables all buttons marked as `submit` in the form.
        */
        submitDisabled: Boolean
    },
    
    emits:
    {
        /**
            On form action.

            Clicking a descendant `XButton` component not marked as a submit triggers this event.

            @param { string } name
              Name of the control or button used to initiate action (if any).
            @param { object } fields
              All field data indexed by field name.
        */
        action(name, fields) { return typeof name === 'string' && typeof fields === 'object'; },
        /**
            On form submit.

            Clicking a descendant `XButton` component marked as a submit triggers this event.

            @param { string } name
              Name of the control or button used to submit (if any).
            @param { object } fields
              All field data indexed by field name.
        */
        submit(name, fields) { return typeof name === 'string' && typeof fields === 'object'; },
        /**
            On change of validation state.

            Triggered by `invalid` props on descendant form entry controls.

            - emits `true` when all descendant controls are not `invalid`
            - emits `false` when at least one descendant control is `invalid`

            @param { boolean } valid
              Is the form currently valid?
        */
        valid(valid) { return typeof valid === 'boolean'; }
    },

    data: () => ({ valid: true }),

    watch:
    {
        valid() { this.$emit('valid', this.valid); }
    },

    methods:
    {
        provideFormContext()
        {
            let status = {}, fields = {};
            
            Object.defineProperty(status, 'disabled', { get: () => this.disabled, enumerated: true });
            Object.defineProperty(status, 'valid', { get: () => this.valid, enumerated: true });
            Object.defineProperty(status, 'submitDisabled', { get: () => this.submitDisabled, enumerated: true });
            
            let action =
            {
                status,
                action: name => this.$emit('action', name, { ...fields }),
                submit: name => this.valid && this.$emit('submit', name, { ...fields })
            };
          
            let field = (name, data) =>
            {
                name = name || uid.next();

                let link =
                {
                    status,
                    remove: () => { delete fields[name]; link.update(); },
                    update: () => this.valid = !Object.keys(fields).find(name => fields[name].invalid)
                };

                fields[name] = data;

                return link;
            }

            return { action, field };
        }
    }
}
</script>
