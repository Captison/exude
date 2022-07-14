
/**
    Returns the computed value of a CSS style property for a given element.
    
    If a property `name` is not specified, the CSSStyleDeclaration object is returned.
    
    @param { element } node
      Target element.
    @param { element } name
      Property name.
    @return { any }
      Value of the propery or style object.
*/
export default function(node, name)
{
    let retval = global.getComputedStyle(node);
    
    if (name) retval = retval.getPropertyValue(name);
    
    return retval;
}
