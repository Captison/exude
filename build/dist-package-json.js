var packson = require('../package.json');


/**
    Export custom package.json file for publishing.
*/
let { devDependencies, scripts, taskFiles, ...others } = packson;

module.exports =
{
    ...others,
    main: packson.main.split(/\//).slice(-1)[0]
}
