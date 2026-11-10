# Goodwin v7 — verification record

Saved on 2026-11-10 before publication.

## Included in this revision

- React Bits-inspired animated Frame Border around the hero FPV image.
- Depth response retained for pointer devices; touch devices receive a stable, lightweight composition.
- Native mobile layout pass for header, hero, club story, schedule, news, instructors, documents, callback form, and footer.
- Touch targets and form controls enlarged for phones.
- Safe-area support added through `viewport-fit=cover` and environment insets.
- Mobile gallery, instructor selector, and long news copy adapted for swipe and progressive disclosure.

## Checks run

- `npm run build` — passed.
- `git diff --check` — passed (line-ending notices only).
- Playwright mobile audit — passed at 320×568, 390×844, 430×932, and 844×390.
- No horizontal page overflow detected at tested phone widths.
- Generated evidence is stored in `artifacts/mobile-audit/` and `artifacts/mobile-sections/`.

## Known non-blocking details

- Compact technical micro-labels inside the FPV frame intentionally remain 10px on phones; they are decorative and not required to operate the site.
- The animated frame respects `prefers-reduced-motion` and becomes static when reduced motion is requested.
