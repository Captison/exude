var path = require('path');
var packson = require('./package.json');


exports.root = path.join(__dirname);
exports.dist = path.join(exports.root, ...packson.main.split(/\//).slice(0, -1));  
exports.sub = (...base) => (...segs) => path.join(...base, ...segs)

var paths =
{
    build: ['build'],
    components: ['source', 'components'],
    dist: ['dist'],
    docs: ['docs'],
    examples: ['guide', 'components'],
    guide: ['guide'],
    mixins: ['source', 'mixins'],
    modules: ['node_modules'],
    source: ['source'],
    test: ['test']
};

for (name in paths) exports[name] = path.join(exports.root, ...paths[name]);
