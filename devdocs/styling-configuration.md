
# Styling Configuration

As a fully-configurable base-level UI library, Exude operates on a Library Configuration Object (LCO) to define styling and asset availability.  It also uses [Stitches](https://stitches.dev/) to manage its CSS-in-JS styling infrastructure.


## Styling Base

Code that handles style application and base LOC structure can be found at __/source/styles/vars__.

__`setStyles` function__ 
Defined in the __index.js__ file, this function allows for custom LCO(s) to replace the current one.  The object arguments are deep-merged together in the order given, with the LCO from __required.js__ added at the end to ensure structural integrity.  The function also clears all style loader caches.

__required.js__
As alluded to above, this file serves to define the required structure of the LCO.  Anything added here will be a part of **every** LCO in operation, as this object is the final merge whenever the operating LCO is updated.  Additionally, the structural LCO enforces the root-level structure, so extraneous elements found in custom LCOs will be eliminated.


## Style Loaders

The functions under __/source/styles/loaders__ calculate styling based on a given set of parameters.  Effectively, these functions are used translate the expressive component prop values into CSS styles.

Generally, each of these functions...

- must be pure (same inputs = same output, no side effects).
- returns either a valid CSS value or an object containing a valid CSS ruleset.
- will cache (or not cache) their data as appropriate.
- should attach a `clearCache` function to clear the cache (if applicable).
