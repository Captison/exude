import { length } from '_styles/loaders'


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
        gapCss() 
        { 
            if (this.gap)
            {
                let gap = {};
                let [ col, row ] = this.gap.split(':');
                
                if (col) gap.columnGap = length(col);
                if (row) gap.rowGap = length(row);
                
                return gap;
            }
        },
        
        placeCss() 
        {
            if (this.place)
            {
                let place = {};
                let { content, items } = this.place.split(':');
                
                if (content) place.placeContent = content;
                if (items) place.placeItems = items;
                
                return place;
            }
        }
    }
}
