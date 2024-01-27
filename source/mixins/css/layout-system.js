import cssm from '_css/mapper'


/**
    Layout system related CSS property mixin.
    
    Classes: `gap`, `place`

    @requires styler
*/
export default
{
    aliases: [ 'gap', 'place' ],
  
    props:
    {
        /**
            Gutter widths as `column:row`.
            
            A number without units this is assumed to be a scale-unit value.
        */
        gap: String, 
        /**
            CSS place-content:place-items values.
        */
        place: String
    },

    computed:
    {
        gapCss() { return cssm.gap(this.gap); },
        
        placeCss() { return cssm.layoutPlacement(this.place); }
    }
}
