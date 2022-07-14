import context from './context'

/**
    Mixin to handle form "submission".
*/
export default
{
    mixins: [ context('form').consumer ],

    props:
    {
        /**
            Is the action control inaccessible?
        */
        disabled: Boolean,
        /**
            A name for this action control.
        */
        name: String,
        /**
            Is this a form submit control?
        */
        submit: Boolean
    },

    data()
    {
        let defaultFormLink =
        {
            // current parent form status
            status: { disabled: false, submitDisabled: false, valid: true },
            // execute action on the form
            action: () => void 0,
            // submit the form
            submit: () => void 0
        };

        return { defaultFormLink, formLink: defaultFormLink };
    },

    computed:
    {
        isDisabled() 
        {
            let { disabled, submitDisabled } = this.formLink.status;
            // component disabled, form disabled, or form submission disabled
            return this.disabled || disabled || (this.submit && submitDisabled); 
        }
    },

    methods:
    {
        changeFormContext()
        {
            if (this.form)
                this.formLink = { ...this.defaultFormLink, ...this.form.action };
            else
                this.formLink = this.defaultFormLink;
        },

        formAction() { this.formLink[this.submit ? 'submit' : 'action'](this.name); }
    }
}
