
# Coding Conventions

Please follow the below guidelines for creating/editing components.


## Naming Components

Use `kebab-case` for component category folder names.

Use `PascalCase.vue` for component file names.  Component names should start with a `X`, so let's revise that to `WPascalCase.vue`.


## Code Style

For single-file components (SFCs) always place `<template>` section above `<script>`.

```vue
<template>
  <div>hello, vue!</div>
</template>

<script>
export default
{
    name: 'WMyComponent',
}
</script>
```

No `<style>` section need appear in the file.

Component options should generally appear in the following order:

```js
export default
{
    name: '',
    mixins: [],
    components: {},
    props: {},
    emits: {},
    data() {},
    LIFECYCLE_METHODS() {}, // created, mounted, updated, etc.
    computed: {},
    watch: {},
    methods: {},
    stylesheet() {} // for static styling elements
}
```

Instead of using `provide` and `inject` options directly, use the `context` mixin.


## Documentation

Vue Styleguidist parses Vue components looking for content to add to the documentation.

The example below demonstrates how to properly document various elements of a component for the Styleguide.

```vue
<template>
  <a v-bind="$attrs" @click="handleClick">
    <!--
        @slot link content
        @binding { string } color
          Provide color name to slot content.
    -->
    <slot :color="color"></slot>
  </a>
</template>

<script>
/**
    Renders an HTML anchor tag.
*/
export default
{
    name: 'WAnchor',

    props:
    {
        /**
            Link color.
            @values blue, brown, green
        */
        color: String
    },

    methods:
    {
        handleClick(evt)
        {
            /**
                On anchor click.
                @param { object } evt
                  Event object.
            */
            this.$emit('click', evt);
        }
    }
}
</script>
```


## Additional Conventions

Other conventions followed by this library:

- HTML/Vue template code is indented by 2 spaces and javascript code is indented by 4 spaces.

- Opening and closing braces in javascript code are always on separate lines, unless both opening and closing braces can be on the same line.

- Maximum 120 chars per line for code files.

- Use only variables or simple expressions in tag properties.  To avoid messy templates, `computed` or `methods` component options are used for more complex calculations.
