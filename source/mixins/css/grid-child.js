
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
        areaCss() { return this.area && { gridArea: this.area }; },

        placeSelfCss() 
        { 
            let grid = {};
                            
            if (this.placeSelf)
            {
                let [ alignSelf, justifySelf = alignSelf ] = this.placeSelf.split(/\s+/);
                
                if (alignSelf) grid.alignSelf = alignSelf;
                if (justifySelf) grid.justifySelf = justifySelf;
            }
            
            return grid;
        }
    }
}
