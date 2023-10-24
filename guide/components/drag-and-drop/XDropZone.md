
Drop zone:

```
let items = [ 'Spanish', 'Japanese', 'Russian', 'French', 'German' ];

<x-drop-zone #default="{ payload }" inline :items.sync="items" item-margin="h1">
  <x-text block bold border="a.1!prime" pad="a2" width="34" radius="a1.5">
    <x-drag-handle align=":middle" display="inline-block" margin="r2">
      <x-icon name="menu" colors="primeDark" />
    </x-drag-handle>
    {{ payload }}
  </x-text>
</x-drop-zone>
```

Drop zone item sharing:

```
let items1 = [ 'Cardano', 'Zcash', 'Chainlink', 'Theta' ];
let items2 = [ 'Litecoin', 'VeChain', 'Tezos', 'Cosmos' ];
let items3 = [ 'Cardano', 'Dash', 'Polkadot', 'Stellar' ];
let items4 = [ 'Zilliqa', 'Monero', 'Algorand', 'VeChain' ];

<x-drag-yard inline align="center" margin="a3" :min-width="40" :max-width="50" ind-outline=".5:prime:dashed:1">

    <x-drop-zone #default="{ payload }" invert :items.sync="items1">
      <x-text block font="h4" colors=":tertiLight" pad="a2">
        {{ payload }}
      </x-text>
    </x-drop-zone>

    <x-drop-zone #default="{ payload }" invert :items.sync="items2">
      <x-text block font="h4" colors=":primeLight" pad="a2">
        {{ payload }}
      </x-text>
    </x-drop-zone>

    <x-drop-zone #default="{ payload }" invert :items.sync="items3">
      <x-text block font="h4" colors=":secondLight" pad="a2">
        {{ payload }}
      </x-text>
    </x-drop-zone>

    <x-drop-zone #default="{ payload }" invert :items.sync="items4">
      <x-text block font="h4" colors=":tertiLight" pad="a2">
        {{ payload }}
      </x-text>
    </x-drop-zone>

</x-drag-yard>
```
