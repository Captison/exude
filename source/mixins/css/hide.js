
/**
    Visibility CSS property.
    
    Classes: `hide`
    
    @requires styler
*/
export default
{  
    aliases: [ 'hide' ],
  
    props:
    {
        /**
            Is this element hidden from view (CSS visibility)?
        */
        hide: Boolean
    },
    
    computed:
    {
        hideCss() { return this.hide && { visibility: 'hidden' }; }      
    }
}
