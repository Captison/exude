var path = require('path');
var { VueLoaderPlugin } = require('vue-loader');
var paths = require('../paths');
var packson = require('../package.json');


// library name from package.json
var libname = packson.main.split(/\//).slice(-1)[0].split(/\./)[0];
// subpath handler for source folder
var source = paths.sub(paths.source);

var base =
{
    stats: { colors: true, builtAt: true, env: true, version: true },

    entry:
    {
        [libname]: source('index.js')
    },

    output:
    {
        path: paths.dist,
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    resolve:
    {
        alias:
        {
            _assets: source('assets'),
            _components: paths.components,
            _root: paths.root,
            _lib: source('lib'),
            _source: paths.source,
            _styles: source('styles')
        },
        extensions: [ '.js', '.svg', '.vue' ]
    },

    resolveLoader:
    {
        alias:
        {
            'component-export-loader': require.resolve('./loaders/component-export-loader'),
            'component-global-loader': require.resolve('./loaders/component-global-loader'),
        }
    },

    module:
    {
        rules:
        [
            // specialized json import
            {
                type: 'javascript/auto',
                test: /registry.json$/,
                issuer: /\.registry.js$/,
                use: [ 'babel-loader', 'component-export-loader' ]
            },
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.vue$/, use: [ 'vue-loader', 'component-global-loader' ] },
            { test: /\.svg$/, use: 'raw-loader' },
        ]
    },

    plugins:
    [
        new VueLoaderPlugin()
    ]
}


/*
    Environment configurations
*/
var config = (env = 'dev') => config[env]();

config.dev = other =>
{
    var config =
    {
        mode: 'development'
    }

    return { ...base, ...config, ...other };
}

config.prod = other =>
{
    var config =
    {
        mode: 'production',
        stats: { ...base.stats, modules: true, maxModules: 10000 }
    }

    return { ...base, ...config, ...other };
}


module.exports = config;
