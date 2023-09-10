
Adding content with pseudo-classes:

```vue
<x-text block font="h3" colors="prime" pad="a2">
  <div>
    Me? I am in the middle.
  </div>
  <e-stylesheet sel="&::after" colors="terti" content="This dude comes after." />
  <e-stylesheet sel="&::before" content="This dude comes before." />
</x-text>
```

Adding color to a box:

```vue
<x-text display="inlin-block" pad="v1 h2">
  <span> Some text. </span>
  <e-colors colors="white:prime" />
</x-text>
```

Some fun grid styling:

```vue
<x-flex inline wrap align="center" colors="white" size="100">
  
  <e-stylesheet sel="div" font="h1" size="20%" trans="rz-45" />
  <e-stylesheet sel="div:nth-child(odd)" colors="prime" />
  <e-stylesheet sel="div:nth-child(even)" colors=":prime" />
  
  <div v-for="n of 25"> {{ String.fromCharCode(n+97) }} </div>
</x-flex>
```
