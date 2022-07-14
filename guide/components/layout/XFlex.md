Flex alignment and justification demo:

```vue
let alignItems = 'flex-start';
let justify = 'flex-start';
let props = { block: true, pad: 'v3 h4', width: 30 };

<x-flex align="center" :aligns="`:${alignItems}:${justify}`">
  <x-text v-bind="props" font="text" colors=":prime"> Pine </x-text>
  <x-text v-bind="props" font="h4" colors=":primeLight"> Cedar </x-text>
  <x-text v-bind="props" font="h2" colors=":prime"> Fir </x-text>
  <x-text v-bind="props" font="h4" colors=":primeLight"> Oak </x-text>
  <x-text v-bind="props" font="text" colors=":prime"> Elm </x-text>
</x-flex>

<ctrls>
  <grp label="align-items">
    <opt value="flex-start" :data.sync="alignItems" />
    <opt value="flex-end" :data.sync="alignItems" />
    <opt value="center" :data.sync="alignItems" />
    <opt value="stretch" :data.sync="alignItems" />
    <opt value="baseline" :data.sync="alignItems" />
  </grp>
  <grp label="justify-content">
    <opt value="flex-start" :data.sync="justify" />
    <opt value="flex-end" :data.sync="justify" />
    <opt value="center" :data.sync="justify" />
    <opt value="space-between" :data.sync="justify" />
    <opt value="space-around" :data.sync="justify" />
    <opt value="space-evenly" :data.sync="justify" />
  </grp>
</ctrls>
```

Flex wrap with gaps:

```vue
<x-flex align="center" colors="white" width="64" wrap gap="2:2">
  <x-text font="h1" width="20" colors=":prime"> R </x-text>
  <x-text font="h1" width="20" colors=":primeLight"> S </x-text>
  <x-text font="h1" width="20" colors=":prime"> T </x-text>
  <x-text font="h1" width="20" colors=":primeLight"> U </x-text>
  <x-text font="h1" width="20" colors=":prime"> V </x-text>
  <x-text font="h1" width="20" colors=":primeLight"> W </x-text>
  <x-text font="h1" width="20" colors=":prime"> X </x-text>
  <x-text font="h1" width="20" colors=":primeLight"> Y </x-text>
  <x-text font="h1" width="20" colors=":prime"> Z </x-text>
</x-flex>
```
