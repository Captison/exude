
Example image:

```vue
<x-image 
  src="https://image9.photobiz.com/8368/8_20200708115204_10749544_large.jpg" 
  width="48" 
/>
```

Bordered profile images:

```vue
let img = "https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg";

<x-image :src="img" border="a.5!prime" width="48" radius="a4" />
<x-image :src="img" border="a.5!primeDark" width="48" radius="a50%" />
```

Slightly rotated image:

```vue
let img = "https://cdn.photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg";

<x-box pers="600">
  <x-image :src="img" height="60" trans="ry30" shadow="basic" />
</x-box>
```

IPFS-sourced image:

```vue
let src = 'ipfs://ipfs/QmQxwA5eVHGtnHZopTXtvwj6YGqihTRPLBVsRnb39Y5x4q?tk=MHOf8yRgyDlTTS0-sFhf6vfLV2P1YO37AOvSmNbo4ZQ'

<x-image :src="src" width="60" />
```
