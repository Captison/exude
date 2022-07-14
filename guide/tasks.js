var chalk = require("chalk");
var path = require('path');
var paths = require('../paths');
var guideConfig = require('./config');


var configPath = path.join(paths.guide, 'config', 'index.js');
var docServerURL = chalk.whiteBright(`http://localhost:${guideConfig.serverPort}`);

module.exports =
[
    {
        name: 'build-guide',
        desc: 'Build styleguide documentation.',
        fn: ({ exit, run }) =>
        {
            var vars =
            {
                NODE_OPTIONS: '--unhandled-rejections=strict',
            };
            var params = ['vue-styleguidist', 'build', '--config', configPath];
            run.npx(params, vars).on('close', exit);
        }
    },
    {
        name: 'serve-guide',
        desc: `Start styleguide documentation server at ${docServerURL}.`,
        fn: ({ exit, run }) =>
        {
            var params = ['vue-styleguidist', 'server', '--config', configPath];
            run.npx(params).on('close', exit);
        }
    }
]
