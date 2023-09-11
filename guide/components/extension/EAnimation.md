
Forever spinning (click to change icon):

```vue
let m = mock, icon = m.icon();

<x-flex inline @click="icon = m.icon()">

  <e-animation infinite name="spin" duration="3s" timing="linear" />

  <x-icon :name="icon" size="18" colors="terti" />

  <x-keyframes name="spin">
    <frame at="0%" transform="rotate(0deg)" />
    <frame at="100%" transform="rotate(360deg)" />
  </x-keyframes>

</x-flex>
```

Remember that __EAnimation__ requires keyframes to be be defined somewhere on the page.
