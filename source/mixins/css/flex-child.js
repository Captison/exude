
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
        flexCss() { return this.xelf && { flex: this.xelf }; },

        orderCss() { return this.order && { flex: this.order }; }
    }
}
