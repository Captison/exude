import ResizeObserver from 'resize-observer-polyfill';


/**
    Detects changes to element dimensions via ResizeObserver polyfill.
    
    @see ResizeObserver javascript class

    @binding value
      Function is passed observer parameters when element resizing detected.
*/
export default
{
    bind(el, { value }, { context })
    {
        let handler = (...args) => value(...args);

        context.observer = new ResizeObserver(handler);
        context.observer.observe(el, { box: 'border-box' });
    },

    unbind(el, bindings, { context })
    {
        context.observer.disconnect();
    }
}
