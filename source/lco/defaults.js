/**
    Library Configuration Object (LCO) Defaults
    ---------------------------------------------------------------------------
    
*/

export default
{
    basis:
    {
        htmlIdGen: true,
        namespace: 'exude',
        scale: 
        { 
            angle: { num: 1, unit: 'deg' }, 
            time: { num: 1000, unit: 'ms' }, 
            length: { num: 4, unit: 'px' } 
        }
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
    
    color:
    {
        named:
        {
            black: '#000000',
            white: '#FFFFFF'
        }        
    },
    
    font:
    {
        named:
        {
            h1: { size: 12, height: 18 },
            h2: { size: 10, height: 15 },
            h3: { size: 8, height: 12 },
            h4: { size: 6, height: 9 },
            h5: { size: 5, height: 7.5 },
            h6: { size: 4, height: 6 },

            jumbo: { size: 16, height: 24 },
            big: { size: 5, height: 7.5 },
            text: { size: 4, height: 6 },
            small: { size: 3, height: 5 },
            micro: { size: 1.25, height: 3.75 },
        }
    },
    
    icon:
    {
        defaultSize: 6      
    },

    transition:
    {
        named:
        {
            default: { property: 'all', duration: '0.15s', timing: 'ease' }
        }
    } 
}
