
Basic expand/collapse box:

```vue
let show = true;

<x-button colors="white:primeDark" radius="a1" margin="b1" @click="show = !show"> toggle </x-button>

<x-exapse :expand="show" breadth="120">
  <x-text>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  </x-text>
</x-exapse>
```

Directional expand/collapse demo:

```vue
let show = true, horiz = false, lower = false;

<x-button colors="white:primeDark" radius="a1" margin="b1" @click="show = !show"> toggle </x-button>

<x-box pos="relative" colors=":primeLight" width="80" height="80">
  <x-exapse 
    :expand="show" 
    pos="absolute" 
    :trbl="horiz ? 't0 ' + (lower ? 'r0' : 'l0') : 'l0 ' + (lower ? 'b0' : 't0')" 
    :extent="80" 
    :horiz="horiz" 
    :lower="lower"
  >
    <x-flex aligns=":center:center" width="80" height="80">
      <x-image 
        src="https://image9.photobiz.com/8368/8_20200708115204_10749544_large.jpg" 
        border="a.5!primeDark"
        width="48"
      />
    </x-flex>
  </x-exapse>
</x-box>

<ctrls>
  <grp label="orientation">
    <opt label="vertical" :value="false" :data.sync="horiz" />
    <opt label="horizontal" :value="true" :data.sync="horiz" />
  </grp>
  <grp label="slide from">
    <opt :label="horiz ? 'left' : 'top'" :value="false" :data.sync="lower" />
    <opt :label="horiz ? 'right' : 'bottom'" :value="true" :data.sync="lower" />
  </grp>
</ctrls>
```
