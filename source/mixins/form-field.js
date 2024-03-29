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
            Milliseconds to wait before sending `update:value` event.
            @ignore
        */
        debounce: { type: Number, default: -1 },
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
        name: [ String, Number ],
        /**
            Is this field required?
        */
        required: Boolean,
        /**
            Form field value.
        */
        value: null
    },

    emits:
    {
        /**
            On value change.
            
            Mote that this event does not fire if one of the following
            components is an ancestor.            
            - __XFieldset__
            - __XFieldList__
            
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
            // to update the form status
            update: () => {},
        };

        return { defaultFormLink, formLink: defaultFormLink };
    },
    
    mounted()
    {        
        let formUpdate = () => this.formLink.update()
        
        this.$watch('myValue', formUpdate);
        this.$watch('isInvalid', formUpdate);
        
        formUpdate();
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

        isDisabled() { return this.disabled || this.formLink.status.disabled; },

        isInvalid() { return this.invalid; },
        
        isTrue() { return this.myValue === true; },
        
        myId() { return this.$attrs.id || this.$htmlId; },

        myName() { return this.name; },

        myValue() { return this.formLink.change ? this.formLink.value() : this.value; },
        
        // Dynamic CSS
        
        hideInputCss() { return { height: 0, opacity: 0, position: 'absolute', width: 0 }; }        
    },

    watch:
    {
        debounce:
        {
            handler()
            {
                let emitUpdate = value => 
                {
                    if (this.formLink.change)
                        this.formLink.change(value);

                    this.$emit('update:value', value);                 
                }
              
                this.emitUpdate = debounce(emitUpdate, this.debounce);
            },
            immediate: true
        },
      
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
        
        handleInput(evt)
        {
            if (!this.isDisabled)
            {
                let value = this.inputValue(evt.target.value);

                this.$emit('input', evt);
                this.emitUpdate(value);                  
            }
        },
        
        /**
            Override this method to manage value sent via `update:value` event.
        */
        inputValue(value) { return value; }
    }
}
