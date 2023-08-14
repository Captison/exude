
Example with fixed items:

```vue
let data = [ 'Couch', 'Desk', 'Table', 'Chair', 'Bed' ];

<x-flex gap="3">

  <x-field-list inline invert :value.sync="data" aligns=":center" colors=":primeLight" pad="a3" gap=":2">
    <template #single="{ index, value }">
      <x-input :name="index" :value="value" colors=":secondLight" pad="v1 h2" radius="a2" />
    </template>
  </x-field-list>

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

  <x-box>
    <x-field-list inline invert :value.sync="data" aligns=":center" colors=":primeLight" pad="a3" margin="t2" radius="a3" gap=":2">
      <template #default="{ append }">
        <x-button colors="white:tertiDark" h-colors=":black" radius="a3" @click="append()"> append </x-button>
      </template>
      <template #single="{ index, value, remove }">
        <x-flex gap="2">
          <x-input :name="index" :value="value" colors=":secondLight" pad="v1 h2" radius="a2" />
          <x-button colors="white:primeDark" h-colors=":black" radius="a3" @click="remove"> 
            remove
          </x-button>
        </x-flex>
      </template>
    </x-field-list>
  </x-box>
  
  <x-text block>
    Data:
    <pre><code>{{ JSON.stringify(data, null, 4) }}</code></pre>
  </x-text>

</x-flex>
```

Object based field list demo:

```vue
let data = [];

<x-flex gap="3" aligns=":flex-start">

  <x-field-list :value.sync="data" invert inline gap=":.5">
    <template #default="{ append, remove }">
      <x-flex gap="1">
        <x-button colors="white:secondDark" h-colors=":primeDark" radius="a2" pad="a1" @click="append({})">
          <x-icon name="plus" size="6" />
        </x-button>
        <x-button colors="white:secondDark" h-colors=":primeDark" radius="a2" pad="a1" @click="append([])">
          <x-icon name="plus_thick" size="6" />
        </x-button>
        <x-button v-if="remove" colors="white:terti" h-colors=":tertiDark" radius="a2" pad="a1" @click="remove">
          <x-icon name="minus_thick" size="6" />
        </x-button>
      </x-flex>
    </template>
    <template #object="{ attribute, negate, trait, remove }">
      <x-flex gap=".5" aligns=":center">
        <x-checkbox 
          name="negate" 
          :value="negate" 
          :colors="negate ? 'white:red' : 'white:second'" 
          pad="a1" 
          radius="t2 l2"
        >
          <x-icon name="not_equal" size="6" />
        </x-checkbox>
        <x-input name="attribute" :value="attribute" colors=":secondLight" pad="v1 h2" />
        <x-input name="trait" :value="trait" colors=":secondLight" pad="v1 h2" />
        <x-button colors=":secondLight" h-colors=":primeLight" radius="r2 b2" pad="a1" @click="remove()">
          <x-icon name="close" size="6" />
        </x-button>
      </x-flex>
    </template>
  </x-field-list>

  <x-text block>
    Data:
    <pre><code>{{ JSON.stringify(data, null, 4) }}</code></pre>
  </x-text>

</x-flex>  
```
