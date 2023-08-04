import context from './context'
import { debounce } from '_lib/utils'


/**
    Form field mixin.
*/
export default
{
    mixins: [ context('form').consumer ],

    props:
    {
        /**
            Is this field inaccessible?
        */
        disabled: Boolean,
        /**
            Does this field have an error?
        */
        invalid: Boolean,
        /**
            Form field name.
        */
        name: String,
        /**
            Is this field required?
        */
        required: Boolean,
        /**
            Form field value.
        */
        value: [ String, Number ]
    },

    emits:
    {
        /**
            On value change.
            
            @property { any } value
              Updated value.
        */
        // eslint-disable-next-line no-unused-vars
        'update:value'(value) { return true; }
    },
    
    data()
    {
        let defaultFormLink =
        {
            // current parent form status
            status: { disabled: false, submitDisabled: false, valid: true },
            // to remove this field from the form
            remove: () => {},
            // to update the form
            update: () => {}
        };

        return { defaultFormLink, formLink: defaultFormLink };
    },
    
    mounted()
    {
        // update form on changes
        let formMembers = ['isInvalid', 'myValue'];
        let formAction = () => this.formLink.update()
        formMembers.forEach(member => this.$watch(member, formAction));

        formAction();
    },

    computed:
    {
        fieldProps() 
        { 
            let props = 
            { 
                id: this.myId, 
                name: this.myName, 
                disabled: this.isDisabled, 
                // 'aria-describedby': this.myId
            }; 
            
            return props;
        },

        hideInputCss() { return { height: 0, opacity: 0, position: 'absolute', width: 0 }; },

        isDisabled() { return this.disabled || this.formLink.status.disabled; },

        isInvalid() { return this.invalid; },
        
        isTrue() { return this.myValue === true; },
        
        myId() { return this.$attrs.id || this.$htmlId; },

        myName() { return this.name; },

        myValue() { return this.value; },
    },

    watch:
    {
        myName() { this.resetFormContext(); },
    },

    methods:
    {
        changeFormContext()
        {
            if (this.form)
            {
                let fields =
                {
                    disabled: () => this.isDisabled,
                    id: () => this.myId,
                    invalid: () => this.isInvalid,
                    name: () => this.myName,
                    required: () => this.required,
                    value: () => this.myValue
                };

                let reducer = (o, k) => Object.defineProperty(o, k, { get: fields[k], enumerable: true })
                // live field info object
                let finfo = Object.keys(fields).reduce(reducer, {});
              
                this.formLink = { ...this.defaultFormLink, ...this.form.field(this.myName, finfo) };
                return this.formLink.remove;
            }
        },
        
        handleInput: debounce(function(evt)
        {
            if (!this.isDisabled)
            {
                this.$emit('input', evt);
                this.$emit('update:value', this.inputValue(evt.target.value));
            }
        }, 5),
        
        /**
            Override this method to manage value sent via `update:value` event.
        */
        inputValue(value) { return value; }
    }
}
