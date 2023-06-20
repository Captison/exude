
Simple example:

```vue
let bool = false;

<x-context :color="bool ? 'terti' : 'second'">
  <x-box display="inline-block" border="a.25!prime" pad="v3 h5" @click="bool = !bool">
    <x-context #default="{ color }">
      <x-text font="base" :colors="color">
        Click to change color!
      </x-text>
    </x-context>
  </x-box>
</x-context>
```
