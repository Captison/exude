
module.exports =
{
    presets: 
    [ 
        [ "@babel/preset-env", { targets: { browsers: ['last 2 versions'] } } ] 
    ],
    
    plugins: 
    [ 
        // [ "@babel/plugin-proposal-decorators", { legacy: true } ],
        // [ "@babel/plugin-proposal-class-properties", { loose: true } ],
        [ "import-glob" ]
    ],
    
    compact: false
}
