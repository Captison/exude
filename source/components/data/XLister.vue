<template>
  <div v-frag>
    <!-- 
        @slot list header 

        @binding { array } array
          The filtered list of items.
    -->
    <slot :array="filteredList" />
    <template v-if="filteredList.length">
      <x-box v-for="(value, index) in filteredList" v-bind="$attrs" :key="index">
        <!-- 
            @slot iterate content 
            
            Each item has an __XBox__ parent.
            
            @binding { array } array
              The filtered list of items.
            @binding { anny } index
              Current index in list.
            @binding { anny } item
              Value in list at `index`.
        -->
        <slot name="iter" :index="index" :item="value" :array="filteredList" />
      </x-box>
    </template>
    <!-- @slot content for empty list -->
    <slot v-else name="empty" />
  </div>
</template>


<script>
import { context } from '_source/mixins'
import { filter } from '_lib/utils'
import { frag } from '_source/directives'
import XBox from '_components/layout/XBox'


let listerCtx = context('lister');
/**
    Array data list component.
    
    Designed to be used as a sub-component for listing parent component data.
    
    Unused attributes are passed to __XBox__.
*/
export default
{
    name: 'XLister',
    
    mixins: [ listerCtx.provider, listerCtx.consumer ],
    
    components: { XBox },

    directives: { frag },
        
    props:
    {
        /**
            Criteria for data filtration.                        
            
            Each target value is tested based on type as follows:
            - function: tested via `function(value) => boolean`.
            - RegExp: tested to pass the expression.
            - array: tested to match at least one item in the array.
            - object: tested to match at least one value of the object.
            - other: tested to be equal to the given value.
            
            An exception to the above is that if this is an object with a 
            `$test` paameter, the object will be treated as sub-criteria 
            configuration and NOT as test values.  And this also applies to any
            descendant objects encountered anywhere in the object sub-tree.
            
            A sub-criteria object may include `$test`, `$path`, `$and`, 
            and `$negate` parameters similar to the props described on this
            component.            
        */
        filterSpec: null,
        /**
            Data to be listed or a number of times to repeat content.
        */
        list: [ Array, Number ]
    },
    
    data()
    {
        let defaultListerLink =
        {
            array: () => null,            
            filterSpec: () => null
        }
        
        return { defaultListerLink, listerLink: defaultListerLink };
    },
    
    computed:
    {
        array() 
        {
            let array = this.list || this.listerLink.array();
            
            if (typeof array === 'number') 
                return Array.apply(null, Array(array));
                
            return array || []; 
        },
      
        filteredList() 
        {
            let spec = this.filterSpec || this.listerLink.filterSpec();
            return spec ? this.array.filter(filter(spec)) : this.array; 
        }
    },
    
    methods:
    {
        provideListerContext() { return { array: () => this.filteredList }; },
        
        changeListerContext() { this.listerLink = { ...this.defaultListerLink, ...this.lister }; }
    }
}
</script>
