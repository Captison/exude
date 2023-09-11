
Rectangle box:

```vue
<x-box colors=":prime" width="50" height="30" />
```

Box with border and radius:

```vue
<x-box border="a.5!prime" radius="a3" size="30" />
```

Note in the above how we can use `size` to make a square.

Box positioning and rotation:

```vue
<x-box relative colors=":primeLight" size="30" trans="rz45" margin="a4">
  <x-box absolute colors=":primeDark" trbl="t10 l10" size="10" />
</x-box>
```
