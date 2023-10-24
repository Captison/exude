import cssm from '_css/mapper'



/**
    CSS width and height squared mixin.
    
    Classes: 'size', `maxSize`, `minSize`
    
    @requires styler
*/
export default
{
    aliases: [ 'size', 'maxSize', 'minSize' ],
  
    props:
    {
        /**
            Maximum height and width.

            Scale units is assumed when number is given.
        */
        maxSize: [ String, Number ],
        /**
            Minimum height and width.

            Scale units is assumed when number is given.
        */
        minSize: [ String, Number ],
        /**
            Height and width.

            Scale units is assumed when number is given.
        */
        size: [ String, Number ]
    },

    computed:
    {
        maxSizeCss() { return cssm.maxDims([this.maxSize, this.maxSize]); },
        
        minSizeCss() { return cssm.minDims([this.minSize, this.minSize]); },
        
        sizeCss() { return cssm.dims([this.size, this.size]); }      
    }
}
