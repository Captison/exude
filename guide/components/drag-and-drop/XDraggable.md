
Basic draggable:

```
<x-draggable display="inline-block" colors=":primeDark" pad="a3">
  <x-text bold colors="white">Drag this box!</x-text>
</x-draggable>
```

Non-collapsing draggable with drag handle:

```
<x-draggable display="inline-block" no-collapse colors="white:primeDark" radius="a1.5" pad="a3">
  <x-flex>
    <x-drag-handle inline margin="r2">
      <x-icon name="menu" />
    </x-drag-handle>
    <x-text bold>
      Toast the New Year...
      <x-text block font="small" colors="alertLight">
        May the best of your past be the worst of your future.
      </x-text>
    </x-text>
  </x-flex>
</x-draggable>
```

Fenced draggable:

```
<x-box height="60" width="100" colors=":secondDark" pos="relative" overflow="hidden">
  <x-flex aligns=":center:center" height="100%">
    <x-draggable display="inline-block" colors=":secondLight" pad="a3" fenced>
      <x-text bold>Fenced box!</x-text>
    </x-draggable>
  </x-flex>
</x-box>
```
