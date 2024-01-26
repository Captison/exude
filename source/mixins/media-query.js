import { mediaWatch } from '_lib/utils'
import { enumer } from '_lco/utils'


/**
    Media query change event notifications

    The `name` parameter is used to define a reactive boolean variable that
    changes based on the media query of the same name (defined in the LCO)
    being met.

    @param { string } name
      Reactive variable name to use for boolean switch.
      Function to remove listener will be called `[name]Unset`.
    @param { string } query
      Name of a defined media query in the LCO.
      If omitted, `name` is used.
    @return { object }
      Mixin.
*/
export default function(name, query = name)
{
    let unset = `${name}Unset`;
  
    let mixin =
    {
        data: () => ({ [name]: false }),
        
        created()
        {
            this[unset] = mediaWatch(enumer.media(query), bool => this[name] = bool);
        },
        
        beforeDestroy()
        {
            this[unset]();
        }
    }
    
    return mixin;
}
