<script>
import { context } from '_source/mixins'
import { frag } from '_source/directives'


/**
    Renders default slot content at the nearest parent __XPortal__ location.
*/
export default
{
    name: 'XWormhole',

    mixins: [ context('portal').consumer ],

    props:
    {
        /**
            Set content active?
        */
        active: Boolean
    },
    
    data: () => ({ link: null }),
    
    render()
    {
        this.link && this.link.toggle(this.active);
        return null;
    },
    
    beforeDestroy()
    {
        this.link && this.link.destroy();
    },
    
    methods:
    {
        changePortalContext()
        {
            if (this.portal)
            {
                this.link = this.portal({ key: this._uid, worm: this.$scopedSlots });

                return () => this.link.destroy()
            }
        }        
    }
}
</script>
