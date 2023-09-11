
/**
    Layout related CSS properties.
    
    Classes: `align`, `space`
    
    @requires styler
*/
export default
{
    aliases: [ 'align', 'space' ],
  
    props:
    {
        /**
            CSS alignment values (`text-align:vertical-align`).
        */
        align: String,
        /**
            CSS white-space value.
        */
        space: String,
    },
    
    computed:
    {
        alignCss() 
        {
            let align = {};
            let [ texta, verta ] = (this.align || '').split(/:/);
            
            if (texta) align.textAlign = texta;
            if (verta) align.verticalAlign = verta;
            
            return align; 
        },
                
        spaceCss() { return this.space && { whiteSpace: this.space }; }        
    }
}
