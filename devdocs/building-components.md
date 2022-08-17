
# Building Components

Here you will find details on how things are organized around building and releasing components.  


## Source Paths

Common module paths are managed in the __/paths.js__ file.  They are used by the build and tasking processes and should not be used directly by any library source code.

Many of these paths, however, are translated into aliases by the build process for use in the library source.  All path aliases are prefixed with an underscore (`_`) to help avoid potential name clashes.

For example:

- `_source`: __/source__
- `_styles`: __/source/styles__

Use these in components and other source files as necessary:

```js
import { styler } from '_source/mixins'
import { color } from '_styles/loaders'
```

For the full list of source path aliases see the __/build/webpack.config.js__ file.


## Baseline Mixin

The `baseline` mixin (__/source/mixins/baseline.js__) is added as the base mixin to every component in this library.  This is done during the build process using a custom loader (__/build/loaders/component-global-loader.js__ ) rather than as a direct dependency in component definition files.

The `baseline` mixin provides a few features to the components...

__Component Options:__  

- `exude` (boolean):  
Set to `true` to identify as an Exude component.  May be useful for debugging.

- `inheritAttrs` (boolean):  
Set to `false` to prevent automatic inheritance of attributes.  The convention of this library is handle attribute passing manually.

__Instance Properties:__  

- `$hearers` (object):  
A copy of `$listeners` for the component instance.

- `$htmlId` (string):  
A string suitable for use as an HTML `id` attribute.  This is guaranteed to be unique for each component instance.


## Component Registry

In order for a component to be released (externally accessible from the library), it must be added to the __/source/components/registry.json__ file.  This JSON file includes release information on each component and is read by the webpack build to determine which components to export.

An example release record:

```json
{
    "XAwesomeIcon": 
    { 
        "path": "_components/icons/XAwesomeIcon", 
        "released": true
    }
}
```

Records in the file can include the following:

- `path` (string):  
Path to the component. This is required as it lets the build process know where to find the component to export (the webpack build maps the `_components` path segment to __/source/components__ for convenience).

- `released` (boolean):  
This must be set to `true` for the component to be exported.

The component is exported under the name of the release record itself (`XAwesomeIcon` in the above example) using the custom webpack loader, __/build/loaders/component-export-loader.js__.

After publishing, the component can be imported like so:

```js
import { XAwesomeIcon } from 'exude'
```
