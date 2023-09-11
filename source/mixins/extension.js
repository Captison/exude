import context from './context'
import { selector } from '_styles/loaders'


/**
    Baseline mixin for extension components.
    
    @requires styler
*/
export default
{
    mixins: [ context('extension').consumer ],
    
    props: 
    { 
        /**
            CSS content value.
        */
        content: [ String, Boolean ],
        /**
            Ignore this transition spec?
        */
        disabled: Boolean,
        /**
            CSS selector string.
        */
        sel: String
    },
    
    created() 
    { 
        this.useSel = rules => 
        {
            let sel = this.sel && selector(this.sel);
            return sel ? { [sel]: rules } : rules;
        } 
    },

    render() 
    { 
        return null; 
    },

    computed:
    {
        isDisabled() { return this.disabled || false; },
                      
        sheet() { return this.cs(this.aliases, this.useSel); },  

        contentStr() 
        {
            if (this.content === true)
                return this.useSel({ content: '' });
            
            if (typeof this.content === 'string')
                return this.useSel({ content: this.content });
        }
    },
        
    methods:
    {
        changeExtensionContext()
        {
            if (this.extension)
            {
                let data = {};
                
                Object.defineProperty(data, 'content', { get: () => this.contentStr, enumerable: true });
                Object.defineProperty(data, 'isDisabled', { get: () => this.isDisabled, enumerable: true });
                Object.defineProperty(data, 'sheet', { get: () => this.sheet, enumerable: true });
                Object.defineProperty(data, 'sel', { get: () => this.sel, enumerable: true });
                
                return this.extension(this.extCat, data);
            }
        }        
    }
}
