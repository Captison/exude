
Toggle states (static):

```vue
<x-text>
  <x-toggle :value="true" align=":middle" /> Checked.
  <x-toggle :value="false" align=":middle" /> Unchecked.
</x-text>
```

Disabled toggle with field label (static):

```vue
<x-field el="label" i-colors="black_f.6" i-cursor="not-allowed">
  <x-toggle :value="true" align=":middle" disabled /> Checked.
</x-field>
```

Labeled toggle demo with focus color:

```vue
let double = false;

<x-field el="label">
  <x-toggle :value.sync="double" align=":middle" /> {{ double ? 'Checked' : 'Unchecked' }}.
</x-field>
```
