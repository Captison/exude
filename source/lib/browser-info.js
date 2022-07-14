
function addDocumentListener(type, listener)
{
    global.document.addEventListener(type, listener, { capture: true, passive: true });
}

/**
    Browser info object.
*/
let binfo =
{
    pageX: 0,
    pageY: 0
};


let onMousemove = event =>
{
    let { pageX, pageY } = event;
    
    binfo.pageX = pageX;
    binfo.pageY = pageY;    
}

addDocumentListener('mousemove', onMousemove);
addDocumentListener('dragover', onMousemove);

export default binfo;
