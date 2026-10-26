# Mobile Hero Slider Text Overlay Refinement — Sree Laxmi Developers

This update refines the mobile and tablet layout of the Sree Laxmi Developers homepage hero slider so that the eyebrow label, two-line serif heading, CTA button, and navigation arrows overlay the residential photograph directly—matching the desktop visual hierarchy and eliminating the stacked navy panel below the image.

## User Review & Critical Decisions

> [!IMPORTANT]
> The existing desktop layout, website header, slide photographs, and two-line desktop heading structure remain completely untouched. Only the responsive overlay positioning and mobile/tablet rules within the hero slider will be updated.

- **Confirmed Decision 1 — Unified Overlay Composition on Mobile**: Remove the stacked flex column layout on mobile that separated the image above a solid `#01183C` text block. Instead, position the content overlay (`position: absolute`) directly across the lower-middle region of the slider image container with a measured bottom-to-top `#01183C` / `#001E3D` gradient scrim.
- **Confirmed Decision 2 — Non-Overlapping Controls & CTA Alignment**: Keep the single CTA button left-aligned below the two-line serif heading and anchor the previous/next arrow controls near the bottom-right corner inside the slider boundaries with dedicated horizontal clearance so they never collide with the CTA or heading.

---

## 1. Overview & Core Concept

- **What It Does**: Adapts the desktop luxury real estate hero slider composition seamlessly to tablet and mobile screens by overlaying the brand kicker, two-line serif headline, primary CTA button, and discreet arrow controls directly over the residential photography.
- **Target Audience / Persona**: Prospective luxury homebuyers and real estate investors browsing Sree Laxmi Developers on mobile phones, tablets, and desktop screens.
- **Key Value**: Eliminates the awkward empty navy panel beneath the mobile image while preserving both architectural visibility in the upper/right frame and crisp typographic contrast in the lower-left overlay zone.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. On mobile and tablet viewports, the visitor lands on the two-slide hero immediately below the sticky header.
  2. The residential photograph fills the slider frame, with a directional bottom-to-top and left-to-right navy gradient overlay (`#01183C` / `#001E3D`) providing high contrast for the text in the lower-middle region while leaving the upper architecture clearly visible.
  3. The visitor can tap the single CTA button (**Explore Our Projects** on Slide 1, **View All Projects** on Slide 2) or navigate between slides via touch swipe gestures or the bottom-right arrow controls.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Minimalist, high-end architectural real estate showcase.
  - *Color Palette & Mood*:
    - `--hero-primary`: `#01183C` (Deep Royal Navy)
    - `--hero-secondary`: `#001E3D` (Secondary Navy Accent)
    - `--hero-gold`: `#D4AF6A` (Champagne Gold for eyebrow kicker, CTA border, and active accents)
    - `--hero-white`: `#FFFFFF` (Primary headline and button label)
  - *Typography & Hierarchy*:
    - Eyebrow Kicker: `Plus Jakarta Sans`, uppercase, champagne gold (`#D4AF6A`), `0.18em–0.22em` tracking, preceded by a short gold rule.
    - Main Heading: `Cinzel` serif display face, responsive `clamp()` sizing, left-aligned two-line composition with `#FFFFFF` on line 1 and warm champagne tint (`#F5E6C8`) on line 2.
    - CTA Button: `Plus Jakarta Sans`, semi-bold, `#01183C` background with `1px solid #D4AF6A` border and right arrow icon.
- **Interactive Feedback & Motion**:
  - Continuous 5.5-second auto-rotation with smooth 950ms crossfade and subtle image zoom.
  - Staggered upward fade-in (`translateY(14px)` $\rightarrow$ `0`) for the kicker, heading, and CTA button on slide activation.
  - Full `prefers-reduced-motion` compliance disabling non-essential motion when requested by the operating system.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Absolute Content Overlay vs. Stacked Mobile Panel**:
  - *Chosen Approach*: Keep `.sld-hero__media` filling the slider frame (`position: absolute; inset: 0`) and position `.sld-hero__container` absolutely over the lower-middle area (`position: absolute; left: 0; right: 0; bottom: 0; z-index: 2`) across all breakpoints.
  - *Why*: Ensures mobile looks like a true responsive adaptation of the desktop hero rather than a disconnected two-box card, removing all wasted navy space underneath the photograph.
  - *Alternatives Considered*: Keeping a separate bottom text box was rejected because it compressed the image into the top half of the screen and left a large solid navy block below.
- **Decision 2 — Bottom-Right Arrow Clearance on Mobile**:
  - *Chosen Approach*: Anchor the previous/next arrow controls near the bottom-right corner (`z-index: 3`) and reserve right padding on the mobile action row (or vertical offset on ultra-narrow 320px screens) so the compact CTA button and arrow buttons sit side-by-side without overlapping.
  - *Why*: Preserves single-thumb ergonomics at the bottom of the hero slider while keeping the CTA button compact and touch-friendly (`min-height: 44px`).

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         HeroSlider Container                            │
│              (position: relative; overflow: hidden)                     │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    Slide Layer (Slide 01 / 02)                    │  │
│  │  ┌─────────────────────────────────────────────────────────────┐  │  │
│  │  │  Media Layer (position: absolute; inset: 0; z-index: 1)     │  │  │
│  │  │  • Full-bleed residential photograph                        │  │  │
│  │  │  • Directional #01183C / #001E3D gradient scrim overlay     │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────────┐  │  │
│  │  │  Content Overlay (position: absolute; bottom; z-index: 2)   │  │  │
│  │  │  • Gold Eyebrow Kicker + Decorative Line                    │  │  │
│  │  │  • Two-Line Cinzel Serif Heading (Left-Aligned)             │  │  │
│  │  │  • Single Prominent CTA Button (Explore / View Projects)    │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  Navigation Controls Overlay (position: absolute; bottom-right)   │  │
│  │  • Previous Slide Button  • Next Slide Button                     │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State
- **Slide Data (`HERO_SLIDES`)**: Immutable two-item array holding `id`, `kicker`, `headingLines` (2 strings), `image`, `imageAlt`, and `cta` (`label`, `path`).
- **Component State**:
  - `activeIndex` (`0` or `1`): Tracks the active slide and resets the 5.5s autoplay interval whenever updated.
  - `prefersReducedMotion` (`boolean`): Syncs with `window.matchMedia('(prefers-reduced-motion: reduce)')` to pause auto-rotation when reduced motion is enabled.
  - `touchStartXRef` / `touchEndXRef`: Tracks horizontal touch swipe deltas ($\ge 44\text{px}$) to advance or rewind slides on mobile devices.

### Interactive Component & State Mapping
- **Autoplay Timer Effect**: Advances `activeIndex` every `5500ms` and cleans up `clearInterval` on unmount or manual interaction.
- **Arrow Buttons & Touch Swipe**: Invoke `goToPrev()` and `goToNext()`, immediately transitioning the active slide opacity and restarting the 5.5s interval.
- **CTA Navigation**: React Router `<Link>` navigates directly to `/projects` with proper `tabIndex` management so hidden slides are excluded from the keyboard focus order.
