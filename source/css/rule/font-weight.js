import lco from '_source/lco'


/**
    Translates a font weight enumeration into a CSS value.
    
    Additionally, a boolean weight value of `true` is accepted for bold (700) 
    weight.

    @param { boolean | string } value
      Enumerated weight or `true` for bold.
    @return { object }
      A CSS font-weight rule or empty object if `weight` cannot be translated.
*/
export default function(value)
{
    if (value === true)
        return { fontWeight: 'bold' };
    
    let { weight } = lco.font;      
    return weight[value] ? { fontWeight: weight[value] } : {};
}
