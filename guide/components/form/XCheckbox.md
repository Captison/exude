
Checkbox states (static):

```vue
<x-text>
  <x-checkbox :value="true" align=":bottom" /> Checked.
  <x-checkbox :value="false" align=":bottom" /> Unchecked.
</x-text>
```

Disabled checkbox with field label (static):

```vue
<x-field el="label" i-colors="black_f.6" i-cursor="not-allowed">
  <x-checkbox :value="true" align=":bottom" disabled /> Checked.
</x-field>
```

Labeled checkbox demo with focus color:

```vue
let double = false;

<x-field el="label" hf-colors="primeDark">
  <x-checkbox :value.sync="double" align=":bottom" /> {{ double ? 'Checked' : 'Unchecked' }}.
</x-field>
```

Checkbox custom state demo:

```vue
let on = false;

<x-field el="label" hf-colors="primeDark">
  <x-checkbox :value.sync="on" colors=":primeDark" pad="a1" radius="a.5"> 
    <x-box :colors="`:${on ? 'primeLight' : 'transparent'}`" height="3" width="3" radius="a.5" />
  </x-checkbox> 
  {{ on ? 'Checked' : 'Unchecked' }}.
</x-field>
```
