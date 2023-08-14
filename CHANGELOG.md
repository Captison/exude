# Exude Change Log

## Notes

- __Vue 2.7 bug__  
There is currently a bug in Vue 2.7.x that prevents a "dragend" event from firing after a successful "drop".


## To Dos

features:
- parallax scrolling features
- web3 wallet features
- library CSS tool (CSS-in-JS) agnostic

bugs:

tasks:
- write tests for all utils & loaders
- add examples for components missing them
- add documentation for provide/inject context handling
- allow change of CSS reset


---
## v0.0.4

- added `XFieldset` for grouping form controls (object)
- added `XFieldList` for listing form controls (array)
- added `XFilter` for filtering array data
- `form-field` mixin updates to accomodate new form controls
- `XCheckbox` allows for custom icons
- fix field update failure bug in `XInput`, `XTextara` 
- added `filter` and `require-context-map` utilities
- new icons and mock data added for styleguide
- css reset adds fieldset styles


## v0.0.3

- `XIcon` adds `minSize` and `maxSize` props
- added `length` style loader for general purpose enumerated lengths in LCO
- several components, mixins, loaders updated to use `length`
- 'button' section removed from LCO


## v0.0.1

- initial release!
