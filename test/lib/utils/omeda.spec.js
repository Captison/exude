import { omeda } from '_lib/utils'


describe('Omeda (Object Metadata) utility', () => 
{
    let target = {}; 
    let meta = omeda(target);
    
  
    test('adds a metadata object to target object.', () => 
    {
        let meta = target[omeda.key];
        
        expect( typeof meta ).toBe('object');
    });

    test('adds a unique key to every metadata object.', () => 
    {
        let meta1 = omeda({});
        
        expect( meta1.key ).toBeDefined();
        expect( meta1.key ).not.toBe(omeda({}).key);
    });

    test('allows get/set of data.', () => 
    {
        let key = "animal", val = 'mandrill';
        
        meta.set(key, val);
      
        expect( meta.get(key) ).toBe(val);
    });

    test('allows get/set of nested data.', () => 
    {
        let key = "profile.favorites.beverage", val = 'sangria';
        
        meta.set(key, val);
      
        expect( meta.get('profile.favorites') ).toEqual({ beverage: 'sangria' });
    });
})
