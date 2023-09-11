import { position } from '_styles/loaders'


/*
    CSS object-fit/position mixin.
    @requires styler
*/
export default
{
    aliases: [ 'object' ],
  
    props:
    {
        /**
            Colon-separated `object-fit` and `object-position` values.
        */
        object: String
    },

    computed:
    {
        objectCss() 
        {
            let object = {};

            if (typeof this.object === 'string')
            {
                let [ fit, pos ] = this.object.split(/:/);
                
                if (fit) object.objectFit = fit;
                if (pos) object.objectPosition = position(pos);
            }
                    
            return object; 
        }
    }
}
