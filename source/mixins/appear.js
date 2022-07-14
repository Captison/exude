
/**
    Mixin to show/hide content.
*/
export default
{
    props:
    {
        /**
            Show the content?
        */
        show: Boolean
    },
    
    emits:
    {
        /**
            On open/close request.
            
            @param { boolean } value
              Is show being requested?
        */
        'update:show'(value) { return typeof value === 'boolean'; }
    },

    created()
    {
        // readyShow helps prevent immediate state reversal via contrary
        // click detection (like a click to open a dropdown that is
        // also detected as an outside click).
        this.readyShow = this.show;
    },

    watch:
    {
        show() { setTimeout(() => this.readyShow = this.show, 0); }
    },

    methods:
    {
        emitShow(bool) { (this.readyShow === this.show) && this.$emit('update:show', bool); },
        
        requestHide() { this.emitShow(false); },

        requestShow() { this.emitShow(true); },

        requestToggle() { this.emitShow(!this.show); }
    }
}
