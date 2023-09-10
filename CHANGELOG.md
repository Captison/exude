# Exude Change Log

## Notes

- __Vue 2.7 bug__  
There is currently a bug in Vue 2.7.x that prevents a "dragend" event from firing after a successful "drop".


## To Dos

features:
- parallax scrolling features
- web3 wallet features
- library CSS tool (CSS-in-JS) agnostic
- library theme support

bugs:
- styleguide custom elements not working
- XDropZone "extra-space' issue

tasks:
- write tests for all utils & loaders
- add examples for components missing them
- add documentation for provide/inject context handling
- allow change of CSS reset
- remove styleguide dependency on 'dark' and 'light' colors
- object-fit/position for replaced elements (mixin)


---
## v0.0.8

- `XProgressBar` added
- refactor of `XBox`, `XFlex`, `XGrid`, `XText` to mixins
- `XBox`, `XFlex`, `XGrid`, `XText` lose ability to pull extensions from LOC
- `XApp` uses id attribute from `baseline` mixin
- `XIcon` uses new CSS mixins
- `XExapse` sets a default transition (`XDropMenu` requires this to work properly)
- `XButton` structure simplified
- `XImage` supports CSS object fit and positioning
- `object` mixin added to support object-fit/position CSS values
- `position` style loader added to handle shorthand position values
- `component-global-loader` collects CSS aliases for components
- `$htmlId` in `baseline` mixin gets namespaced
- `enumer`, `selector` style loaders added
- `extend` style loader can extend existing object
- `chooser` mixin deleted
- `boxe` style loader deleted


## v0.0.7

- `XCopyToClipboard` now handles notification timing internally
- `XColor` color picker component added


## v0.0.6

- `XDestyler` added
- `XSkeleton` uses internal `XKeyframes` for animation
- `XImage` adds support for loading and failing states
- `XKeyframes` moved to utilities
- `extend` style loader now supports any CSS selector
- `to-degrees` style loader added


## v0.0.5

- `observe-intersection` dom util added
- `observe-viewport-intersection` directive added
- `XLister` simplified
- input debounce for form controls updated
- `form-field` mixin emits `update:value` even when group controlled
- `equals` util added (object compare)
- `filter` util adds `list` and `iterate` methods
- `patches` file added (patches Object.hasOwn for old browsers)
- `debounce` util adds immediate execution for negative wait time


## v0.0.4

- added `XFieldset` for grouping form controls (object)
- added `XFieldList` for listing form controls (array)
- added `XLister` for listing/filtering array data
- added `XChoose` form control wrapper for `XOptionGroup`
- `XBackground` now interpolates `image` attribute
- `form-field` mixin updates to accomodate new form controls
- `XCheckbox` allows for custom icons
- fix field update failure bug in `XInput`, `XTextara` 
- `XDropMenu` simplified
- added `filter` and `require-context-map` utilities
- debounce timeout added to `form-field` mixin
- `inject` interpolation style loader added
- new icons and mock data added for styleguide
- css reset adds fieldset styles
- css reset forces form controls to inherit color


## v0.0.3

- `XIcon` adds `minSize` and `maxSize` props
- added `length` style loader for general purpose enumerated lengths in LCO
- several components, mixins, loaders updated to use `length`
- 'button' section removed from LCO


## v0.0.1

- initial release!
