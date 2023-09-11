
A progress bar of indefinite time:

```vue
<x-keyframes name="one">
  <frame at="0%" left="0%" right="100%" />
  <frame at="40%" left="30%" right="35%" />
  <frame at="65%" left="65%" right="0%" />
  <frame at="90%" left="100%" right="0%" />
</x-keyframes>

<x-keyframes name="two">
  <frame at="0%" left="0%" right="100%" />
  <frame at="15%" left="0%" />
  <frame at="45%" right="0%" />
  <frame at="60%" left="100%" right="0%" />
</x-keyframes>

<x-box colors=":prime" border="a.5!prime" pos="relative" height="3" radius="a100" width="80%">
  <x-box colors=":white" pos="absolute" height="100%" radius="ainherit">
    <e-animation name="one" duration="2.4" timing="linear" repeat="infinite" />
  </x-box>
  <x-box colors=":white" pos="absolute" height="100%" radius="ainherit">
    <e-animation name="two" delay="1.8" duration="2.4" timing="ease" repeat="infinite" />
  </x-box>
</x-box>
```
