import { objectSplitter } from '_lib/utils'


describe('Object Splitter utility', () => 
{
    let testRe = /^h-/;
    
    let oneObj =    
    {
        name: 'entry',
        value: 'data',
        size: 4,
        color: 'green',
    };
    
    let twoObj =    
    {
        'h-name': 'other',
        'h-value': 'info',
        'h-size': 54,
        'h-color': 'lemon'
    };
    
    let mergeObj =
    {
        ...oneObj,
        ...twoObj
    };
  
    test('returns an equal object when no test or key changer given.', () => 
    {
        let { accept } = objectSplitter(mergeObj);
        
        expect( accept ).toEqual(mergeObj);
    });

    test('splits object entries into separate objects based on test given.', () => 
    {
        let { accept, reject } = objectSplitter(mergeObj, v => testRe.test(v));
        
        expect( accept ).toEqual(twoObj);
        expect( reject ).toEqual(oneObj);
    });

    test('renames entry keys based on given key changer.', () => 
    {
        let { accept } = objectSplitter(twoObj, v => v, k => k.replace(testRe, ''));
        
        expect( accept ).toHaveProperty('value', 'info');
    });
})
