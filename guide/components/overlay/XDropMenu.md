
Button-wrapped vanilla option drop menu:

```vue
let show = false;

<x-drop-menu :show.sync="show" :offset="1" space="nowrap">
  <template #target>
    <x-button 
      colors="white:primeDark" 
      h-colors="prime:white" 
      border="a.25!primeLight" 
      font="text" 
      radius="a1" 
      icon="face" 
      @click="show = !show"
    >
      Export
    </x-button>
  </template>
  <x-text block colors="white:prime" pad="v3 h4" margin="v1"> Export to PDF </x-text>
  <x-text block colors="white:prime" pad="v3 h4" margin="v1"> Export to Word </x-text>
  <x-text block colors="white:prime" pad="v3 h4" margin="v1"> Export to Pages </x-text>
  <x-text block colors="white:prime" pad="v3 h4" margin="v1"> Export to Image </x-text>
</x-drop-menu>
```

Target-less drop menu:

```vue
let show = false;

<div :style="{ position: 'relative', width: '480px' }">
  <x-link @click="show = !show">{{ show ? 'hide' : 'show' }} menu</x-link>
  <x-drop-menu :show.sync="show">
    <x-text block pad="v3 h4">Menu Item One</x-text>
    <x-text block pad="v3 h4">Menu Item Two</x-text>
    <x-text block pad="v3 h4">Menu Item Three</x-text>
  </x-drop-menu>
</div>
```

Note that without a `target` slot, the drop menu will position itself against and match the width of its closest CSS-positioned parent.
