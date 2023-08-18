
Example with fixed items:

```vue
let data = [ 'Couch', 'Desk', 'Table', 'Chair', 'Bed' ];

<x-flex gap="3">
  <x-flex inline invert aligns=":center" colors=":primeLight" pad="a3" gap=":2">
    
    <x-field-list :value.sync="data">
      <x-lister #iter="{ index }">
        <x-input :name="index" colors=":secondLight" pad="v1 h2" radius="a2" />
      </x-lister>
    </x-field-list>
    
  </x-flex>

  <x-text block>
    Data:
    <pre><code>{{ JSON.stringify(data, null, 4) }}</code></pre>
  </x-text>

</x-flex>
```


Demo with adding/removing items:

```vue
let data = [ 'brussel sprouts', 'green beans', 'summer squash' ];

<x-flex gap="3">

  <x-flex inline invert aligns=":center" colors=":primeLight" pad="a3" margin="t2" radius="a3" gap=":2">
  
    <x-field-list #default="{ append, remove }" :value.sync="data">
      <x-button colors="white:tertiDark" h-colors=":black" radius="a3" @click="append()"> append </x-button>
      <x-lister #iter="{ index }">
        <x-flex gap="2">
          <x-input :name="index" colors=":secondLight" pad="v1 h2" radius="a2" />
          <x-button colors="white:primeDark" h-colors=":black" radius="a3" @click="remove(index)"> 
            remove
          </x-button>
        </x-flex>
      </x-lister>      
    </x-field-list>
    
  </x-flex>    
  
  <x-text block>
    Data:
    <pre><code>{{ JSON.stringify(data, null, 4) }}</code></pre>
  </x-text>

</x-flex>
```
