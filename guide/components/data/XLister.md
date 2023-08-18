
Repeating content example:

```vue
<x-lister #iter="{ index }" :list="5">
  <x-text>Repeat number {{ index + 1 }} for this text.</x-text>
</x-lister>
```


Lister filtering demo against case-insensitive regex example:

```vue
let value = 'Nissan', negate = false;
let autos = mock.data.autos.slice(0, 30);

<x-flex aligns=":center" gap="2">
  <x-input :value.sync="value" border="a.25!primeLight" pad="h1" radius="a2" placeholder="filter make" />
  <x-field block el="label" hf-colors="primeDark">
    <x-checkbox :value.sync="negate" align=":bottom" /> Negate
  </x-field>
</x-flex>

<x-grid inline cols="2fr 2fr 1fr" colors=":secondLight" pad="a3" margin="t3" gap="3:1">  
  <x-lister 
    :list="autos" 
    :filter-spec="{ $test: new RegExp(value, 'i'), $negate: negate, $path: 'make' }"
    display="contents"
  >
    <template #default>
      <x-text bold margin="b2"> Make </x-text>
      <x-text bold margin="b2"> Model </x-text>
      <x-text bold margin="b2"> Year </x-text>
    </template>
    <template #iter="{ item }">
      <x-text> {{ item.make }} </x-text>
      <x-text> {{ item.model }} </x-text>
      <x-text> {{ item.year }} </x-text>
    </template>
  </x-lister>
  
</x-grid>
```
