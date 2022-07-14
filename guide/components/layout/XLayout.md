
Grid layout examples:

```vue
let cols = 8;

<x-text block border="a1!prime" pad="a1">
  <x-layout v-for="m of cols" :key="m" :cols="cols" row-gap="2" col-gap="1">
    <x-layout-cell v-for="n of m" :key="n" colors="white:prime" :span="cols/m" anchor=":center" pad="v1">
      {{ n }}
    </x-layout-cell>
  </x-layout>
</x-text>
```

Please see __XLayoutCell__ for more examples.
