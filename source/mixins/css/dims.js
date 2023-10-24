import cssm from '_css/mapper'


/**
    CSS width and height mixin.
    
    Classes: 'dims', `maxDims`, `minDims`
    
    @requires styler
*/
export default
{
    aliases: [ 'dims', 'maxDims', 'minDims' ],
  
    props:
    {
        /**
            CSS height value.
            
            Scale units is assumed when number is given.
        */
        height: [ String, Number ],
        /**
            CSS max-height value.

            Scale units is assumed when number is given.
        */
        maxHeight: [ String, Number ],
        /**
            CSS max-width value.

            Scale units is assumed when number is given.
        */
        maxWidth: [ String, Number ],
        /**
            CSS min-height value.

            Scale units is assumed when number is given.
        */
        minHeight: [ String, Number ],
        /**
            CSS min-width value.

            Scale units is assumed when number is given.
        */
        minWidth: [ String, Number ],
        /**
            CSS width value.

            Scale units is assumed when number is given.
        */
        width: [ String, Number ]
    },

    computed:
    {
        dimsCss() { return cssm.dims([this.height, this.width]); },

        maxDimsCss() { return cssm.maxDims([this.maxHeight, this.maxWidth]); },

        minDimsCss() { return cssm.minDims([this.minHeight, this.minWidth]); }
    }    
}
