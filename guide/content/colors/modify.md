
You can use the color names and aliases in properties of components in this library that accept color values.

In addition, a defined color can be modified when passed to a component property.  This is done by appending one or more elements of the form `_XA` to the color name or alias.

In each `_XA` modifier `X` can be the letter

  - __`b`__ to blacken the color
  - __`d`__ to darken the color
  - __`f`__ to fade the color
  - __`g`__ to grayscale the color
  - __`l`__ to lighten the color
  - __`n`__ to negate the color
  - __`o`__ to opaquer the color
  - __`r`__ to rotate the color
  - __`s`__ to saturate the color
  - __`u`__ to desaturate the color
  - __`w`__ to whiten the color

and `A` is an optional numerical parameter for the function.

Note that __`g`__ and __`n`__ functions do not accept a parameter.

Examples of manipulating `prime` color:

```vue
import vars from '_styles/vars';
import { color } from '_styles/loaders';

let defs = 
{
    'not modified': 'prime',
    'lighten 20%': 'prime_l.2',
    'lighten 40%': 'prime_l.4',
    'lighten 60%': 'prime_l.6',
    'lighten 80%': 'prime_l.8',
    'rotate 15deg': 'prime_r15',
    'rotate 30deg': 'prime_r30',
    'rotate 45deg': 'prime_r45',
    'rotate 60deg': 'prime_r60',
    'rotate -90deg': 'prime_r-90',
    'rotate -90deg and lighten 60%': 'prime_r-90_l.6',
    'negate': 'prime_n',
    'grayscale': 'prime_g',
};

let content = '';

Object.keys(defs).forEach(name =>
{
    let sColorBar =
    `
        background-color: ${color(defs[name])};
        color: white;
        padding: 0 12px;
        border-radius: 1000px;
        box-shadow: 1px 1px 3px #333333;
        text-shadow: 1px 1px 2px black;
    `;
    let sTag =
    `
        font-weight: bold;
        text-align: right;
    `;

    content = content + 
    `
        \<code style="${sTag}">${defs[name]}\</code>
        \<div style="${sColorBar}">
          \<div>${name}\</div>
        \</div>
        \<div>\</div>
    `;
});

let grid =
`
    display: grid;
    grid-template-columns: auto 40% auto;
    column-gap: 12px;
    row-gap: 8px;
    justify-content: start;
`;

<div :style="grid" v-html="content"></div>
```
