<script>
import { context } from '_source/mixins'


/**
    Works with __XBox__ (and derivatives) to define descendant CSS rules.
    
    This component renders nothing in place.  It simply sends descendant CSS 
    styling information to the nearest __XBox__ ancestor.
    
    All attributes provided to the component instance are assumed to be raw
    CSS style values for the CSS selector identified by `sel`.
*/
export default
{
    name: 'XDestyler',
    
    mixins: [ context('extension').consumer ],
    
    props:
    {
        /**
            Ignore this transition spec?
        */
        disabled: Boolean,
        /**
            CSS selector string.
        */
        sel: { type: String, required: true }
    },
    
    render()
    {
        return null;
    },

    computed:
    {
        styles() { return { ...this.$attrs }; },
      
        isDisabled() { return this.disabled || false; }
    },
        
    methods:
    {
        changeExtensionContext()
        {
            if (this.extension)
            {
                let keys = 
                [
                    'sel',
                    'styles',
                    'isDisabled'
                ]
              
                let reducer = (obj, key) => 
                {
                    Object.defineProperty(obj, key, { get: () => this[key], enumerable: true });
                    return obj;
                }
                
                return this.extension('destylers', keys.reduce(reducer, {}));
            }
        }
    }
}
</script>
