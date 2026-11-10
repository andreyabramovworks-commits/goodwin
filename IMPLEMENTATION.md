# Local version 6 refinement

Audience: people interested in FPV drone racing and their families. Main action: book a club session.
Preserve real instructors, photos, biographies, schedule, telephone, static original logo and the existing icy-blue/graphite identity.

Final requested visual direction:
- One large instructor portrait and biography, with three compact instructor choices below. Warm Manrope typography, no decorative slashes, dividing lines or tiny expertise tags.
- Circular Carousel from React Bits, in its open orbit layout. Story captions on photographs, soft shadows and faded mirror reflections. Only two centered previous/next buttons; manual movement, no autoplay. Large native swipe cards on mobile.
- Original static logos in header/footer. The intermediate Electric Logo treatment was removed at the user's request.
- Proper native dialogs with one scroller, fixed close control, keyboard focus containment/return, Escape/backdrop dismissal and interruptible 300/180ms transitions. Dialogs live in the browser's top layer, outside layout transforms.

Budget: React islands only for the instructor switcher and CSS-3D news carousel. No WebGL, OGL, GSAP or CDN dependencies. Reduced motion retains every story in a static selection grid. Failed enhancement loading retains the original static cards and working dialogs.

Resources evaluated with Web Creator: React Bits matched the user's explicit reference; Embla was leaner but would not provide the requested circular gallery; Radix would require migrating existing dialogs into a separate React tree, so native dialog supplied focus/modal semantics. Native Web Animations handles bounded transitions without an additional motion library.

Design Taste and Impeccable were read. Their generic starter/copy/contact rules were not applied over the existing user content; the user-requested carousel overrides the generic no-carousel preference. The user's latest visual corrections override the initial electric-logo treatment and three-dossier layout.

See THIRD_PARTY.md for exact sources, version and notices; verification.json for actual browser checks. Local refinement does not authorize publishing or GitHub writes.

## Controls review, 2026-11-10
Scope: preserve all section structures, especially the large mentor portrait/bio and three choices below. Replace the inconsistent underlined actions and oversized pills with one restrained button system. Web Creator search shortlisted Base UI, Headless UI, Radix and shadcn/ui. Radix Themes Button and Radio Cards provided the visual references; headless control packages would not themselves improve appearance. Adapted the official CSS patterns to the existing native elements without adding a competing runtime.

`controls.css` is the single scoped override for this pass. Primary blue actions, quieter surface actions, 44–48px targets, 9px button corners, readable mentor choices and full-card selected treatment. No decorative slashes or underline bars; original static logos and existing carousel remain. Versioned local asset URLs avoid reusing the preceding visual pass from browser cache.

Validation: production asset build succeeded; real Chromium selection/profile/Escape/focus checks succeeded. No JS errors or horizontal overflow at 1440, 1024, 768, 390 and 320px. Same one portrait/bio stage and three mentor choices. Evidence: `qa/controls-verification.json`, `qa/controls-desktop-hero.png`, `qa/controls-desktop-team.png`, `qa/controls-desktop-news.png`, `qa/controls-mobile-team.png`.

## Atmospheric depth and softer controls, 2026-11-10
Latest user direction supersedes the squared control treatment above. All decorative link/button arrows were removed, including fallback markup; carousel navigation uses the text labels “Назад” / “Далее” with the same accessible names. Buttons now use rounded silhouettes, a gentle surface highlight and neutral elevation. Mentor section structure is unchanged.

Web Creator references: installed Blue Cloudy Clean Modern for the blue atmospheric field and Beautiful Shadows for layered neutral elevation (CSS equivalents, no Tailwind runtime). `atmosphere.css` applies coordinated light/depth to every main section, fades mirrored photographs beneath the hero/about imagery, and adds elevation to photo frames, the mentor stage, schedule and form. The existing news carousel retains its reflections and mechanics. `atmosphere.js` moves background layers only, on pointer/scroll events; one settling animation loop stops when still, pauses on hidden documents, and is disabled on small screens or reduced motion. No added package dependencies.

Built successfully. Chromium verification: all five viewport widths retain no horizontal overflow; instructor selection/dialog/focus still work; no visible arrow characters remain in controls; next-news selection works; background transform changes with pointer movement and is `none` with reduced motion. No JS errors or failed requests. Evidence: `qa/depth-verification.json`, `qa/depth-motion-verification.json`, `qa/depth-desktop-hero.png`, `qa/depth-desktop-team.png`, `qa/depth-desktop-news.png`, `qa/depth-mobile-team.png`. Local server is bound only to 127.0.0.1:4177.

## Whole-page polish, glass readers and continuous atmosphere, v6.6
Brief: keep the original palette, logos, content and instructor composition; improve photo framing, full news reading, document/news dialogs, inconsistent spacing and motion. Audience and primary action remain club visitors choosing a training session. Native accessible dialogs and mobile reading remain the priority over decorative glass.

Changes: framed hero/about/carousel photography with neutral depth and faded reflections. News descriptions now render their complete source text, not a 165-character excerpt. News reader separates the contained photograph on a dark display surface from the readable article; mobile stacks image then text. Shared translucent glass shell with highlight, blur, rim and contained scroller; document content lives on a readable paper surface. Native close/focus semantics retained. Removed the newsletter CTA including its space, removed the generic hero footer strip, and placed actual session times with a schedule link beneath the hero actions. Balanced about typography, removed its oversized stamp and progressive word blur, raised small functional type to 12px, unified document rows and form corners.

