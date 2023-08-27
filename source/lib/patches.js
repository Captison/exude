

if (!Object.hasOwn)
{
    Object.hasOwn = (object, property) =>
    {
        return object.hasOwnProperty(property);
    }
}
