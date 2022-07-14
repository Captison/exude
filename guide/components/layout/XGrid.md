
Gapped inline grid:

```vue
<x-text font="h1" colors=":primeLight" pad="h4" sel="> div > div">
  <x-grid inline align="center" cols="1fr 1fr 1fr" gap="1:1">
    <div>A</div>
    <div>B</div>
    <div>C</div>
    <div>D</div>
    <div>E</div>
    <div>F</div>
    <div>G</div>
    <div>H</div>
    <div>I</div>
  </x-grid>
</x-text>
```

Grid with circular cells repositioned:

```vue
<x-text font="h1" pad="h4" radius="a100" sel="> div > div">
  <x-grid inline align="center" cols="1fr 1fr 1fr">
    <div>A</div>
    <x-box colors=":tertiLight" area="2/1">B</x-box>
    <div>C</div>
    <x-box colors=":tertiLight" area="3/2">D</x-box>
    <div>E</div>
    <x-box colors=":tertiLight" area="1/2">F</x-box>
    <div>G</div>
    <x-box colors=":tertiLight" area="2/3">H</x-box>
    <div>I</div>
  </x-grid>
</x-text>
```
