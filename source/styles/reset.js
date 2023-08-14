/**
    CSS Reset (originally from Tantek)
    ----------------------------------------
*/
export default
{
    body:
    {
        minHeight: '100vh',
    },
  
    ':link,:visited':
    {
        textDecoration: 'none',
    },

    'ul,ol':
    {
        listStyle: 'none',
    },

    'code,h1,h2,h3,h4,h5,h6,p,pre':
    {
        fontSize: '1em',
    },

    'blockquote,body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,html,input,legend,li,ol,p,pre,td,th,ul':
    {
        padding: 0,
        margin: 0,
    },

    'input,textarea,button':
    {
        background: 'none',
        border: 'none',
        font: 'inherit',
        outline: 'none',
    },
        
    'a img,:link img,:visited img, fieldset':
    {
        border: 'none',
    },

    address:
    {
        fontStyle: 'normal',
    },

    svg:
    {
        fill: 'currentColor',
    }
}
