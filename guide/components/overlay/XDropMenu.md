
Static example with button:

```vue
let show = false;

<x-drop-menu invert :show.sync="show" :gap="1" space="nowrap" z-index="1">
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

Without a `target` slot, the drop menu will position itself against and match the width of its closest CSS-positioned parent.

Target-less drop menu:

```vue
let show = false;

<div :style="{ position: 'relative', width: '480px' }">
  <x-link @click="show = !show">{{ show ? 'hide' : 'show' }} menu</x-link>
  <x-drop-menu :show.sync="show" z-index="1">
    <x-box colors=":white" border="a.25!prime" radius="a1">
      <x-text block pad="v3 h4">Menu Item One</x-text>
      <x-text block pad="v3 h4">Menu Item Two</x-text>
      <x-text block pad="v3 h4">Menu Item Three</x-text>
    </x-box>
  </x-drop-menu>
</div>
```

A side-opening "drop button" with dynamic label:

```vue
let show = false;
let value = null;

<x-drop-menu invert :show.sync="show" :gap="1" side="right" offsets=".5:.5" space="nowrap" z-index="1">
  <template #target>
    <x-button 
      bold
      colors=":secondLight" 
      h-colors=":white" 
      border="a.25!secondDark" 
      font="text" 
      radius="a1" 
      gap="1"
      @click="show = !show"
    >
      {{ value || 'Select One' }}
      <x-cue :open="show" angles="-90:0" />
    </x-button>
  </template>
  <x-option-group 
    :value.sync="value"
    colors=":secondLight" 
    sel-colors="secondLight:white_d.8" 
    h-colors="white_d.2:secondDark" 
    pad="v3 h4" 
    margin="v.5"
    align="left"
  >
    <x-option data="Vitamin D" />
    <x-option data="Astaxanthin" />
    <x-option data="Turmeric" />
    <x-option data="Omega 3-6-9" />
    <x-option data="Psyllium" />
    <x-option data="Chlorella" />
    <x-option data="Asian Ginseng" />
  </x-option-group>
</x-drop-menu>
```
