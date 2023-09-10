
/**
    Clipping related CSS properties.
    
    Classes: `overflow`, `overscroll`, `overWrap`
    
    @requires styler
*/
export default
{
    aliases: [ 'overflow', 'overscroll', 'overWrap' ],
  
    props:
    {
        /**
            CSS overflow value.
        */
        overflow: String,
        /**
            CSS overscroll-behavior value.
        */
        overscroll: String,
        /**
            CSS overflow-wrap value.
        */
        overWrap: String
    },
    
    computed:
    {
        overflowCss() { return this.overflow && { overflow: this.overflow }; },

        overscrollCss() { return this.overscroll && { overscrollBehavior: this.overscroll }; },

        overWrapCss() { return this.overWrap && { overflowWrap: this.overWrap }; }
    }
}
