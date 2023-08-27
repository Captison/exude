

if (!Object.hasOwn)
{
    Object.hasOwn = (object, property) =>
    {
        // eslint-disable-next-line no-prototype-builtins
        return object.hasOwnProperty(property);
    }
}
