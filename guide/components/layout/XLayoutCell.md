
Layout cells spanning across columns:

```vue
<x-layout cols="12" col-gap="2" row-gap="2">
  <x-layout-cell :span="2">
    <x-text block colors=":primeLight" pad="a3"> 2 column span </x-text>
  </x-layout-cell>
  <x-layout-cell :span="7">
    <x-text block colors=":tertiLight" pad="a3"> 7 column span </x-text>
  </x-layout-cell>
  <x-layout-cell :span="3">
    <x-text block colors=":primeLight" pad="a3"> 3 column span </x-text>
  </x-layout-cell>
  <x-layout-cell :span="12">
    <x-text block colors=":secondLight" pad="a3"> 12 column span </x-text>
  </x-layout-cell>
</x-layout>
```

Layout cells with horizontal content anchoring:

```vue
<x-layout cols="12" span="4" :col-gap="2" :row-gap="2">
  <x-layout-cell colors=":white_d.1" anchor=":left">
    <x-text block colors=":primeLight" pad="a3"> anchor left </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" anchor=":left">
    <x-text block colors=":tertiLight" pad="a3"> anchor left </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" anchor=":left">
    <x-text block colors=":secondLight" pad="a3"> anchor left </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" anchor=":center">
    <x-text block colors=":primeLight" pad="a3"> anchor center </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" anchor=":center">
    <x-text block colors=":tertiLight" pad="a3"> anchor center </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" anchor=":center">
    <x-text block colors=":secondLight" pad="a3"> anchor center </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" anchor=":right">
    <x-text block colors=":primeLight" pad="a3"> anchor right </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" anchor=":right">
    <x-text block colors=":tertiLight" pad="a3"> anchor right </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" anchor=":right">
    <x-text block colors=":secondLight" pad="a3"> anchor right </x-text>
  </x-layout-cell>
</x-layout>
```

Layout cells with maximum width:

```vue
<x-layout cols="12" span="6" col-gap="2" row-gap="2">
  <x-layout-cell colors=":white_d.1" :max-content-width="60" anchor=":center">
    <x-text block colors=":primeLight" pad="a3">
      Here, the cell content box has a maximum width.  As the browser viewport is resized it will maintain that width unless the cell width forces it smaller.
    </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" :max-content-width="80" anchor="center:center">
    <x-text block colors=":tertiLight" pad="a3">
      This cell's content box also has a maximum width.
    </x-text>
  </x-layout-cell>
</x-layout>
```

Layout cells with minimum height and vertically anchored content:

```vue
<x-layout cols="12" span="6" col-gap="2" row-gap="2">
  <x-layout-cell colors=":white_d.1" :min-height="50" anchor="center">
    <x-text block colors=":tertiLight" pad="a3">
      This cell maintains a minimum height, even though this content does not fill it completely.  Content is also vertically centered within the cell.
    </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" anchor="bottom">
    <x-text block colors=":primeLight" pad="a3">
      Although this cell has no minimum height set it is still affected by the row, as minimum row height is always the height of tallest cell.  Here, content is aligned to the bottom of the cell.
    </x-text>
  </x-layout-cell>
</x-layout>
```

Expanded layout cells:

```vue
<x-layout cols="12" span="12" align="center" col-gap="2" row-gap="2">
  <x-layout-cell colors=":white_d.1" anchor=":center">
    <x-text block colors=":tertiLight" pad="a3">
      Content cell width is driven by the content in the cell.
      <x-box colors=":black" height=".25" />
      This one will only ever be as wide as necessary.
    </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" expanded anchor=":center">
    <x-text block colors=":secondLight" pad="a3">
      But an expanded content cell will use all width available.
      <x-box colors=":black" height=".25" />
      This one will always stretch to full cell width.
    </x-text>
  </x-layout-cell>
  <x-layout-cell colors=":white_d.1" expanded max-content-width="75%" anchor=":center">
    <x-text block colors=":primeLight" pad="a3">
      Expanded content cells still respect maximum width.  
      <x-box colors=":black" height=".25" />
      This one has a maximum width of 75%.
    </x-text>
  </x-layout-cell>
</x-layout>
```
