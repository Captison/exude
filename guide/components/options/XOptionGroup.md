
Basic option group:

```vue
let value = null;

<x-option-group 
  :value.sync="value"
  colors=":primeLight" 
  sel-colors=":secondLight" 
  h-colors="white:primeDark" 
  sel-h-colors=":secondLight" 
  pad="v3" 
  margin="v1"
>
  <x-flex invert width="60">
    <x-option data="Clay Nation" />
    <x-option data="Safari Squad" />
    <x-option data="The Ape Society" />
    <x-option data="Spacebudz" />
    <x-option data="Chilled Kongs" />
    <x-option data="Boss Cat Rocket Club" />
  </x-flex>
</x-option-group>
```

Radio and checkbox menu examples:

```vue
let value1 = null, value2 = null;
let data =
{
    coke: 'Coke',
    rootbeer: 'A&W Root Beer',
    sprite: 'Sprite',
    drpepper: 'Dr. Pepper',
    mountain: 'Mountain Dew',
    orange: 'Orange Crush',
    incacola: 'Inca Cola',
}

<x-box display="inline-block" border="a.25!second" width="60" margin="r2">
  <x-option-group :value.sync="value1" h-colors=":secondLight" align="left" pad="v3 h4">
    <x-flex invert>
      <x-option v-for="(val, key) in data" #default="{ selected }" :key="key">
        <x-icon :name="selected ? 'radio' : 'radioEmpty'" align-v="middle" margin="r1" /> {{ val }}
      </x-option>    
    </x-flex>
  </x-option-group>
</x-box>

<x-box display="inline-block" border="a.25!second" width="60">
  <x-option-group :value.sync="value2" h-colors=":secondLight" multi align="left" pad="v3 h4">
    <x-flex invert>
      <x-option v-for="(val, key) in data" #default="{ selected }" :key="key">
        <x-icon :name="selected ? 'check' : 'checkEmpty'" align-v="middle" margin="r1" /> {{ val }}
      </x-option>    
    </x-flex>
  </x-option-group>
</x-box>
```
