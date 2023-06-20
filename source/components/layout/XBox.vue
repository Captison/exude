<template>
  <component :is="el" v-bind="$attrs" :class="cn(aliases, true)" v-on="$hearers">
    <!-- @slot box child content -->
    <slot />
  </component>
</template>


<script>
import merge from 'deepmerge'
import { ifnum, uid } from '_lib/utils'
import { context, margin, pad, styler, subCss } from '_source/mixins'
import { border, boxe, colors, extend, outline } from '_styles/loaders'
import { radius, shadow, toPixels, transform, trbl } from '_styles/loaders'


/**
    Base layout component.
*/
export default
{
    name: 'XBox',
    
    mixins: 
    [
        styler, 
        context('extension').provider,
        margin, 
        pad, 
        subCss('colors', String, colors),
        subCss('border', String, border),
        subCss('filter', String, v => ({ filter: v })),
        subCss('opacity', [String, Number], v => ({ opacity: v })),
        subCss('outline', String, outline),
        subCss('pers', [String, Number], v => ({ perspective: toPixels.str(v) })),
        subCss('radius', String, radius),
        subCss('shadow', String, v => ({ boxShadow: shadow(v) })),
        subCss('trans', String, transform),
        subCss('zIndex', [String, Number], v => ({ zIndex: v })),
    ],
    
    props:
    {
        /**
            CSS alignment values (`text-align:vertical-align`).
        */
        align: String,
        /**
            CSS animation enumeration(s) from the LCO.
            
            Use commas to specify multiple enumerations.
        */
        animation: String,
        /**
            CSS grid-area value.
        */
        area: String,
        /**
            CSS background enumeration(s) from the LCO.
            
            Use commas to specify multiple enumerations.
        */
        background: String,
        /**
            Space-separated list of directional border values.
            
            Each value takes the form `nX` where `n` can be

            - `t` = top
            - `r` = right
            - `b` = bottom
            - `l` = left
            - `v` = top & bottom
            - `h` = left & right
            - `a` = top, right, bottom & left

            and `X` is a border value taking the form: `width!color!style` where:
              - `width` is a scale unit number
              - `color` is a valid color name
              - `style` is a CSS border style

            Values are merged from left to right.
            
            Note that borders are included in `width` and `height` when specified.
            
            - use `hBorder` prop to specify hover border
            - use `fBorder` prop to specify focus border
        */
        border: String,
        /**
            CSS box-sizing value.
        */
        boxSizing: { type: String, default: 'border-box' },
        /**
            Foreground and background colors (valid color names only).
            
            This takes the form `foreground:background`.        

            - use `hColors` prop to specify hover colors
            - use `fColors` prop to specify focus colors
        */
        colors: String,
        /**
            CSS cursor value.
        */
        cursor: String,
        /**
            CSS display value.
        */
        display: String,
        /**
            Root HTML element.
            
            Unused attrivutes are applied to this element.
        */
        el: { type: String, default: 'div' },
        /**
            CSS filter value.

            - use `hFilter` prop to specify hover filter
            - use `fFilter` prop to specify focus filter
        */
        filter: String,
        /**
            CSS flex property.
        */
        flex: String,
        /**
            Box height value.
            
            Scale units is assumed when number is given.
        */
        height: [ String, Number ],
        /**
            Is this box hidden from view (CSS visibility)?
        */
        hide: Boolean,
        /**
            Is the back of this box hidden from view (CSS backface-visibility)?
        */
        hideBack: Boolean,
        /**
            Box maximum height value.

            Scale units is assumed when number is given.
        */
        maxHeight: [ String, Number ],
        /**
            Box maximum width value.

            Scale units is assumed when number is given.
        */
        maxWidth: [ String, Number ],
        /**
            Box minimum height value.

            Scale units is assumed when number is given.
        */
        minHeight: [ String, Number ],
        /**
            Box minimum width value.

            Scale units is assumed when number is given.
        */
        minWidth: [ String, Number ],
        /**
            CSS opacity value.

            - use `hOpacity` prop to specify hover opacity
            - use `fOpacity` prop to specify focus opacity
        */
        opacity: [ String, Number ],     
        /**
            CSS order property.
        */
        order: [ String, Number ],
        /**
            Outline specification of the form `width!color!style!space`.
            
              - `width` is a scale unit number
              - `color` is a valid LCO color name
              - `style` is a CSS outline style
              - `space` is a scale unit number for CSS outline-offset
            
            - use `hOutline` prop to specify hover outline
            - use `fOutline` prop to specify focus outline
        */
        outline: String,
        /**
            CSS overflow value.
        */
        overflow: String,
        /**
            CSS overscroll-behavior value.
        */
        overscroll: String,
        /**
            CSS perspective value.

            Scale units is assumed when number is given.
            
            - use `hPers` prop to specify hover perspective
            - use `fPers` prop to specify focus perspective
        */
        pers: [ String, Number ],
        /**
            CSS perspective-origin value.
        */
        persOrigin: String,
        /**
            CSS place-self value.
        */
        placeSelf: String,
        /**
            CSS position value.
        */
        pos: String,
        /**
            Space-separated list of directional radius values.

            Each value takes the form `nX` where `n` can be

            - `t` = top-left
            - `r` = top-right
            - `b` = bottom-right
            - `l` = bottom-left
            - `v` = top-left & bottom-right
            - `h` = bottom-left & top-right
            - `a` = top-left, top-right, bottom-right, bottom-left

            and `X` is the number of scale units.

            Values are merged from left to right.

            - use `hRadius` prop to specify hover radius
            - use `fRadius` prop to specify focus radius
        */
        radius: String,
        /**
            Enumerated box shadow value(s).

            - use `hShadow` prop to specify hover box shadow
            - use `fShadow` prop to specify focus box shadow
        */
        shadow: String,
        /**
            CSS white-space value.
        */
        space: String,
        /**
            CSS transform specifications.
            
            The value should take the form `faX` where:            
              - `f` is a letter for CSS transform function
                - `s` for scale (scalar)
                - `k` for skew (degrees)
                - `t` for translate (pixels)
                - `r` for rotate (degrees)
              - `a` is a letter for the transform axis `x`, `y`, or `z`
              - `X` is a numerical parameter for the transform function
              
            Use spaces to specify multiple transformations.

            - use `hTrans` prop to specify hover transformations
            - use `fTrans` prop to specify focus transformations
        */
        trans: String,
        /**
            CSS transform-origin value.
        */
        transOrigin: String,
        /**
            CSS transition enumeration(s) from the LCO.
            
            Use commas to specify multiple enumerations.
        */
        transition: { type: String, default: 'default' },
        /**
            Space-separated list of scale unit directional values.

            Each value takes the form `nX` where `n` can be

            - `t` = top
            - `r` = right
            - `b` = bottom
            - `l` = left
            - `v` = top & bottom
            - `h` = left & right
            - `a` = top, right, bottom & left

            and `X` is the number of scale units.

            Values are merged from left to right.
        */
        trbl: String,
        /**
            Box width value.

            Scale units is assumed when number is given.
        */
        width: [ String, Number ],
        /**
            CSS z-index value.

            - use `hZIndex` prop to specify hover z-index
            - use `fZIndex` prop to specify focus z-index
        */
        zIndex: [ String, Number ]
    },
    
    data: () => ({ animations: {}, backgrounds: {}, transitions: {} }),
    
    created()
    {
        this.aliases =
        [
            'boxSizing', 'display',
            // position and stacking
            'pos', 'trbl', 'zIndex',
            // sizing
            'dims', 'maxDims', 'minDims',
            // box model
            'margin', 'pad',
            // colors
            'backgrounds', 'colors', 
            // framing
            'border', 'outline', 'radius', 'shadow',
            // content effects            
            'align', 'filter', 'opacity', 'perspective', 'space', 'transform',
            // animation
            'animations', 'transitions',
            // clipping features
            'overflow',
            // CSS flex and grid child item
            'flex', 'grid',
            // interaction control
            'cursor', 'hide'
        ].join(' ');      
    },
    
    mounted()
    {
        if (this.$hearers.hover)
        {
            this.$el.addEventListener('mouseenter', () => this.$emit('hover', true));
            this.$el.addEventListener('mouseleave', () => this.$emit('hover', false));
        }
    },

    computed:
    {
        alignCss() 
        {
            let align = {};
            let [ textA, vertA ] = (this.align || '').split(/:/);
            
            if (textA) align.textAlign = textA;
            if (vertA) align.verticalAlign = vertA;
            
            return align; 
        },
        
        animationsCss()
        {
            let specs = [ ...boxe.animation(this.animation), ...Object.values(this.animations) ];            
            return this.descendantCss(specs); 
        },

        backgroundsCss()
        {
            let specs = [ ...boxe.background(this.background), ...Object.values(this.backgrounds) ];            
            return this.descendantCss(specs); 
        },

        boxSizingCss() { return this.boxSizing && { boxSizing: this.boxSizing }; },
        
        cursorCss() { return this.cursor && { cursor: this.cursor }; },
                
        displayCss() { return this.display && { display: this.display } },
        
        dimsCss() { return this.resolveDims(this.height, this.width); },
        
        flexCss() 
        { 
            let flex = {};
            
            if (this.flex)
                flex.flex = this.flex;

            if (this.order)
                flex.order = this.order;
            
            return flex; 
        },

        gridCss() 
        { 
            let grid = {};
            
            if (this.area)
                grid.gridArea = this.area;
                
            if (this.placeSelf)
            {
                let [ alignSelf, justifySelf = alignSelf ] = this.placeSelf.split(/\s+/);
                
                if (alignSelf) grid.alignSelf = alignSelf;
                if (justifySelf) grid.justifySelf = justifySelf;
            }
            
            return grid;
        },

        hideCss() { return this.hide && { visibility: 'hidden' }; },

        maxDimsCss() { return this.resolveDims(this.maxHeight, this.maxWidth, 'max'); },

        minDimsCss() { return this.resolveDims(this.minHeight, this.minWidth, 'min'); },
        
        overflowCss() 
        {
            let overs = {};
            
            if (this.overflow) overs.overflow = this.overflow;            
            if (this.overscroll) overs.overscrollBehavior = this.overscroll;
            
            return overs;
        },
        
        perspectiveCss()
        {
            let perspective = { ...this.persCss };
                        
            if (this.persOrigin) perspective.perspectiveOrigin = this.persOrigin;
            if (this.hideBack) perspective.backfaceVisibility = 'hidden';
            
            return perspective;                        
        },

        posCss() { return this.pos && { position: this.pos } },
        
        spaceCss() { return this.space && { whiteSpace: this.space }; },
        
        transformCss()
        {
            let transform = { ...this.transCss };
                      
            if (this.transOrigin) transform.transformOrigin = this.transOrigin;            
            
            return transform;
        },
        
        transitionsCss()
        {
            let specs = [ ...boxe.transition(this.transition), ...Object.values(this.transitions) ];            
            return this.descendantCss(specs); 
        },

        trblCss() { return this.trbl && trbl(this.trbl); }        
    },
    
    methods:
    {
        descendantCss(specs)
        {          
            let base = [], hover = [], focus = [];
                        
            specs.forEach(spec => 
            {
                let { isBase, isDisabled, isFocus, isHover, ...values } = spec;
                
                if (!isDisabled)
                {
                    if (isHover || isBase) hover.push(values);
                    if (isFocus || isBase) focus.push(values);
                    if (!isHover && !isFocus) base.push(values);
                }
            });
            
            let assemble = defs =>
            {
                let reducer = (obj, spec) =>
                {
                    Object.keys(spec).forEach(key => { obj[key] = [ ...(obj[key] || []), spec[key] ] });                                     
                    return obj;
                }
                
                return defs.reduce(reducer, {});
            }
            
            return extend(assemble, { _: base, hover, focus });
        },
      
        provideExtensionContext()
        {
            return (group, spec) =>
            {
                let id = 'ext' + uid.next();
                
                this[group] = { ...this[group], [id]: spec };
                
                return () =>
                {
                    let { [id]: _, ...others } = this[group];
                    this[group] = others;
                }
            }
        },

        resolveDims(height, width, prefix)
        {
            let dims = {};
            
            let heightProp = prefix ? prefix + 'Height' : 'height';
            let widthProp = prefix ? prefix + 'Width' : 'width';
            
            if (height || height === 0)
                dims[heightProp] = toPixels.str(height);
                
            if (width || width === 0)
                dims[widthProp] = toPixels.str(width);
            
            return dims;          
        }
    }
}
</script>
