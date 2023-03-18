import { ns } from '_styles/loaders'


/**
    Mixin to handle a switchable boolean state.
    
    @param { string } name
      Name of boolean property to generate.
      Toggle event name will be `update:[name]`.
    @param { string } timeo
      Timeout (ms) before allowing next change of state.
*/
export default function(name = 'open', timeo = 0)
{
    let ready = ns('ready', name);
    let emit = ns('emit', name);
    let toggleEvt = `update:${name}`;
      
    let mixin =
    {
        props:
        {
            /**
                Open or show content?
            */
            [name]: Boolean
        },
        
        emits:
        {
            /**
                On open/close request.
                
                @param { boolean } value
                  Is open being requested?
            */
            [toggleEvt](value) { return typeof value === 'boolean'; }
        },

        created()
        {
            this[ready] = this[name];
        },

        watch:
        {
            [name]() { setTimeout(() => this[ready] = this[name], timeo); }
        },

        methods:
        {
            [emit](bool) { (this[ready] === this[name]) && this.$emit(toggleEvt, bool); },
            
            [`${name}Off`]() { this[emit](false); },

            [`${name}On`]() { this[emit](true); },

            [`${name}Toggle`]() { this[emit](!this[name]); }
        }
    };
    
    return mixin;
}
