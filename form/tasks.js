var { ESLint } = require('eslint');
var config = require('./eslint.config');
var paths = require('../paths');


module.exports =
[
    {
        name: 'lint-code',
        desc: 'Lint the codebase for potential errors.',
        fn: ({ exit, log }) =>
        {
            var eslint = new ESLint({ extensions: [ '.js', '.vue' ], overrideConfig: config });
                        
            eslint.lintFiles(paths.source).then(results => 
            {
                return eslint.loadFormatter("stylish").then(formatter => 
                {
                    log(formatter.format(results)); 
                    exit();
                });
            })
            .catch(error => 
            {
                log(error);
                exit(1);
            });
        }
    }
]
