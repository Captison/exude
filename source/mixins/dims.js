import { length } from '_styles/loaders'



/*
    CSS width and height mixin.
    @requires styler
*/
export default
{
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
        dimsCss() { return this.resolveDims(this.height, this.width); },

        maxDimsCss() { return this.resolveDims(this.maxHeight, this.maxWidth, 'max'); },

        minDimsCss() { return this.resolveDims(this.minHeight, this.minWidth, 'min'); },
    },
    
    methods:
    {
        resolveDims(height, width, prefix)
        {
            let dims = {};
            
            let hprop = prefix ? prefix + 'Height' : 'height';
            let wprop = prefix ? prefix + 'Width' : 'width';
            
            if (height || height === 0)
                dims[hprop] = length(height);
                
            if (width || width === 0)
                dims[wprop] = length(width);
            
            return dims;          
        }
    }
}
