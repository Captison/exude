
Simple example:

```vue
let data = 'Copy this sentence.', copied = false;

<x-copy-to-clipboard :data="data" align=":middle" h-colors="prime" @copied="copied = $event" />
<x-text> {{ copied ? 'Copied to clipboard!' : data }} </x-text>
```

Note that if your browser does not support this, a copy icon will not display.
