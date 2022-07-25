import { unwind } from '_lib/utils'


describe('Unwind utility', () => 
{
    let fruity = 
    {
        apple: 'grape',
        apricot: 'pineapple',
        banana: 'apple',
        grape: 'strawberry',
        mango: 'grape',
        orange: 'pear',
        pineapple: 'apricot',
        plum: 'kiwi, orange, mango',
    }
  
    test('returns value at specified key in given object.', () => 
    {
        expect( unwind(fruity, 'grape') ).toBe('strawberry');
    });

    test('follows aliases to return proper value for a key.', () => 
    {
        expect( unwind(fruity, 'banana') ).toBe('strawberry');
    });

    test('returns given key if it does not exist in given object.', () => 
    {
        expect( unwind(fruity, 'melon') ).toBe('melon');
    });

    test('returns undefined key if aliases are circular.', () => 
    {
        expect( unwind(fruity, 'apricot') ).toBeUndefined();
    });

    describe('list function', () =>
    {
        test('returns empty array for when no key given.', () => 
        {
            expect( unwind.list(fruity, '') ).toEqual([]);
        });

        test('returns single value as list at specified key in given object.', () => 
        {
            expect( unwind.list(fruity, 'grape') ).toEqual(['strawberry']);
        });

        test('returns multiple values as list at specified key in given object.', () => 
        {
            expect( unwind.list(fruity, 'plum') ).toEqual(['kiwi', 'pear', 'strawberry']);
        });

        test('resolves multiple keys through aliases to corresponding values.', () => 
        {
            expect( unwind.list(fruity, ['pineapple', 'apple', 'banana']) ).toEqual(['strawberry', 'strawberry']);
        });
    });
})
