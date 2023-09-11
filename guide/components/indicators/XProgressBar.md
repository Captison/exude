
Progress bars:

```vue
<x-text block pad="a1 t0">no progress</x-text>
<x-progress-bar colors=":white_d.15" :progress="0" />
<x-text block pad="a1 t2">25% progress</x-text>
<x-progress-bar colors=":white_d.15" :progress="0.25" />
<x-text block pad="a1 t2">75% progress</x-text>
<x-progress-bar colors=":white_d.15" :progress="0.75" />
<x-text block pad="a1 t2">100% progress</x-text>
<x-progress-bar colors=":white_d.15" :progress="1" />
```

Progress bar demo:

```vue
let value = 0;

<x-progress-bar colors="prime:white_d.15" :height="3" radius="a3" :progress="value / 100" />

<br />
<x-text block margin="t2">
  <span v-for="n in 6">
    &nbsp; <x-link @click="value = (n-1)*20">{{ (n-1)*20 }}%</x-link> &nbsp;
  </span>
</x-text>
```

Progress forever:

```vue
<x-progress-bar colors="terti" continuous />
```
