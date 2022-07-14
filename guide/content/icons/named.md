
Below are the statically configured icons for the styleguide.

```vue
import vars from '_styles/vars'

let { named } = vars.icon;
let content = '';
let style = 'flex-basis:185px;padding:36px 0;text-align:center';
let keys = Object.keys(named).filter((n, _, a) => !a.includes(named[n]));

keys.forEach(name =>
{
    let svg = `<svg viewBox="0 0 24 24" height="48" width="48">${named[name]}</svg>`
    let elem = `<div style="${style}"><div>${svg}</div><div>${name}</div></div>`;
    content = content + elem;
});

<div style="display:flex;flex-wrap:wrap;" v-html="content"></div>
<small>{{ keys.length }} named icons</small>
```
