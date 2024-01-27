import cssm from '_css/mapper'


/**
    CSS perspective related properties.
    
    Classes: `pers`, `hideBack`
    
    @requires styler
*/
export default
{
    aliases: [ 'perspective', 'hideBack' ],
  
    props:
    {
        /**
            Is the back of this box hidden from view (CSS backface-visibility)?
        */
        hideBack: Boolean,
        /**
            Colon-separated CSS perspective and perspective-origin values.
        */
        pers: String
    },
    
    computed:
    {
        hideBackCss() { return cssm.hideBack(this.hideBack); },
        
        perspectiveCss() { return cssm.perspective(this.pers); }
    }
}