Background selection: Web Creator shortlisted tsParticles, React Bits, Vanta and OGL. React Bits Aurora supplies the requested shared interactive atmospheric motion with no new runtime dependency; Vanta/OGL would introduce an unnecessary engine, and particles would duplicate the former callback decoration. A single fixed WebGL2 canvas sits behind foreground content across sections, with CSS light fallback. Removed the preceding per-section parallax script from active markup and the separate callback particle canvas. Aurora is capped at 30 fps and DPR 1, paused during dialogs/hidden tabs, and unmounted on small screens/reduced motion. Logos remain static.

Validation: production build succeeded. `qa/v66-verification.json`: complete summary matches modal text, desktop media/text positioning, document open, mentor selection, bounded mobile dialog, no overflow at 1440/1024/768/390/320, newsletter and old hero strip absent, no JS errors or failed requests. `qa/v66-final-review.json`: exactly one atmosphere canvas, scene changes, dialog Tab containment/Escape focus return, video playback and pause on close, no-WebGL fallback. Actual screenshots prefixed `qa/v66-` cover hero, gallery, readers, mentors, about, schedule, documents and callback. Impeccable detector was run; its small-text findings informed the final type pass. Remaining nested-card warnings refer to preserved fallback content; the cursor glow is the existing approved drone cursor; generic padding/dash heuristics do not indicate clipped content. User-requested glass and photo frames override generic glass/card-style preferences.

Local preview: http://127.0.0.1:4177/?review=glass-6.6. No deployment or GitHub writes.

## Schedule and visible atmosphere, v6.7
Removed both decorative hero orbit circles from HTML. Schedule now combines day tabs, the existing lesson/session controls, a real training photograph, and an integrated assistance footer. Full weekday names replace abbreviations in tabs; factual times and booking values remain unchanged. The “Нужно другое время?” helper has readable text and a distinct “Подобрать время” action. Instructor composition is untouched.

Increased Aurora opacity, wave amplitude and pointer response so its blue flow is actually visible across sections. Retained one shared canvas, DPR 1, 30 fps cap, dialog/visibility pauses, reduced-motion/mobile fallbacks. No dependencies added.

Build passed. `qa/v67-verification.json`: no JavaScript errors; no overflow at 1440, 1024, 768, 390 and 320px; Saturday tab selection and transfer to form work; alternate-time action reaches callback; hero circles absent. Inspected actual desktop hero, desktop schedule and mobile schedule screenshots (`qa/v67-*.png`). Local preview: http://127.0.0.1:4177/?review=schedule-6.7.

## Schedule photograph, v6.8
Replaced only the schedule photo with the existing `fpv-goggles-training.jpg`, showing a participant in FPV goggles, and adjusted its crop. This avoids repeating the about-section photograph. No website copy changed, per user's instruction. Verified image composition in desktop/mobile captures and retained schedule booking behavior with no overflow (`qa/v68-verification.json`). Preview: http://127.0.0.1:4177/?review=photo-6.8.

## Version 7 — evidence-based copy and typography
Applied the explicitly requested website-copy-typography skill (v0.2.0), its existing-site rewrite, typography, block-patterns and copy-QA references. Original v6 is committed/tagged separately. v7 is a separate worktree/branch; main stays on v6.

Evidence and deliverables live in `content/`: original client messages, before/after inventory of 156 original elements, evidence ledger, section jobs, every photo/story match, complete final public copy, unresolved client facts and type roles. Four general client texts became four evergreen articles; two photo-only cards became descriptive notes. No event dates, identities, achievements, pricing or equipment entitlements were inferred from photographs. Speed/flight-duration/acceleration claims and broad automation claims were withheld or scoped. Existing instructor and schedule section HTML is byte-equivalent after newline normalization; four telephone links and displayed numbers remain the same.

Replaced vague hero/about copy, added concrete learning directions and FAQ, aligned action labels with actual destinations, and made demo form behavior truthful. Real contact remains the unchanged telephone; no backend is invented. New field errors, linked error summary, preserved values and local validation do not imply a successful transmission. PDF controls now explain future availability instead of claiming an existing download. Existing legal placeholder content is not presented as an approved policy.

Manrope is embedded locally with verified Cyrillic support and OFL notice. `typography.css` supplies relative role tokens, balanced headings, readable article sections, line measures, mobile composition and spacing resilience. Long article dialogs restart at the top when reopened, retain native focus containment/Escape return, and keep the original photographs/video. Main design, reflections, interactive atmosphere, static logos and instructor composition are retained.

Verification: `npm run check`, production build, actual Chromium desktop/mobile screenshots, 1440/1024/768/390/320 widths, 200% and 400% reflow-equivalent CSS viewports (640/320 at DPR 2/4 from a 1280px physical width), WCAG-style text-spacing overrides, complete six-reader content and scroll start, input errors, FAQ, video presence, focus recovery, reduced motion and enhancement-failure fallback. These are desktop-browser emulations, not physical-phone certification. No JavaScript errors/failed requests in the supported primary path. A deeper element-bound check caught and fixed hero overflow under text-spacing override. The initial form-radio test was changed to click its visible label, consistent with the custom native-radio UI. The initial body-CSS-zoom experiment was replaced by accurate CSS-viewport reflow-equivalent checks; no claim is made that a physical browser toolbar zoom was operated.

Impeccable clarify/typeset/harden references informed the final contextual pass. Type detector still reports one generic 11px warning from the layered incumbent CSS; direct computed-style inspection of all visible text found no 11px text after the final document-action override. This is recorded rather than presented as a clean detector result. Factual questions (price, address, equipment, official documents, recipient/backend, event details) remain in `content/editorial-brief.md`; copy cannot establish those facts.

Preview: http://127.0.0.1:4178/?review=copy-v7. Publication to GitHub branch/tag v7 is authorized; no server deployment is included.
