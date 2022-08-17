import * as icons from './icons/*.svg'


// WAG Portal Library Config

export default
{
    background:
    {
        named:
        {
            bloodStain: { image: 'linear-gradient(to right, #870000, #190a05)' },
            candyApple: { image: 'linear-gradient(to right, #fffbd5, #b20a2c)' },
            dustyGrass: { image: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)' },
            mangoShine: { image: 'radial-gradient(circle farthest-side, #fceabb, #f8b500)' },
            sandyBeach: { image: 'linear-gradient(to right, #DECBA4, #3E5151)' }
        }
    },
  
    color:
    {
        named:
        {
            grey: '#21262D', // grey 04
            grey2: '#242931', // grey 03
            grey3: '#262C36', // grey 02
            grey4: '#2A2F38', // grey 01
            
            titanium: '#333842', // titanium 10
            titanium20: '#3C424B',
            titanium30: '#4E545E',
            titanium40: '#606771',
            titanium50: '#828B95',
            titanium60: '#949EA8',
            titanium70: '#A5B0BB',
            titanium80: '#B7C3CE',
            titanium90: '#C9D5E0',
            titanium100: '#DBE8F4',
            
            orange: '#FC4D00', // orange 20
            orange40: '#FC5E00', // orange 40
            orange60: '#FA7A00', // orange 60
            orange80: '#FF9300', // orange 80
            orange100: '#FFB800', // orange 100    
          
            purple: '#AF80CF',
            pink: '#DA87BB',
            green: '#47C271',
            turquoise: '#00B6B8',
            royalBlue: '#0059A8',
            blue: '#1B80D8',
            skyBlue: '#00ADE2',
          
            info: '#5DADE2',
            success: '#4BC94D',
            warn: '#FFF852',
            error: '#E53C38',

            // Aliases
            primeDark: 'royalBlue',
            prime: 'blue',
            primeLight: 'skyBlue',
            secondDark: 'titanium',
            second: 'titanium40',
            secondLight: 'titanium90',
            tertiDark: 'orange',
            terti: 'orange60',
            tertiLight: 'orange100',

            accent: 'purple',
            
            // buttonFocus: 'green',
            // buttonHover: 'green',
            link: 'titanium40',
            linkHover: 'orange40'
        }        
    },
    
    font:
    {
        face:
        [
            // Poppins
            'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@100&display=swap',
            // Roboto
            'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@100&display=swap'
        ],
        
        defaultFace: 'Poppins'            
    },
    
    icon:
    {
        named: 
        {
            ...icons,

            caretDown: 'chevron_down',
            check: 'checkbox',
            checkEmpty: 'checkbox_empty',
            checkInd: 'checkbox_ind',
            radio: 'radio_button',
            radioEmpty: 'radio_button_empty',
            test: 'face',
        }
    },
    
    shadow:
    {
        named:
        {
            basic: '1px 1px 3px black',            
            prime: '-1px -1px 2px prime, 1px -1px 2px prime, 1px 1px 2px prime, -1px 1px 2px prime',
            terti: '-1px 1px 2px terti',
        }
    }
}
