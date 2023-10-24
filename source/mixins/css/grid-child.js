import cssm from '_css/mapper'


/**
    Grid child CSS properties.
    
    Classes: `area`, `placeSelf`
    
    @requires styler
*/
export default
{
    aliases: [ 'area', 'placeSelf' ],
  
    props:
    {
        /**
            CSS grid-area value.
        */
        area: String,
        /**
            CSS place-self value.
        */
        placeSelf: String
    },
    
    computed:
    {
        areaCss() { return cssm.gridArea(this.area); },

        placeSelfCss() { return cssm.placeSelf(this.placeSelf); }
    }
}
