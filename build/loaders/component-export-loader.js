
module.exports = content =>
{
    let list = [];
    let object = JSON.parse(content);

    Object.keys(object).forEach(key =>
    {
        let { path, released } = object[key];
        // generate export record if component released
        if (released) list.push(`export { default as ${key} } from '${path}'`);
    });

    return list.join('\n');
}
