import cssm from '_css/mapper'


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
        autoCss() { return cssm.gridAuto([ this.autoCols, this.autoRows ]); },

        gridCss() { return cssm.gridTemplate([ this.cols, this.rows ]); }
    }
}
