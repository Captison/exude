import vars from '../vars'


/**
    Translates a font weight enumeration into a CSS value.
    
    Additionally, a boolean weight value of `true` is accepted for bold (700) 
    weight.

    @param { boolean | string } weight
      Enumerated weight or `true` for bold.
    @return { object }
      A CSS font-weight rule or empty object if `weight` cannot be translated.
*/
export default function(weight)
{
    let { font } = vars;
  
    if (weight === true)
        return { fontWeight: 'bold' }; // bold weight
    
    if (font.weight[weight])
        return { fontWeight: font.weight[weight] }; // enumerated weight
    
    return {};
}
