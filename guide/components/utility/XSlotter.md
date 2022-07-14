
Slotter example:

```vue
<x-slotter>
  <template #text="{ color }">
    <x-text :colors="color"> This text is rendered in {{ color }} color. </x-text>
  </template>
  
  <template #default="{ text }">
    <x-flex inline gap="1" pad="v1">
      <x-icon name="test" />
      <component :is="text" color="prime" />
    </x-flex>
    <br />
    <x-box display="inline-block" colors=":secondDark" pad="v1 h2">
      <component :is="text" color="white" />
    </x-box>
  </template>
</x-slotter>
```
