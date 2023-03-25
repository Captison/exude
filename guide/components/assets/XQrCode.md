
Simple demo:

```vue
let value = 'I am a fish!'

<div>
  <x-qr-code :content="value" colors="white:black" width="64" height="64" />
</div>
<x-input :value.sync="value" font="text" border="a.25!prime" radius="1" margin="v2" width="100" pad="v1 h2" />
```
