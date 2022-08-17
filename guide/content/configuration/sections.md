
Here we discuss the different sections of the Library Configuration Object (LCO) and the types of data that can be configured.

Note that all __`named`__ configuration sets support aliasing.  This means that a given key can be set to the value of another, and the final value will be resolved accordingly.  Circular referencing will produce undesired results.

---

## `basis`

Global behavior for the library.

__`namespace`__ (string):  
Set a unique string here to help prevent potential name collisions (experimental).

__`stime`__ (number):  
Scale time unit value (milliseconds).  Raw numbers specified as time values will be multiplied by this number.

__`sunit`__ (number):  
Scale size unit value (pixels).  Raw numbers specified as pixel values will be multiplied by this number.

---

## `background`

Global CSS background configurations.

__`named`__ (object):  
Enumerated CSS background specifications.  Specify CSS background attributes here (camelCase) without the 'background' prefix.

---

## `animation`

Global CSS animation configurations.

__`keyframes`__ (object):  
Defines CSS keyframes definitions.

__`named`__ (object):  
Enumerated CSS animation specifications.  Specify CSS animation attributes here without the 'animation' prefix.

---

## `color`

Library colors.

__`named`__ (object):  
Defines enumerated color names mapped to valid CSS color values.

---

## `font`

Library font styling.

__`defaultFace`__ (string):  
Name of the font family to use when not explicitly specified by a typography component.

__`face`__ (array):  
List of URLs that return CSS font-face declarations.

__`size`__ (object):  
Enumerated font size definition objects containing `fontSize` and `lineHeight` attributes.

__`weight`__ (object):  
Enumerated font weight values.

---

## `icon`

Library SVG icon configuration.

__`defaultSize`__ (number):  
Scale unit value that defines default icon size (height, width).

__`named`__ (object):  
Defines enumerated icon names mapped to SVG icon markup.

__`loader`__ (function):  
Specifies a function that accepts an icon name and returns a Promise that resolves to SVG icon markup.

---

## `shadow`

Global CSS shadow definitions.

__`named`__ (object):  
Defines enumerated shadow definition(s).  The color portion of the definition must be a named color as defined in the LCO.

---

## `transition`

Global CSS transition configurations.

__`named`__ (object):  
Enumerated CSS transition specifications.  Specify CSS transition attributes here (camelCase) without the 'transition' prefix.
