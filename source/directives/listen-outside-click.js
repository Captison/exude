
/**
    Detects clicks outside of element.
    
    @binding value
      Function called when outside click detected.
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

        global.document.body.addEventListener('click', context.event);
    },

    unbind(el, bindings, { context })
    {
        global.document.body.removeEventListener('click', context.event);
    }
}
