
Floater example:

```vue
let show = false;

<x-button colors="black:tertiLight" radius="a2" @click="show = true">
  Open Window
</x-button>

<x-floater #default="{ close }" :show.sync="show" :timeo="4000" colors=":black_f.5" trbl="t4" radius="a2" frame="a1">
  <x-flex invert aligns=":center" colors=":white" pad="a3" radius="a2" gap=":2">
    <x-text> Your popup message window! </x-text>
    <x-button radius="a2" border="a.25!prime" pad="v1 h2" @click="close"> Close </x-button>
  </x-flex>
</x-floater>
```
