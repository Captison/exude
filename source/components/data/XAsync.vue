<template>
  <div style="display:contents" :data-x-async="_uid">
    <!-- 
        @slot content to display data

        @binding { array } array
          Data array (empty when no data).
        @binding { any } data
          Raw data.
        @binding { boolean } loading
          Is data currently loading?
    -->
    <slot :array="array" :data="data" :loading="loading" />
  </div>
</template>


<script>
import { debounce, exists } from '_lib/utils'


/**
    Provides async data to child content.
*/
export default
{
    name: 'XAsync',

    props:
    {
        /**
            Request data when component is mounted?
        */
        immediate: Boolean,
        /**
            Data, promise, or async function to retrieve data.
        */
        source: null
    },
    
    emits:
    {
        /**
            On failed data request.

            @param { any } reason
              Reason for failure.
        */
        failure(reason) { return typeof reason !== 'undefined'; },
        /**
            On loading state change.

            This event may not be emitted at all if data loads quickly.

            @param { boolean } isLoading
              Is the data currently being loaded?
        */
        loading(isLoading) { return typeof isLoading === 'boolean'; },
        /**
            On successful data request.

            @param { any } value
              Loaded data.
        */
        // eslint-disable-next-line no-unused-vars
        success(value) { return true; }
    },

    data: () => ({ data: null, loading: false }),
    
    created()
    {
        let bounce = debounce(() => this.loading = true, 400);
        
        this.finalizer = () =>
        {
            bounce.stop();
            // wait a tick before undoing loading state
            this.$nextTick(() => this.loading = false);
        }

        this.handler = data => 
        {
            this.data = data;
            this.$emit('success', data);
            return data;
        };

        this.loader = resolve =>
        {
            bounce();
            resolve(typeof this.source === 'function' ? this.source() : this.source);
        };

        this.failer = reason =>
        {
            this.data = null;
            this.$emit('failure', reason);
            return reason;
        }
    },   

    mounted()
    {
        if (this.immediate) this.requestData();
    },

    computed:
    {
        array() { return exists(this.data) ? [].concat(this.data) : []; }        
    },

    watch:
    {
        loading() { this.$emit('loading', this.loading); },

        source() { this.requestData(); }      
    },

    methods:
    {
        /**
            Execute data request.
            @public
        */
        requestData() 
        { 
            let { failer, finalizer, handler, loader } = this;
            
            return new Promise(loader).then(handler).catch(failer).finally(finalizer); 
        }
    }
}
</script>
