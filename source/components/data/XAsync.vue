<template>
  <div style="display:contents">
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
            Data or async function to retrieve data.
        */
        source: null
    },
    
    emits:
    {
        /**
            On loading state change.

            This event may not be emitted at all if data loads quickly.

            @param { boolean }
              Is the data currently being loaded?
        */
        loading(value) { return typeof value === 'boolean'; }
    },

    data()
    {
        let bounce = debounce(400, () => this.loading = true);
        
        let finalizer = () =>
        {
            bounce.stop();
            // wait a tick before undoing loading state
            this.$nextTick(() => this.loading = false);
        }

        let handler = data => this.data = data

        let loader = resolve =>
        {
            bounce();
            resolve(typeof this.source === 'function' ? this.source() : this.source);
        };

        return { data: null, finalizer, handler, loader, loading: false };
    },

    mounted()
    {
        if (this.immediate) this.requestData();
    },

    computed:
    {
        array() { return exists(this.data) ? [].concat(this.data) : [] },
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
        requestData() { return new Promise(this.loader).then(this.handler).finally(this.finalizer); }
    }
}
</script>
