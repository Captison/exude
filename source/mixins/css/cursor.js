
/**
    Cursor CSS property.
    
    Classes: `cursor`
    
    @requires styler
*/
export default
{
    aliases: [ 'cursor' ],
    
    props:
    {
        /**
            CSS cursor value.
        */
        cursor: String,
        /**
            CSS pointer cursor.
            
            Ignored if `cursor` is set.
        */
        pointer: Boolean
    },
    
    computed:
    {
        cursorCss()
        {
            if (this.inactive) return { cursor: 'not-allowed' };
            if (this.cursor) return { cursor: this.cursor };
            if (this.pointer) return { cursor: 'pointer' };
        }
    }
}
