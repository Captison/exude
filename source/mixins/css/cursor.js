import cssm from '_css/mapper'


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
        cursorCss() { return cssm.cursor([ this.pointer, this.cursor, this.inactive ]); }
    }
}
