
Two sides of an NFT:

```vue
let img = "https://bafybeibhalqw6mkbglqnivj3ffe7m6diuuf3guvyjf3gur6no3oq5eluvi.ipfs.infura-ipfs.io/";

<x-flex inline invert align=":top" colors="white:secondDark" radius="a2" overflow="hidden" width="50">
  <x-image :src="img" width="100%" />
  <x-text align="center" pad="v2">
    Hadley de' Medici
  </x-text>
</x-flex>
<x-flex inline invert align=":top" colors="white:secondDark" radius="a2" overflow="hidden" width="50">
  <x-text font="small">
    <x-grid cols="1fr 1fr" gap="2" place-content="center" height="48" border="a.25!white_d.4" margin="h2 t2">
      <x-text align="right" bold>Hat:</x-text>
      <div>Top Hat</div>
      <x-text align="right" bold>Eyes:</x-text>
      <div>Aviators</div>
      <x-text align="right" bold>Ears:</x-text>
      <div>Earphones</div>
      <x-text align="right" bold>Facial Hair:</x-text>
      <div>Beard</div>
      <x-text align="right" bold>Body:</x-text>
      <div>Gold Linen</div>
      <x-text align="right" bold>Weapon:</x-text>
      <div>Sword</div>
      <x-text align="right" bold>Accessory:</x-text>
      <div>None</div>
    </x-grid>
  </x-text>
  <x-text align="center" pad="v2">
    Noble Class
  </x-text>
</x-flex>
```

NFT flip card:

```vue
let flip = false;
let img = "https://bafybeibhalqw6mkbglqnivj3ffe7m6diuuf3guvyjf3gur6no3oq5eluvi.ipfs.infura-ipfs.io/";

<x-box display="inline-block" pos="relative" pers="200" width="50" cursor="pointer" @click="flip = !flip">
  <x-flex 
    invert 
    colors="white:secondDark" 
    radius="a2" 
    overflow="hidden" 
    :trans="`ry${flip ? -180 : 0}`"
    hide-back
  >
    <x-transition duration="0.8" />
    <x-image :src="img" width="100%" />
    <x-text align="center" pad="v2">
      Hadley de' Medici
    </x-text>
  </x-flex>
  <x-flex 
    invert     
    pos="absolute"
    trbl="a0" 
    colors="white:secondDark"
    radius="a2" 
    overflow="hidden" 
    :trans="`ry${flip ? 0 : 180}`"
    hide-back
  >
    <x-transition duration="0.8" />
    <x-text font="small">
      <x-grid cols="1fr 1fr" gap="2" place-content="center" height="48" border="a.25!white_d.4" margin="h2 t2">
        <x-text align="right" bold>Hat:</x-text>
        <div>Top Hat</div>
        <x-text align="right" bold>Eyes:</x-text>
        <div>Aviators</div>
        <x-text align="right" bold>Ears:</x-text>
        <div>Earphones</div>
        <x-text align="right" bold>Facial Hair:</x-text>
        <div>Beard</div>
        <x-text align="right" bold>Body:</x-text>
        <div>Gold Linen</div>
        <x-text align="right" bold>Weapon:</x-text>
        <div>Sword</div>
        <x-text align="right" bold>Accessory:</x-text>
        <div>None</div>
      </x-grid>
    </x-text>
    <x-text align="center" pad="v2">
      Noble Class
    </x-text>
  </x-flex>  
</x-box>
```
