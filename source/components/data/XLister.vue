<template>
  <div v-frag>
    <!-- 
        @slot list header 

        @binding { array } array
          The filtered list of items.
    -->
    <slot :array="filteredList" />
    <template v-if="(customMode ? array : filteredList).length">
      <x-box 
        v-for="(value, index) in iterableList" 
        v-show="!hideMode || filterFn(value)" 
        v-bind="$attrs" 
        :key="index"
      >
        <!-- 
            @slot iterate content 
            
            Each item has an __XBox__ parent.
            
            @binding { number } index
              Current index in list.
            @binding { any } item
              Value in list at `index`.
            @binding { boolean } filter
              When `excludes='custom'`, true/false for include/exclude item.
        -->
        <slot name="iter" :index="index" :item="value" :filter="!customMode || filterFn(value)" />
      </x-box>
    </template>
    <!-- 
        @slot empty list content
        
        Renders only when
        - there are no items in the list
        - all items in list have been excluded
    -->
    <slot v-else name="empty" />
  </div>
</template>


<script>
import { context } from '_source/mixins'
import { exists, filter } from '_lib/utils'
import { frag } from '_source/directives'
import XBox from '_components/layout/XBox'


/**
    Array data list component.
    
    Designed to be used as a sub-component for listing parent component data.
    
    Unused attributes are passed to __XBox__.
*/
export default
{
    name: 'XLister',
    
    mixins: [ context('lister').provider ],
    
    components: { XBox },

    directives: { frag },
        
    props:
    {
        /**
            Specifies how to handle excluded items.
            
            Possible values:
            - `remove` - items are removed from the page (default)
            - `hide` - items are hidden in page (display: none)
            - `custom` - a `filter` boolean is passed to `iter` slot
            
            Ignored if no `filterSpec` is provided (obviously).
        */
        excludes: String,
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
    
    computed:
    {
        array() 
        {
            let array = this.list;

            if (!exists(array) && typeof this.lister === 'function')
                array = this.lister();

            if (typeof array === 'number') 
                array = Array.apply(null, Array(array));

            return array || []; 
        },
        
        customMode() { return this.excludes === 'custom'; }, 

        filteredList() { return this.filterFn.list ? this.filterFn.list(this.array) : this.array; },    

        filterFn() { return exists(this.filterSpec) ? filter(this.filterSpec) : () => true; },
        
        hideMode() { return this.excludes === 'hide'; },
        
        iterableList() 
        {
            if (this.filterFn.iterate && (!this.excludes || this.excludes === 'remove'))
                return this.filterFn.iterate(this.array);
            
            return this.array;
        }      
    },
    
    methods:
    {
        provideListerContext() { return () => this.filteredList }
    }
}
</script>
