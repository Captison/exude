import { length } from '_styles/loaders'



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
        maxSizeCss() { return this.resolveSize(this.maxSize, 'max'); },
        
        minSizeCss() { return this.resolveSize(this.minSize, 'min'); },
        
        sizeCss() { return this.resolveSize(this.size); }      
    },
    
    methods:
    {
        resolveSize(size, prefix)
        {
            if (size || size === 0)
            {
                let hprop = prefix ? prefix + 'Height' : 'height';
                let wprop = prefix ? prefix + 'Width' : 'width';
                            
                let value = length(size);            
                
                return { [hprop]: value, [wprop]: value };
            }
        }      
    }
}
