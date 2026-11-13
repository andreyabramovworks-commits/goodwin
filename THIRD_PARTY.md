# Third-party sources

## React Bits — Circular Carousel
- Source: https://github.com/DavidHDev/react-bits
- Reference: https://reactbits.dev/components/circular-carousel
- Pinned source revision: 9d9c687dc4f55b23539aa5417b703078047efa74
- Original paths: src/content/Components/CircularCarousel/CircularCarousel.jsx and .css
- Local paths: src/react-bits/CircularCarousel.jsx and .css
- License: MIT + Commons Clause; full notice is retained in src/react-bits/LICENSE.md.
- Usage: finished Goodwin website only, not a component pack or a standalone export.
- Adaptations: Russian accessibility labels; previous/next API; pause on keyboard focus; stop idle frame loop; original news titles; CSS photographic reflections and shadows; mobile swipe rail and reduced-motion fallback.

Electric Logo was evaluated and implemented in an intermediate local pass, then removed at the user's explicit request. Final logos use the original repository asset without animation. OGL has been removed from package dependencies.

## Runtime and build
- React / React DOM 19.3.1 — MIT, https://github.com/facebook/react
- esbuild 0.28.2 (build-time only) — MIT, https://github.com/evanw/esbuild
- Bundled notices: assets/enhancements.js.LEGAL.txt.

## Native browser foundations
- Dialog: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
- Web Animations: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
Native dialog semantics and bounded cancellable transitions preserve the static site architecture. No third-party modal runtime is needed.

Existing repository media, font references, brand assets and developer attribution are preserved. Their provenance is unchanged by this local UI refinement.

## Footer signature — user-supplied approved package
- Source package: `sibiryakk-plashka.zip`, supplied by the site owner on 13 November 2026.
- Local assets: `assets/footer/mark.svg`, `assets/vendor/three/three.module.js`, `assets/vendor/three/SVGLoader.js`.
- Runtime: Three.js 0.180.0 (MIT, https://github.com/mrdoob/three.js) and SVGLoader from the same package, stored locally. Cormorant Garamond is served by Google Fonts under the SIL Open Font License, https://fonts.google.com/specimen/Cormorant+Garamond.
- Integration: the supplied plaque is rendered directly in the footer (not as a framed page). It preserves the 3D sign, smooth turn, carved wood treatment, animated lettering, light sweep, wood plane, and reduced-motion mode.
- Fallback: the supplied SVG mark remains visible if WebGL cannot load.

## Controls refinement — Radix Themes reference
- Source: https://github.com/radix-ui/themes
- Inspected revision: 1faff10ac26ae17f09944d418c6949b93fc6b566
- Official examples: https://www.radix-ui.com/themes/docs/components/button and https://www.radix-ui.com/themes/docs/components/radio-cards
- Inspected CSS: `packages/radix-ui-themes/src/components/button.css`, `_internal/base-button.css`, `radio-cards.css`.
- Adaptation: solid/surface button hierarchy, fixed minimum target height, medium weight, bounded radii, distinct hover/focus and selected surface. Implemented as scoped native CSS in `controls.css`; Radix runtime is not installed. Existing mentor composition, buttons and selection behavior are retained.
- License: MIT, copyright WorkOS; notice retained in `src/radix-themes-LICENSE.txt`.

## Shared atmosphere and glass reader, v6.6
- React Bits Aurora, same pinned source revision `9d9c687dc4f55b23539aa5417b703078047efa74` as Circular Carousel. Original paths: `src/content/Backgrounds/Aurora/Aurora.jsx` and `.css`. Local: `src/react-bits/Aurora.jsx` and `.css`.
- Native WebGL2, no additional dependencies. Adaptation: 30 fps cap, DPR 1, two slow blue layers, one viewport canvas. React wrapper removes it on mobile/reduced motion and pauses it during dialogs. Built-in visibility cleanup retained; CSS atmosphere remains if WebGL is unavailable.
- React Bits GlassSurface official local source reviewed: `src/content/Components/GlassSurface/GlassSurface.jsx` and `.css`. Its CSS fallback/sheen/rim principles inform `polish.css`; the shader and component runtime are not installed. Text uses a separate legible reading surface.
- Both references use the retained MIT + Commons Clause notice in `src/react-bits/LICENSE.md`. This is a finished site adaptation, not a component library.
