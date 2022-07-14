
Basic box:

```vue
<x-box colors=":prime" width="30" height="30" />
```

Box with border and radius:

```vue
<x-box border="a.5!prime" radius="a3" width="30" height="30" />
```

Box positioning and rotation:

```vue
<x-box colors=":primeLight" pos="relative" width="30" height="30" trans="rz45" margin="a4">
  <x-box colors=":primeDark" pos="absolute" trbl="t10 l10" width="10" height="10" />
</x-box>
```
