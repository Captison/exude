import { pascalCase } from 'change-case';
import { extend } from '_styles/loaders'


/**
    Generates a mixin for allowing hover and focus styles of a specific prop.
    
    For a given `name` value of "color",
      - props 'color', 'hColor', 'fColor', and 'hfColor' are added
      - a 'colorCss' computed proprty is added for generating the CSS
    
    @param { string } name
      Name of the base property.
    @param { string } type
      Property data type.
    @param { function } resolve
      A function to resolve raw property data to a CSS ruleset object.
    @return { object }
      Custom mixin.
*/
export default function(name, type, resolve)
{
    let pname = pascalCase(name);
    
    let comp = name + 'Css',
        hprop = 'h' + pname,
        fprop = 'f' + pname,
        hfprop = 'hf' + pname;
  
    let mixin =
    {
        props:
        {
            [name]: type,
            /* hover prop */
            [hprop]: type,
            /* focus prop */
            [fprop]: type,
            /* hover and focus prop */
            [hfprop]: type
        },
        
        computed:
        {
            [comp]()
            { 
                return extend(resolve, 
                { 
                    _: this[name], 
                    hover: this[hprop], 
                    focus: this[fprop], 
                    hoverFocus: this[hfprop] 
                }); 
            }
        }        
    };
    
    return mixin;
}
