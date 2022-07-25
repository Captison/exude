import { exists } from '_lib/utils'


describe('Exists utility', () => 
{
    test('returns false if value is null.', () => 
    {
        expect( exists(null) ).toBe(false);
    });

    test('returns false if value is undefined.', () => 
    {
        expect( exists(undefined) ).toBe(false);
    });

    test('returns false if no value given.', () => 
    {
        expect( exists() ).toBe(false);
    });

    test('returns true if value not null or undefined.', () => 
    {
        expect( exists('not null') ).toBe(true);
    });

    test('returns true for empty string.', () => 
    {
        expect( exists('not null') ).toBe(true);
    });

    test('returns true for zero.', () => 
    {
        expect( exists(0) ).toBe(true);
    });
})
