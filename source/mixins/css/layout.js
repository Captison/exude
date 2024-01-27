import cssm from '_css/mapper'


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
        alignCss() { return cssm.alignment(this.align); },
                
        spaceCss() { return cssm.whiteSpace(this.space); }        
    }
}
