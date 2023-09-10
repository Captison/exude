import { length } from '_styles/loaders'


/**
    CSS Grid mixin.
    
    Classes: `grid`, `auto`

    @requires styler
*/
export default
{
    aliases: [ 'grid', 'auto' ],
  
    props:
    {
        /**
            CSS grid-auto-columns value.
        */
        autoCols: String,
        /**
            CSS grid-auto-rows value.
        */
        autoRows: String,
        /**
            CSS grid-template-columns value.
        */
        cols: String,
        /**
            CSS grid-template-rows value.
        */
        rows: String
    },

    computed:
    {        
        autoCss() 
        { 
            let auto = {};
            
            if (this.autoCols) auto.gridAutoColumns = length.spaced(this.autoCols);
            if (this.autoRows) auto.gridAutoRows = length.spaced(this.autoRows);
            
            return auto;
        },

        gridCss() 
        {
            let grid = {};
            
            if (this.cols) grid.gridTemplateColumns = length.spaced(this.cols);
            if (this.rows) grid.gridTemplateRows = length.spaced(this.rows);
            
            return grid; 
        }
    }
}
