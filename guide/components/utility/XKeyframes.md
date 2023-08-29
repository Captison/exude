
Use `frame` children for each keyframe definition.  
- use `at` attrbute to specify keyframe position
- all other attributes are assumed to be CSS property definitions

Example:

```html static
<x-keyframes name="slide">
  <frame at="0%" background-position="0% 50%" />  
  <frame at="50%" background-position="100% 50%" />  
  <frame at="100%" background-position="0% 50%" />  
</x-keyframes>
```

The above template code would generate the following markup (formatted for clarity):

```html static
<style>
@keyframes slide 
{ 
    0% { background-position: 0% 50%; } 
    50% { background-position: 100% 50%; } 
    100% { background-position: 0% 50%; } 
} 
</style>
```
