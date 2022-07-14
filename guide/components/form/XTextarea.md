
Basic text area:

```vue
let reset = "Here's a little story I like to tell...", value = reset;

<x-textarea :value.sync="value" border="a.5!prime" radius="a1" pad="h2" />

<ctrls>
  <opt label="reset value" :value="() => value = reset" />
</ctrls>
```
