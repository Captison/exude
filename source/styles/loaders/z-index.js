import vars from '../vars'


/**
    Translates zindex enumerations into a CSS z-index value.

    @param { string | number } value
      Z-index enum or value.
    @return { string | number }
      CSS z-index value.
*/
export default function(value)
{
    return vars.zIndex.named[value] || value;
}
