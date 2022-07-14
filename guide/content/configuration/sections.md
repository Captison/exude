
Here we discuss the different sections of the Library Configuration Object (LCO) and the types of data that can be configured.

---

## `basis`

Global behavior for the library.

__`defaultOverscroll`__ (string):  
Sets a default CSS overscroll value to be used across library blocks.

__`namespace`__ (string):  
Set a unique string here to help prevent potential name collisions (experimental).

__`stime`__ (number):  
Scale time unit value (milliseconds).  Raw numbers specified as time values will be multiplied by this number.

__`sunit`__ (number):  
Scale size unit value (pixels).  Raw numbers specified as pixel values will be multiplied by this number.

---

## `animation`

Library animation elements.

__`keyframes`__ (object):
Defines CSS keyframes definitions for reuse.

---

## `color`

Library colors.

__`named`__ (object):  
Defines enumerated color names mapped to valid CSS color values.  Aliases can be defined here by setting a key to the value of another.

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
Defines enumerated icon names mapped to SVG icon markup.  Aliases can be defined here by setting a key to the value of another.

__`loader`__ (function):  
Specifies a function that accepts an icon name and returns a Promise that resolves to SVG icon markup.

---

## `shadow`

Library shadow definitions.

__`named`__ (object):  
Defines enumerated shadow definition(s).  The color portion of the definition must be a named color as defined in the LCO.  Aliases can be defined here by setting a key to the value of another.
