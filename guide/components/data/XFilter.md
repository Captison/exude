
Filter against case-insensitive regex example:

```vue
let value = 'Nissan', negate = false;
let autos = mock.data.autos.slice(0, 30);

<x-flex aligns=":center" gap="2">
  <x-input :value.sync="value" border="a.25!primeLight" pad="h1" radius="a2" placeholder="Filter Make" />
  <x-field block el="label" hf-colors="primeDark">
    <x-checkbox :value.sync="negate" align=":bottom" /> Negate
  </x-field>
</x-flex>

<x-filter #default="{ array }" :list="autos" :test="new RegExp(value, 'i')" :negate="negate" path="make">
  <x-grid v-if="array.length" inline cols="2fr 2fr 1fr" colors=":secondLight" pad="a3" margin="t3" gap="3:1">
    <x-text bold margin="b2"> Make </x-text>
    <x-text bold margin="b2"> Model </x-text>
    <x-text bold margin="b2"> Year </x-text>
    <div v-for="item in array" :key="item.vin" :style="{ display: 'contents' }">
      <x-text> {{ item.make }} </x-text>
      <x-text> {{ item.model }} </x-text>
      <x-text> {{ item.year }} </x-text>
    </template>
  </x-grid>
</x-filter>
```
