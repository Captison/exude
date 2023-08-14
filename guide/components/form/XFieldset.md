
Example:

```vue
let data = {};

<x-flex gap="3">

  <x-fieldset #default="v" inline :value.sync="data" colors=":primeLight" pad="a3" margin="b2" width="40" radius="a2">
    <x-flex invert gap=":2">
      <x-input name="burger" :value="v.burger" colors=":secondLight" pad="v1 h2" radius="a2" placeholder="burger" />
      <x-field el="label" hf-colors="white">
        <x-checkbox name="taco" :value="v.taco" align=":bottom" /> Taco?
      </x-field>
      <x-input name="pizza" :value="v.pizza" colors=":secondLight" pad="v1 h2" radius="a2" placeholder="pizza" />
    </x-flex>
  </x-fieldset>

  <x-text block>
    Data:
    <pre><code>{{ JSON.stringify(data, null, 4) }}</code></pre>
  </x-text>

</x-flex>
```
