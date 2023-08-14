<template>
  <x-flex v-bind="$attrs">
    <!-- 
        @slot default content                
        
        @binding { function } append
          Adds new value to end of list (`append(value)`).
          Pass `[]` or `{}` to add a new array or object.
        @binding { function } change
          Change an existing value in the list (`change(index, value)`).
        @binding { number } level
          Current field list nesting level.
    -->
    <slot :append="append" :change="change" :level="level" />
    <template v-if="myValue.length">
      <div v-for="(val, idx, slot = slotType(val)) in myValue" :key="idx" :style="{ display: 'contents' }">
        <template v-if="slot == 'single'">
          <!-- 
              @slot single value repeateable content
              
              No more than one form element should be rendered for this slot,
              and that element should use `index` as its 'name' and `vallue` for
              its data.
              
              @binding { number } index
                Index of the content in this field list.
              @binding { number } value
                Value for the content in this field list.
              @binding { function } remove
                A function to remove this item.
              @binding { number } level
                Current field list nesting level.
          -->
          <slot 
            name="single" 
            :index="idx" 
            :value="val" 
            :remove="() => remove(idx)" 
            :level="level" 
            :disabled="isDisabled"
          />
        </template>
        <x-fieldset v-if="slot == 'object'" #default="values" :name="idx" :value="val" :disabled="isDisabled">
          <!-- 
              @slot object value repeatable content
              
              This slot is wrapped by __XFieldset__ container to allow for form
              control value capture into an object.
              
              @binding { function } remove
                A function to remove this item.
              @binding { number } level
                Current field list nesting level.
          -->
          <slot name="object" v-bind="values" :remove="() => remove(idx)" :level="level" />
        </x-fieldset>
        <x-field-list v-if="slot == 'array'" v-bind="$attrs" :name="idx" :value="val" :level="level--">
          <template #default="slotprops">
            <slot v-bind="slotprops" :remove="() => remove(idx)" />         
          </template>
          <template #single="slotprops">
            <slot name="single" v-bind="slotprops" />
          </template>
          <template #object="slotprops">
            <slot name="object" v-bind="slotprops" />
          </template>
        </x-field-list>
      </div>
    </template>
  </x-flex>
</template>


<script>
import { context, formField } from '_source/mixins'
import XFieldset from '_components/form/XFieldset'
import XFlex from '_components/layout/XFlex'


/**
    Array input control via repeatable content.

    Features:
    - submits array data to ancestor __XForm__.
    - disable all descendant form controls and buttons at once

    Unused attributes are passed to __XFlex__.
*/
export default
{
    name: 'XFieldList',

    mixins: [ context('form').provider, formField ],
    
    components: { XFieldset, XFlex },

    props:
    {
        /**
            Max filed list nesting level.                        
        */
        level: { type: Number, default: Infinity },
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
        
        let slotType = (value) =>
        {
            if (value !== null)
            {
                if (Array.isArray(value) && this.level > 0) return 'array';
                if (typeof value === 'object') return 'object';
            }
                      
            return 'single';
        }

        return { append, change, fields: [], valid: true, remove, slotType };
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
                    }
                };
                
                fields[index] = data;

                return link;
            }

            return { ...this.form, field };
        }        
    }
}
</script>
