
Link as `<a>`:

```vue
<x-text>
  Let's visit the <x-link href="//www.spartanlabs.com" target="_blank">Spartan Labs</x-link> website.
</x-text>
```

Link as `<button>`:

```vue
let value = false;
let intro = 'If the cheese doesn\'t belong to you...';
let punch = 'It\'s nacho cheese!';

<x-link @click="value = !value">
  {{ value ? punch : intro }}
</x-link>
```
