import { uid } from '_lib/utils'


describe('UID utility', () => 
{
    test('generates unique hash when value undefined.', () => 
    {
        let one = uid();
        let two = uid();
        
        expect( one ).not.toBe(two);
    });

    test('generates unique hash when value null.', () => 
    {
        let one = uid(null);
        let two = uid(null);
        
        expect( one ).not.toBe(two);
    });

    test('generates the same hash when value given.', () => 
    {
        let one = uid(['value']);
        let two = uid(['value']);
        
        expect( one ).toBe(two);
    });
})
