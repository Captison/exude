<script>
import { css, extension, styler } from '_source/mixins'


/**
    Extension component for general styling.

    Adds style rules to its nearest extendable ancestor
    (__XApp__, __XBox__, __XFlex__, __XGrid__, __XText__).

    This component renders nothing in place.   
*/
export default
{
    name: 'EStylesheet',
    
    mixins: [ styler, extension, ...Object.values(css) ],

    data: () => ({ extCat: 'stylesheets' })
}
</script>
