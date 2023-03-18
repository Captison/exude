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

    'h1,h2,h3,h4,h5,h6,pre,code,p':
    {
        fontSize: '1em',
    },

    'ul,ol,dl,li,dt,dd,td,th,h1,h2,h3,h4,h5,h6,hr,pre,form,body,html,p,blockquote,fieldset,input,button':
    {
        padding: 0,
        margin: 0,
    },

    'input,textarea,button':
    {
        background: 'none',
        border: 'none',
        outline: 'none',
    },
        
    'a img,:link img,:visited img':
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
