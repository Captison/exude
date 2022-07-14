/**
    Default Styling Constants
    ---------------------------------------------------------------------------
    Styles defined here will be in effect unless overridden.
*/

export default
{
    basis:
    {
        namespace: 'exude',
        stime: 1000,
        sunit: 4,
        defaultOverscroll: 'contain'
    },
    
    animation:
    {
        keyframes:
        {
            skeletonLoader:
            {
                '0%': { backgroundPosition: '150% 50%' },
                '100%': { backgroundPosition: '-50% 50%' }
            }
        }
    },
    
    button:
    {
        defaultPad: 'v1% h1.25%'
    },

    color:
    {
        named:
        {
            black: '#000000',
            white: '#FFFFFF'
        },
        
        image:
        {
            skeletonLoader: 'linear-gradient(90deg, transparent 30%, gray, transparent 70%)'
        }
    },
    
    font:
    {
        size:
        {
            h1: { fontSize: 12, lineHeight: 18 },
            h2: { fontSize: 10, lineHeight: 15 },
            h3: { fontSize: 8, lineHeight: 12 },
            h4: { fontSize: 6, lineHeight: 9 },
            h5: { fontSize: 5, lineHeight: 7.5 },
            h6: { fontSize: 4, lineHeight: 6 },

            big: { fontSize: 5, lineHeight: 7.5 },
            text: { fontSize: 4, lineHeight: 6 },
            small: { fontSize: 3, lineHeight: 5 }
        }
    },
    
    icon:
    {
        defaultSize: 6      
    },

    transition:
    {
        defaultTime: '0.1875s',
        
        defaultTimingFunction: 'ease',
        
        defaultProperty: 'all'
    } 
}
