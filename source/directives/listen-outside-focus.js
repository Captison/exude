
/**
    Detects focus change outside of element.
    
    @binding value
      Function called when outside focus change detected.
*/
export default
{
    bind(el, { value }, { context })
    {
        context.event = event =>
        {
            if (el === event.target || !el.contains(event.target))
                value();
        };

        global.document.body.addEventListener('focusin', context.event);
    },

    unbind(el, bindings, { context })
    {
        global.document.body.removeEventListener('focusin', context.event);
    }
}
