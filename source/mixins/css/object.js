import cssm from '_css/mapper'


/*
    CSS object-fit/position mixin.
    @requires styler
*/
export default
{
    aliases: [ 'object' ],
  
    props:
    {
        /**
            Colon-separated `object-fit` and `object-position` values.
        */
        object: String
    },

    computed:
    {
        objectCss() { return cssm.object(this.object); }
    }
}
