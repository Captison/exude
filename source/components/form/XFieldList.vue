<template>
  <div v-frag>
    <!-- 
        @slot default content
        
        Descendant form controls should use an existing index from `list` as 
        their `name` for proper integration with this list control.
        
        __XLister__ compatible.
        
        @binding { function } append
          Adds new value to end of list (`append(value)`).
        @binding { function } change
          Change an existing value in the list (`change(index, value)`).
        @binding { boolean } disabled
          Is this list currently disabled?
        @binding { array } list
          Current data in this list.
        @binding { function } remove
          Remove an existing value in the list (`remove(index)`).
    -->
    <slot :list="(myValue || [])" :append="append" :change="change" :remove="remove" :disabled="isDisabled" />
  </div>
</template>


<script>
import { context, formField } from '_source/mixins'
import { frag } from '_source/directives'


/**
    Array input control via repeatable content.

    Features:
    - submits array data to ancestor __XForm__.
    - disable all descendant form controls and buttons at once
*/
export default
{
    name: 'XFieldList',

    mixins: [ context('form').provider, context('lister').provider, formField ],
    
    directives: { frag },

    props:
    {
        /**
            Field list value(s).
        */
        value: Array
    },
    
    data() 
    {
        let append = (value) =>
        {
            if (this.isDisabled) return;
            
            let values = [ ...this.myValue, value ];
            this.emitUpdate(values);
        }
        
        let change = (index, value) =>
        {
            if (this.isDisabled) return;

            let values = [ ...this.myValue.slice(0, index), value, ...this.myValue.slice(index + 1) ];            
            this.emitUpdate(values);
        }      

        let remove = (index) =>
        {            
            if (this.isDisabled) return;

            let values = [ ...this.myValue.slice(0, index), ...this.myValue.slice(index + 1) ];            
            this.emitUpdate(values);
        }      

        return { append, change, fields: [], valid: true, remove };
    },
    
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
                            
            let field = (index, data) =>
            {
                let link =
                {
                    status,
                    update: () => this.valid = fields.find(field => field.invalid),
                    change: value => this.change(index, value),
                    remove: () => 
                    { 
                        this.fields.splice(index, 1); 
                        link.update(); 
                    },
                    value: () => (this.myValue || [])[index]
                };
                                
                fields[index] = data;

                return link;
            }

            return { ...this.form, field };
        },
        
        provideListerContext() { return () => this.myValue }
    }    
}
</script>
