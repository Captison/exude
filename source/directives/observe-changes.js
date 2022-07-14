
/**
    Detects changes to child element content.
    
    @see MutationObserver javascript class

    @binding modifiers
      Mutation observer config flags.
    @binding value
      Function is passed observer parameters when mutation detected.
*/
export default
{
    bind(el, { modifiers, value }, { context })
    {
        let handler = (...args) => value(...args);

        context.observer = new MutationObserver(handler);
        context.observer.observe(el, { childList: true, ...modifiers });
    },

    unbind(el, bindings, { context })
    {
        context.observer.disconnect();
    }
}
