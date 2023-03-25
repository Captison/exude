
Simple example:

```vue
<x-copy-to-clipboard #default="{ copied }" data="1-2-3-4-5" font="text" h-colors="prime">
  {{ copied ? 'Copied to clipboard!' : 'Copy counting to five' }}
</x-copy-to-clipboard>
```

Note that if your browser does not support this, a copy icon will not display.
