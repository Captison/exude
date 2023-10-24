import cssm from '_css/mapper'


/**
    CSS Flex mixin.
    
    Classes: `aligns`, `dir`, `wrap`

    @requires styler
*/
export default
{
    aliases: [ 'aligns', 'dir', 'wrap' ],
  
    props:
    {
        /**
            Colon-separated CSS align-content, align-items, and justify-content 
            values.            
            
            Takes the form `align-content:align-items:justify-content`.
            @deprecated
            @ignore
        */
        aligns: String,
        /**
            Use column flow (a la `flex-direction: column`)?
        */
        invert: Boolean,
        /**
            Reverse direction flow?
        */
        reverse: Boolean,
        /**
            Wrap flex items onto multiple lines?
        */
        wrap: Boolean,
        /**
            Reverse wrap (bottom to top)?
        */
        wrapRev: Boolean
    },

    computed:
    {
        alignsCss() { return cssm.layoutAlignment(this.aligns); },
        
        dirCss() { return { flexDirection: (this.invert ? 'column' : 'row') + (this.reverse ? '-reverse' : '') }; },
                
        wrapCss() { return (this.wrap || this.wrapRev) && { flexWrap: this.wrapRev ? 'wrap-reverse' : 'wrap' }; }
    }
}
