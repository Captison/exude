
/**
    Adds a global document listener.

    @param { string } type
      Name of the event to listen for.
    @param { function } listener
      Event handler.
*/
export default function addDocumentListener(type, listener)
{
    global.document.addEventListener(type, listener, { capture: true, passive: true });
}
