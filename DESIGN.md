# DESIGN SYSTEM SPECIFICATION: SHREE KRISHNA AUSHADHALAYA
## Version 5.0 — The Apothecary Archive (Editorial Publication System)

> **Institution**: Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)  
> **Location**: Bagbazar, Ward No. 28 (formerly Ward 31), Kathmandu 44600, Nepal  
> **Art Direction Concept**: *The Apothecary Archive* — Contemporary Materia Medica & Archival Institutional Record  
> **Core Aesthetic**: Restrained, authentic, quiet confidence, architectural precision, and editorial typography.

---

## 1. Visual Hierarchy & Philosophy

The site rejects generic wellness startup cliches (such as neon gradients, floating cards, artificial shadows, and wellness stock imagery) in favor of the timeless dignity of an archival museum catalogue:

1. **Restraint Over Decoration**: Negative space is intentional. Content is organized with hairline dividers (`1px solid var(--c-border-subtle)`), understated catalog numbers, and clear typographic scale relationships.
2. **Authentic Photographic Plates**: Archival and neighborhood photographs are presented as photographic plates (`border-radius: 6px` or `4px`), never inside bubbly cards.
3. **Specimen Presentation**: Formulations in the Apothecary section are mounted as classical materia medica entries with archival registration numbers (`PLATE 01`, `CATALOG REF. SK-SPEC-01`), classification indicators, and specification ledgers (`<dl>`, `<dt>`, `<dd>`).
4. **Architectural Folio Layouts**: The Consultation section uses clean parchment backgrounds with structured schedule rules rather than generic software pricing tiers.

---

## 2. Design Tokens

### Canvas & Ground Colors
```css
--c-bg-primary: #FDFBF7;         /* Warm archival paper ground */
--c-bg-secondary: #FFFFFF;       /* Crisp white editorial surface */
--c-bg-surface-tint: #F5EFE6;    /* Subtle warm parchment tint */
--c-bg-dark: #16241C;            /* Deep botanical forest green */
--c-bg-dark-surface: #1E3328;   /* Slightly lighter dark green */
--c-bg-footer: #0A0F0C;          /* Deepest near-black forest */
```

### Inks & Typography
```css
--c-text-primary: #1C1B18;       /* Primary dark ink */
--c-text-muted: #5E5852;         /* Secondary editorial body text */
--c-text-light: #FDFBF7;         /* Light cream text for dark themes */
--c-text-light-muted: #B3AAA0;   /* Muted light text */
```

### Accents & Archival Metals
```css
--c-accent-forest: #16241C;      /* Deep primary forest */
--c-accent-hover: #263D30;       /* Interactive button hover */
--c-accent-ochre: #87591A;       /* Archival brass/ochre (5.85:1 contrast, WCAG AA) */
--c-accent-ochre-light: #D4A574; /* Warm ochre highlight for dark backgrounds */
--c-tint-pill: rgba(135, 89, 26, 0.08);
```

### Typography Stack
- **Headlines / Display**: `'Instrument Serif', Georgia, serif`
- **Body & Editorial Meta**: `'Satoshi', -apple-system, sans-serif`
- **Cultural Identity / Devanagari**: `'Noto Serif Devanagari', serif`

### Type Scale
```css
--text-hero: clamp(2.75rem, 8.5vw, 7.5rem);
--text-giant: clamp(4.5rem, 13vw, 12rem);
--text-section: clamp(2.25rem, 5vw, 4.25rem);
--text-headline: clamp(1.75rem, 3.5vw, 2.75rem);
--text-sub: clamp(1.125rem, 2vw, 1.4rem);
--text-body: 1.0625rem;
--text-small: 0.875rem;
--text-meta: 0.75rem;
```

### Geometry & Sizing
- **Container Width**: `1360px`
- **Container Padding**: `clamp(1.25rem, 4vw, 3.5rem)`
- **Section Padding**: `clamp(5rem, 7vw, 7.5rem) 0`
- **Plate Radii**: `4px` to `6px`
- **Pill Buttons**: `border-radius: 100px`

---

## 3. Interaction & Motion Rules

- **Lenis Smooth Scroll**: Gentle physics (`duration: 1.35`) synchronized to `gsap.ticker`.
- **Restrained Scroll Reveals**: Sections below the hero reveal via gentle `y: 30px` fade-ups (`duration: 0.85s`, `power3.out`).
- **Tactile Filtering**: Apothecary category buttons trigger instant DOM display toggles with gentle GSAP opacity cross-fades.
- **Specimen Inspection Lightbox**: Clicking any product specimen opens a darkened high-resolution lightbox with backdrop blur (`#lightboxOverlay`).
- **Accessible Focus**: High-visibility `:focus-visible` styling (`outline: 2px solid var(--c-accent-ochre); outline-offset: 3px;`) for keyboard navigation.
- **Reduced Motion**: Gracefully bypassed when `prefers-reduced-motion: reduce` is detected.
