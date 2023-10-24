
Below are the currently configured colors for this styleguide.

```vue
import lco from '_lco';

let { named } = lco.color, content = '';
let keys = Object.keys(named).filter((n, _, a) => n === 'transparent' || !a.includes(named[n]));

keys.forEach(name =>
{
    let sColorBar =
    `
        background-color: ${named[name]};
        padding: 8px;
        border-radius: 1000px;
        box-shadow: 1px 1px 3px #333333;
    `;
    let sNameTag =
    `
        font-weight: bold;
        text-align: right;
    `;

    content = content + 
    `
        \<div style="${sNameTag}">${name}\</div>
        \<div style="${sColorBar}">\</div>
        \<code>${named[name]}\</code>
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
