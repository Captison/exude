var paths = require('../paths');


var test = paths.sub(paths.test);

module.exports =
[
    {
        name: 'exec-tests',
        desc: 'Run unit and component tests.',
        fn: ({ exit, run }) =>
        {
            var params = [ 'jest', '--config', test('jest.config.js') ];

            run.npx(params).on('close', exit);
        }
    }
]
