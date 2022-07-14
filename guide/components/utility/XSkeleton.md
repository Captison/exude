
Basic skeleton (code example):

```html static
<x-skeleton>
  <x-text font="h1" data-x-bone> Sharp Skeletor </x-text>
<x-skeleton>
```

Normally, bones will try to mimic the shapes of the target elements.  However, you can provide a `radius` parameter to force a border radius if needed.

Rounded skeleton (code example):

```html static
<x-skeleton>
  <x-text font="h1" data-x-bone="radius"> Smooth Skeletor </x-text>
<x-skeleton>
```

Skeleton demo:

```vue
let skeletize = false, zombify = true;

<x-skeleton :skeletize="skeletize" :zombify="zombify">
  <x-text block font="h3" margin="b1" data-x-bone="radius">
    A.1. Dictum accumsan urna et nunc hendrerit malesuada feugiat.
  </x-text>
  <x-flex invert border="l3!prime!dotted" margin="b6 l3" pad="l3">
    <x-text bold font="h5" radius="a1000">
      Use the controls below to demo skeleton loading.
    </x-text>
    <x-text block margin="t1" data-x-bone="radius">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </x-text>
  </x-flex>
  <x-box height="0.25" colors=":prime" margin="t2 b4" />
  <x-grid inline cols="auto auto auto" place-content="center">
    <x-button colors="white:primeDark" radius="a2" pad="v2 h3" @click="skeletize = false">
      Hide Skeleton 
    </x-button>
    <x-button colors="white:tertiDark" margin="l2" radius="a2" pad="v2 h3" data-x-bone @click="skeletize = true">
      Show Skeleton 
    </x-button>
    <x-text el="label" margin="v2 h3">
      <x-checkbox :value.sync="zombify" align=":bottom" /> Animate
    </x-text>
  </x-grid>
</x-skeleton>
```

Multiline inline elements do not "skeletize" well.  Resize the browser window when testing your implementation to be sure you get what you expect.
