
Example embed (image):

```vue
<x-embed
  src="https://image9.photobiz.com/8368/8_20200708115204_10749544_large.jpg" 
  width="48" 
/>
```

Fallback embed:

```vue
let img = null;
let img2 = "https://img.freepik.com/free-photo/blue-eyes-wavy-modern-one-beautiful_1139-828.jpg";

<x-embed el="object" :src="img" width="52" radius="a2">
  <x-embed :src="img2" width="52" radius="a2" />
</x-embed>
```

Slightly rotated image embed:

```vue
let img = "https://cdn.photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg";

<x-box pers="600">
  <x-embed :src="img" height="60" trans="ry30" shadow="basic" />
</x-box>
```
