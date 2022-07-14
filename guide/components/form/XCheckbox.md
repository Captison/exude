
Checkbox states (static):

```vue
<x-text>
  <x-checkbox :value="true" align=":bottom" /> Checked.
  <x-checkbox :value="false" align=":bottom" /> Unchecked.
</x-text>
```

Labeled checkbox demo with focus color:

```vue
let double = false;

<x-text el="label" hf-colors="primeDark">
  <x-checkbox :value.sync="double" align=":bottom" /> {{ double ? 'Checked' : 'Unchecked' }}.
</x-text>
```
