
# Dev Start

Also check out these links:

- [Tasking](tasking.md) - running and managing module tasks
- [Conventions](conventions.md) - coding conventions for this library
- [Building Components](building-components.md) - building and releasing components
- [Styling Configuration](styling-configuration.md) - how the LCO is applied
- [Styleguide](styleguide.md) - how to manage/update the styleguide.


## Developer Environment Setup

1. Clone the repo from https://github.com/Captison/exude.git.

2. Do an `npm install` to get everything working.

3. Run `node task` at command line to see what you can do.

4. Happy coding!


## Publishing A Release

TODO: To be detailed!


## Project Structure

Here's a breakdown of the project directory structure and some important files.

- __`build/`__  
Build configuration files

    - __`loaders/`__  
    Custom webpack loaders

        - __`component-export-loader.js`__  
        Filters components for release

        - __`component-global-loader.js`__  
        Adds global mixin to components

    - __`webpack.config.js`__  
    Webpack build configurations

- __`devdocs/`__  
Developer documentaiton

- __`dist/`__*  
Build generated project artifacts

- __`docs/`__*  
Generated styleguide documentation

- __`guide/`__  
Styleguide documentation source files

    - __`components/`__  
    Component usage examples

    - __`config/`__  
    Styleguidist configuration files

        - __`sections.js`__  
        Styleguide page definitions and menu structure

        - __`theme.js`__  
        Styleguide theming configuration

    - __`content/`__  
    Additional styleguide markdown docs

    - __`data/`__  
    Mock data used in styleguide examples

    - __`setup.js`__  
    Required setup for styleguide build

- __`node_modules/`__*  
Project dependency source code/executables

- __`source/`__  
Project source

    - __`components/`__  
    Source code for all components

    - __`directives/`__  
    Custom Vue directives

    - __`lib/`__  
    Additional project code/configurations

        - __`deps/`__  
        Configurations for 3rd party dependencies

        - __`utils/`__  
        Utility/Helper functions

        - __`browser-info.js`__  
        Mouse tracking for drag-and-drop operations

    - __`mixins/`__  
    Custom Vue mixins

    - __`styles/`__  
    Global style variables and loaders

        - __`loaders/`__  
        CSS property value generation and caching

        - __`vars/`__  
        Static styling variables (Spokes Design)

        - __`reset.js`__  
        Bare bones CSS initializer

    - __`index.js`__  
    Library entry point (all exports)

- __`test/`__  
Project test configuration (follows __/source__ structure)

    - __`jest.config.js`__  
    Jest test framework configuration

- __`.nojekyll`__  
Empty file required for github pages

- __`babel.config.js`__  
Babel transpiler configuration

- __`CHANGELOG.md`__  
Release details log

- __`package.json`__  
Node project configuration

- __`paths.js`__  
Module filepath constants for development

- __`README.md`__  
Repository introduction

- __`task.js`__  
Homemade task runner


## Tech Stack

A rundown of the major dependencies of this UI Library.

technology           | what it does                   | type   | more info
-------------------- | ------------------------------ | ------ | ---------------------------------
babel                | es6+ transpilation             | dev    | http://babeljs.io
color                | color manipulation library     | app    | https://www.npmjs.com/package/color
date-fns             | date manipulation              | app    | https://date-fns.org/
eslint               | js linter                      | dev    | https://eslint.org/
jest                 | test/assertion library         | dev    | https://jestjs.io
node                 | development platform           | dev    | http://nodejs.org
npm                  | dependency manager             | dev    | http://www.npmjs.com
stitches             | css-in-js styler               | app    | https://stitches.dev
vue                  | ui component framework         | peer   | https://vuejs.org
vue-styleguidist     | component documentation tool   | dev    | https://vue-styleguidist.github.io
webpack              | module bundler                 | dev    | http://webpack.js.org
