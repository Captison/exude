import cssm from '_css/mapper'


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
        overflowCss() { return cssm.overflow(this.overflow); },

        overscrollCss() { return cssm.overscrollBehavior(this.overscroll); },

        overWrapCss() { return cssm.overflowWrap(this.overWrap); }
    }
}
