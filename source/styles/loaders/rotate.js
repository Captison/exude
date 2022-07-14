
/**
    Translates degree angles into CSS rotation transforms.
    
    @param { String } value
      Angles of rotation of the form `z:y:x`.
    @return { String }
      CSS rotation transform values.
*/
export default function(value)
{
    if (value)
    {
        let ations = [];      
        let [ z, y, x ] = value.split(/:/);

        if (z) ations.push(`rotateZ(${z}deg)`);
        if (y) ations.push(`rotateY(${y}deg)`);
        if (x) ations.push(`rotateX(${x}deg)`);

        return ations.join(' ');              
    }    
}
