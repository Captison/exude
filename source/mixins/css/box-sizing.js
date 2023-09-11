
/**
    CSS box-sizing mixin.
    
    Classes: `boxSizing`
    
    @requires styler
*/
export default
{
    aliases: [ 'boxSizing' ],
  
    props:
    {
        /**
            CSS box-sizing value.
        */
        boxSizing: { type: String, default: 'border-box' }
    },

    computed:
    {
        boxSizingCss() { return this.boxSizing && { boxSizing: this.boxSizing }; }
    }
}
