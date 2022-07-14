
/**
    Mixin to handle a switchable boolean state.
*/
export default
{
    props:
    {
        /**
            Open or show content?
        */
        open: Boolean
    },
    
    emits:
    {
        /**
            On open/close request.
            
            @param { boolean } value
              Is open being requested?
        */
        'update:open'(value) { return typeof value === 'boolean'; }
    },

    created()
    {
        // helps prevent immediate state reversal via contrary
        // click detection (like a click to open a dropdown that
        // is also detected as an outside click).
        this.readyOpen = this.open;
    },

    watch:
    {
        open() { setTimeout(() => this.readyOpen = this.open, 0); }
    },

    methods:
    {
        emitOpen(bool) { (this.readyOpen === this.open) && this.$emit('update:open', bool); },
        
        requestClose() { this.emitOpen(false); },

        requestOpen() { this.emitOpen(true); },

        requestToggle() { this.emitOpen(!this.open); }
    }
}
