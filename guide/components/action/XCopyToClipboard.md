
Simple example:

```vue
let o = { count: 0, action: () => (o.count++, setTimeout(() => o.count--, 2500)) }

<x-copy-to-clipboard data="1-2-3-4-5" font="text" h-colors="prime" @copied="o.action" />
<x-text> {{ o.count > 0 ? `Copied to clipboard! (${o.count})` : 'Copy counting to five' }} </x-text>
```

Note that if your browser does not support this, a copy icon will not display.
