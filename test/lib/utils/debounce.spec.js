import { debounce } from '_lib/utils'


describe('Debounce utility', () => 
{
    test('returns a function for debounce.', () => 
    {
        let bounce = debounce(100, () => {});
        
        expect( typeof bounce === 'function' ).toBe(true);
    });

    test('returns a function member to stop debounce.', () => 
    {
        let bounce = debounce(100, () => {});
        
        expect( typeof bounce.stop === 'function' ).toBe(true);
    });

    test('calls given operation after given delay.', () => 
    {
        return new Promise(resolve => debounce(200, resolve)()).then(val => 
        {
            expect( val ).toBeUndefined();
        });        
    });
})
