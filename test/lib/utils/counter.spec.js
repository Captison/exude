import { counter } from '_lib/utils'


describe('Counter utility', () => 
{
    test('returns the next incremental number.', () => 
    {
        let first = counter();
        
        expect( counter() ).toBe(first + 1);
    });
})
