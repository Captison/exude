
Choose color demo:

```vue
let value = null, invert = false;

<x-color :value.sync="value" :invert="invert" pad="v1 h3" radius="a2" />

<x-field el="label" margin="l2">
  <x-checkbox :value.sync="invert" align=":middle" /> Invert
</x-field>
```
