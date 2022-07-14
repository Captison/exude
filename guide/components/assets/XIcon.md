
Basic icon:

```vue
let { icon } = mock;

<x-icon :name="icon()" size="10" />
```

Sizing the icons:

```vue
let { icon } = mock, name = icon();

<x-icon :name="name" size="6" align-v="middle" />
<x-icon :name="name" size="8" align-v="middle" />
<x-icon :name="name" size="10" align-v="middle" />
<x-icon :name="name" size="12" align-v="middle" />
```

Stroke and fill color demo:

```vue
let { color, icon } = mock;
let fill = color(), stroke = color(), name1 = icon(), name2 = icon(), name3 = icon();

<x-icon :name="name1" size="16" :colors="`${fill}:${stroke}`" />
<x-icon :name="name2" size="16" :colors="`${fill}:${stroke}`" />
<x-icon :name="name3" size="16" :colors="`${fill}:${stroke}`" />

<ctrls>
  <grp label="Random fill color">
    <opt :value="color" :data.sync="fill" />
  </grp>
  <grp label="Random stroke color">
    <opt :value="color" :data.sync="stroke" />
  </grp>
  <grp label="Random icon">
    <opt label="change" :value="() => (name1 = icon(), name2 = icon(), name3 = icon())" />
  </grp>
</ctrls>
```
