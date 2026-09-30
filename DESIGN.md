inde# DESIGN SYSTEM SPECIFICATION: SHREE KRISHNA AUSHADHALAYA
## Version 4.0 — Warm Wellness & Bento Motion Architecture

> **Brand**: Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)  
> **Location**: Bagbazar, Ward No. 28 (formerly Ward 31), Kathmandu 44600, Nepal  
> **Core Aesthetic**: Warm Wellness, Editorial Dignity, Fluid Momentum Scrolling, and Authentic Photographic Anchors.

---

## 1. Visual Hierarchy & Architecture

The website translates the unhurried authority of a century-old Ayurvedic practice into a contemporary 2026 digital experience:

1. **Glow-Emitting Arrival (Hero)**:
   - Deep amber radial glow orb (`--glow-warm`) behind the visual plane.
   - Monumental editorial typography in `Instrument Serif`.
   - GSAP Split-Text letterform slide-up animation.
   - Rounded 24px vertical photograph plane extending down toward the trust bar.
2. **Horizontal Trust Ribbon**:
   - Clean, rounded badge presentation confirming registered status, 365-day access, and on-site pharmacy.
3. **Editorial About Spread**:
   - 20px-rounded cinematic dispensary photograph paired with unhurried clinical observation prose.
4. **Heritage Numeric Counter Strip**:
   - Rolling numerical counters (`100+` Years, `365` Days Open, `12hr` Hours, `1:1` Care) rolling up on viewport entrance.
5. **The Methods of Care (Services)**:
   - 3-card elevated grid with Roman numerals (`I`, `II`, `III`), subtle hover lift, and generous padding.
6. **Asymmetric Bento Photographic Archive (Gallery)**:
   - 3-column CSS Grid with tall, wide, and square image specimens.
   - Parallax scroll scrub on all images.
   - Hover scale and smooth upward-sliding caption overlays.
7. **The Apothecary Collection (Deep Forest Temperature Shift)**:
   - Rich contrast shift into deep botanical forest green (`#1A2C22`).
   - Classical formulations catalog with interactive slide-in hover triggers.
8. **Bagbazar Access & Visiting Grid**:
   - Landscape banner of Bagbazar road approach.
   - 3 white elevated cards for Hours, Location & Google Maps, and Direct Lines (Phone + WhatsApp).
9. **Monograph Footer**:
   - Monumental low-opacity Devanagari signature (`श्री कृष्ण औषधालय`) spanning the bottom of the canvas.

---

## 2. Design Tokens

### Colors
```css
--c-bg-primary: #FDFBF7;      /* Warm paper ground */
--c-bg-secondary: #FFFFFF;    /* Clean card surfaces */
--c-bg-dark: #1A2C22;         /* Deep botanical forest */
--c-bg-footer: #0A0A09;       /* Deep near-black footer */
--c-accent-primary: #1A2C22;  /* Forest green interactive */
--c-accent-hover: #2A3F30;    /* Forest green hover */
--c-accent-ochre: #87591A;    /* Archival brass/ochre (5.8:1 contrast, WCAG AA) */
--c-accent-warm: #E8D5B7;     /* Soft gold highlight */
```

### Typography
- **Headlines / Display**: `Instrument Serif`, Georgia, serif
- **Body & UI**: `Satoshi`, -apple-system, sans-serif
- **Cultural Identity**: `Noto Serif Devanagari`
- **Hero Title**: `clamp(3.5rem, 9vw, 8rem)`
- **Section Titles**: `clamp(2.25rem, 5vw, 4.5rem)`
- **Body Text**: `1.0625rem`, line-height `1.7`

### Radii
- Pill Buttons & Badges: `border-radius: 100px;`
- Cards & Image Frames: `border-radius: 24px;`
- Small Elements: `border-radius: 8px;`

---

## 3. Motion & Interaction Specifications
- **Lenis Smooth Scroll**: Initialized with momentum dampening and tied into `gsap.ticker`.
- **ScrollTrigger Reveals**: Triggered at `top 85%` with `power3.out` easing.
- **Split-Text Headlines**: Words wrapped in hidden overflow spans and staggered by `0.05s`.
- **Parallax Scrub**: Parallax translation of `-30px` applied to `.img-frame img`.
- **Zero Layout Thrash**: Animations restricted strictly to `transform` and `opacity`.
