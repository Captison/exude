var chalk = require("chalk");
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var paths = require('../paths');
var packson = require('../package.json');


module.exports =
[
    {
        name: 'build-dev',
        desc: `Bundle for development (${chalk.whiteBright(packson.main)}).`,
        fn: ({ exit, log }) =>
        {
            var config = webpackConfig.dev();

            webpack(config, (error, stats) =>
            {
                if (error) throw error;
                log(stats.toString(config.stats));
                exit();
            });
        }
    },
    {
        name: 'build-prod',
        desc: `Bundle for production (${chalk.whiteBright(packson.main)}).`,
        fn: ({ exit, run }) =>
        {
            var webpackCfgPath = path.join(paths.build, 'webpack.config.js');
            var params = [ 'webpack', '--config', `"${webpackCfgPath}"`, '--env', 'prod' ];

            run.npx(params, { NODE_ENV: 'production' }).on('close', exit);
        }
    },
    {
        name: 'watch-dev',
        desc: 'Bundle and serve hot for development.',
        fn: ({ log }) =>
        {
            var config = webpackConfig.dev({ watch: true });

            webpack(config, (error, stats) =>
            {
                if (error) throw error;
                log(stats.toString(config.stats));
            });
        }
    }
]
