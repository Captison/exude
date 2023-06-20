
```vue
let bool = false;

<x-link pad="v1 h2" @click="bool = !bool"> toggle </x-link>

<x-when #default="props" :test="bool" clr=":black" w-clr=":prime" w-rad="a50%">
  <x-box :colors="props.clr" :radius="props.rad" height="36" width="36" />
  <x-text block> {{ bool ? 'circle' : 'square' }} </x-text>
</x-when>
```
