var path = require('path');
var paths = require('../../paths');
var packson = require('../../package.json');
var webpackConfig = require('../../build/webpack.config');
var sections = require('./sections');
var theme = require('./theme');


module.exports =
{
    copyCodeButton: true,
    // show from where a prop/slot/event comes from.
    displayOrigins: false,

    getComponentPathLine: p => `import { ${path.basename(p, '.vue')} } from '${packson.name}'`,
    // example files are in same relative location as source files
    getExampleFilename: p => p.replace(paths.components, paths.examples).replace(/\.vue$/, '.md'),

    pagePerSection: true,

    require: [ path.join(paths.guide, 'setup') ],

    sections,

    serverPort: 8450,

    skipComponentsWithoutExample: true,
    // folder for static guide generation
    styleguideDir: paths.docs,
    // add elements to the html page
    template:
    {
        head:
        {
            scripts:
            [
                { src: `https://unpkg.com/vue@${packson.peerDependencies.vue}/dist/vue.min.js` }
            ],
        }
    },
    // customize look and feel
    theme,

    title: packson.title,
    // allow collapse of table of contents
    tocMode: 'collapse',

    verbose: false,

    version: `v${packson.version}`,

    webpackConfig: webpackConfig.dev()
}
