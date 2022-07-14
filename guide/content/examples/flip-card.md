
Two sides of an NFT:

```vue
let img = "https://bafybeibhalqw6mkbglqnivj3ffe7m6diuuf3guvyjf3gur6no3oq5eluvi.ipfs.infura-ipfs.io/";

<s-flex inline invert align=":top" colors="white:secondDark" radius="a2" overflow="hidden" width="50">
  <s-image :src="img" width="100%" />
  <s-text align="center" pad="v2">
    Hadley de' Medici
  </s-text>
</s-flex>
<s-flex inline invert align=":top" colors="white:secondDark" radius="a2" overflow="hidden" width="50">
  <s-text font="small">
    <s-grid cols="1fr 1fr" gap="2" place-content="center" height="48" border="a.25!white_d.4" margin="h2 t2">
      <s-text align="right" bold>Hat:</s-text>
      <div>Top Hat</div>
      <s-text align="right" bold>Eyes:</s-text>
      <div>Aviators</div>
      <s-text align="right" bold>Ears:</s-text>
      <div>Earphones</div>
      <s-text align="right" bold>Facial Hair:</s-text>
      <div>Beard</div>
      <s-text align="right" bold>Body:</s-text>
      <div>Gold Linen</div>
      <s-text align="right" bold>Weapon:</s-text>
      <div>Sword</div>
      <s-text align="right" bold>Accessory:</s-text>
      <div>None</div>
    </s-grid>
  </s-text>
  <s-text align="center" pad="v2">
    Noble Class
  </s-text>
</s-flex>
```

NFT flip card:

```vue
let flip = false;
let img = "https://bafybeibhalqw6mkbglqnivj3ffe7m6diuuf3guvyjf3gur6no3oq5eluvi.ipfs.infura-ipfs.io/";

<s-box display="inline-block" pos="relative" pers="200" width="50" cursor="pointer" @click="flip = !flip">
  <s-flex 
    invert 
    colors="white:secondDark" 
    radius="a2" 
    overflow="hidden" 
    :trans="`ry${flip ? -180 : 0}`"
    transition="0.8s"
    hide-back
  >
    <s-image :src="img" width="100%" />
    <s-text align="center" pad="v2">
      Hadley de' Medici
    </s-text>
  </s-flex>
  <s-flex 
    invert     
    pos="absolute"
    trbl="a0" 
    colors="white:secondDark"
    radius="a2" 
    overflow="hidden" 
    :trans="`ry${flip ? 0 : 180}`"
    transition="0.8s"
    hide-back
  >
    <s-text font="small">
      <s-grid cols="1fr 1fr" gap="2" place-content="center" height="48" border="a.25!white_d.4" margin="h2 t2">
        <s-text align="right" bold>Hat:</s-text>
        <div>Top Hat</div>
        <s-text align="right" bold>Eyes:</s-text>
        <div>Aviators</div>
        <s-text align="right" bold>Ears:</s-text>
        <div>Earphones</div>
        <s-text align="right" bold>Facial Hair:</s-text>
        <div>Beard</div>
        <s-text align="right" bold>Body:</s-text>
        <div>Gold Linen</div>
        <s-text align="right" bold>Weapon:</s-text>
        <div>Sword</div>
        <s-text align="right" bold>Accessory:</s-text>
        <div>None</div>
      </s-grid>
    </s-text>
    <s-text align="center" pad="v2">
      Noble Class
    </s-text>
  </s-flex>  
</s-box>
```
