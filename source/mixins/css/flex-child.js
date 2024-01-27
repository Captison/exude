import cssm from '_css/mapper'


/**
    Flex child CSS properties.
    
    Classes: `flex`, `order`
    
    @requires styler
*/
export default
{
    aliases: [ 'flex', 'order' ],
  
    props:
    {
        /**
            CSS flex property.
        */
        xelf: String,
        /**
            CSS order property.
        */
        order: [ String, Number ]
    },
    
    computed:
    {
        flexCss() { return cssm.flex(this.xelf); },

        orderCss() { return cssm.order(this.order); }
    }
}
