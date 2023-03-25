import { dom } from './utils'


/**
    Mouse Info
    ---------------------------------------------------------------------------
    - track current mouse position on page
*/
let mouse = { pageX: 0, pageY: 0 };

let onMousemove = event =>
{
    mouse.pageX = event.pageX;
    mouse.pageY = event.pageY;    
}

dom.addDocumentListener('mousemove', onMousemove);
dom.addDocumentListener('dragover', onMousemove);



/**
    Clipboard Access
    ---------------------------------------------------------------------------
*/
let execCopy = accept => 
{
    navigator.permissions.query({ name: 'clipboard-write' })
      .then(r => accept(r.state == 'granted' || r.state == 'prompt'));    
}
let canCopy = new Promise(execCopy).catch(() => false);

let clipboard = 
{
    check: () => canCopy,
    copyTo: data => navigator.clipboard.writeText(data)
};



export { clipboard, mouse };
