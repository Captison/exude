<template>
  <div v-frag>
    <!-- 
        @slot filter content 
        
        @binding { array } array
          The filtered data.
        @binding { function } filterFn
          The filtering function `fn(value) => boolean`.
    -->
    <slot :array="array" :filter-fn="filter" />
  </div>
</template>


<script>
import { frag } from '_source/directives'
import { filter } from '_lib/utils'


/**
*/
export default
{
    name: 'XFilter',
    
    directives: { frag },
    
    props:
    {
        /**
            Are multiple tests ANDed together (instead of ORed)?
            
            Generally used only when `test` is an object or array.
        */
        and: Boolean,
        /**
            Data to be filtered.
        */
        list: { type: Array, default: () => ([]) },     
        /**
            Flip the boolean result of this filtration test?
        */
        negate: Boolean,
        /**
            Path to value in target objects to test against.
            
            Used when a `list` item is an object.
        */
        path: String,
        /**
            Criteria for data filtration.                        
            
            Each `list` value is tested based on type as follows:
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
        test: null
    },
    
    computed:
    {
        array() { return this.list.filter(this.filter); },
      
        filter() 
        {
            let { and, negate, path, test } = this;            
            return filter({ $and: and, $negate: negate, $path: path, $test: test }); 
        }
    }
}
</script>
