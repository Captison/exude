import { ifnum } from '_lib/utils'


describe('Ifnum utility', () => 
{
    test('calls given operation if value is a number', () => 
    {
        let value = 4;
        let oper = jest.fn();
        let res = ifnum(value, oper);
        
        expect( oper ).toHaveBeenCalled();
    });

    test('calls given operation if value is numeric string', () => 
    {
        let value = '4';
        let oper = jest.fn();
        let res = ifnum(value, oper);
        
        expect( oper ).toHaveBeenCalled();
    });

    test('does not call given operation if value is non-numeric string.', () => 
    {
        let value = '4px';
        let oper = jest.fn();
        let res = ifnum(value, oper);
        
        expect( oper ).not.toHaveBeenCalled();
    });

    test('does not call given operation if value is not number or string.', () => 
    {
        let value = [];
        let oper = jest.fn();
        let res = ifnum(value, oper);
        
        expect( oper ).not.toHaveBeenCalled();
    });

    test('calls operation with given value.', () => 
    {
        let value = 3;
        let oper = jest.fn();
        let res = ifnum(value, oper);
        
        expect( oper ).toHaveBeenCalledWith(value);
    });

    test('returns operation result if value is numeric.', () => 
    {
        let value = '7';
        let oper = jest.fn(v => v * 3);
        let res = ifnum(value, oper);
        
        expect( res ).toBe(21);
    });

    test('returns specified default if value is not numeric.', () => 
    {
        let value = '7up';
        let defaultValue = 'defval';
        let oper = jest.fn(v => v * 3);
        let res = ifnum(value, oper, defaultValue);
        
        expect( res ).toBe(defaultValue);
    });

    test('returns value if no default specified and value is not numeric.', () => 
    {
        let value = '7up';
        let oper = jest.fn(v => v * 3);
        let res = ifnum(value, oper);
        
        expect( res ).toBe(value);
    });
})
