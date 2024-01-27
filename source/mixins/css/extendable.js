import { uid } from '_lib/utils'
import { extend } from '_css/helper'
import context from '../context'


/**
    Mixin for extendable (extension-enabled) components.
    
    Classes: `animations`, `backgrounds`, `stylesheets`, `transitions`
    
    @requires styler
*/
export default
{
    aliases: [ 'animations', 'backgrounds', 'stylesheets', 'transitions' ],
  
    mixins: [ context('extension').provider ],
      
    data: () => ({ animations: {}, backgrounds: {}, stylesheets: {}, transitions: {} }),
    
    created()
    {
        this.assemble = defs =>
        {
            let reducer = (obj, spec) =>
            {
                Object.keys(spec).forEach(key => { obj[key] = [ ...(obj[key] || []), spec[key] ] });                                     
                return obj;
            }
            
            return defs.reduce(reducer, {});
        }      
    },

    computed:
    {
        animationsCss() { return this.mergeStyles(this.animations); },

        backgroundsCss() { return this.mergeStyles(this.backgrounds); },
        
        stylesheetsCss() { return this.listStyles(this.stylesheets); },

        transitionsCss() { return this.mergeStyles(this.transitions); }
    },
    
    methods:
    {
        listStyles(specs)
        {
            let bases = [];
                        
            Object.values(specs).forEach(spec => 
            {
                if (!spec.isDisabled)
                {
                    bases.push(...spec.sheet);
                    if (spec.content) bases.push(spec.content);
                }                
            });
            
            return bases;            
        },
        
        mergeStyles(specs)
        {          
            let bases = {}, contents = {};
                        
            Object.values(specs).forEach(spec => 
            {
                if (!spec.isDisabled)
                {
                    let { content, sel, sheet } = spec, xsel = sel || '_';
                    
                    bases[xsel] = bases[xsel] || [];                    
                    // push all sheets into array by selector
                    sheet.forEach(rules => bases[xsel].push(sel ? rules[sel] : rules));
                    // only one content value for a given selector can exist
                    if (content) contents[xsel] = content[sel];
                }                
            });

            return extend(this.assemble, bases, extend(v => v, contents));
        },

        provideExtensionContext()
        {
            return (group, spec) =>
            {
                let id = 'ext' + uid.next();
                
                this[group] = { ...this[group], [id]: spec };
                
                return () =>
                {
                    // eslint-disable-next-line no-unused-vars
                    let { [id]: _, ...others } = this[group];
                    this[group] = others;
                }
            }
        }              
    }
}
