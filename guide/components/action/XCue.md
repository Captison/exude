
Basic cue:

```vue
let open = false;

<x-cue :open.sync="open" />
```

Fancy cues:

```vue
let open = false, open2 = false;

<x-cue inline :open.sync="open" :size="10" h-colors="terti:secondLight" />
<x-cue inline :open.sync="open2" :size="10" radius="a50%" h-colors="terti:secondLight" />
```
