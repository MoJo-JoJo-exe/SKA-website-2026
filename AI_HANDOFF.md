# AI HANDOFF & MASTER SYSTEM PROMPT
## Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)

> **Instructions for any AI assistant (ChatGPT, Claude, Cursor, v0, Windsurf, Gemini, etc.) working on this project:**
> Read this document completely before proposing copy, designing graphics, or writing code. This project has an established visual language, interaction engine, and strict factual boundaries. Preserve them.

---

## 1. Project Identity & Verified Facts

- **Institution**: Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)
- **Nature**: Authentic, generational **Baidya family Ayurvedic clinic, botanical pharmacy, and compounding compendium** in Kathmandu, Nepal.
- **Location**: Bagbazar, Ward No. 28, Kathmandu 44600, Nepal.
- **GPS Coordinates**: `27°42'21.0"N 85°19'04.0"E` (Decimal: `27.705833, 85.317778`)
- **Heritage**: Documented in archival color photography dated **1968 AD (2025 BS)** showing the traditional corner shopfront on Bagbazar road. Historical royal family associations and unbroken generational Baidya stewardship.
- **Official Contact Details**:
  - **Official Email**: `shreekrishna_aush@hotmail.com`
  - **Landline (Dispensary)**: `01-5322079`
  - **Mobile (Direct Inquiries)**: `984-3748078`
  - **WhatsApp Business**: `+977 984-3748078` (`https://wa.me/9779843748078`)
  - **Instagram**: `@into_the_ayurveda` (`https://www.instagram.com/into_the_ayurveda/?hl=en`)
  - **Google Maps**: `https://maps.app.goo.gl/NF5HAXusb7DdSV8k9`
- **Operating Hours**:
  - **Herbal Pharmacy & Dispensary**: **7:00 AM – 8:00 PM**, Daily (Sunday through Saturday, 365 days a year).
  - **Doctor Consultations**: **9:00 AM – 11:00 AM**, Sunday through Friday *(Closed Saturdays for doctor consultations; pharmacy remains open).*
- **International Compounding**: Formulates and supplies classical and customized Ayurvedic medicines to partner companies across Europe and internationally.
- **Production URL**: [https://mojo-jojo-exe.github.io/SKA-website-2026/](https://mojo-jojo-exe.github.io/SKA-website-2026/)
- **GitHub Repository**: [https://github.com/MoJo-JoJo-exe/SKA-website-2026](https://github.com/MoJo-JoJo-exe/SKA-website-2026)

---

## 2. Visual & Architectural Design System: *The Apothecary Archive*

- **Aesthetic Direction**: Contemporary Materia Medica & Archival Institutional Record. Quiet confidence, editorial dignity, architectural restraint, and authentic photographic anchors.
- **Strict Anti-Patterns (DO NOT INTRODUCE)**:
  - ❌ No amber/yellow radial glow orbs or gradient washes.
  - ❌ No generic rounded app cards (`border-radius: 24px` is banned).
  - ❌ No pulsating red radar pins or decorative badges covering historic photos.
  - ❌ No ecommerce shopping carts, price tags, or "Buy Now" buttons.
  - ❌ No invented claims, fake awards, fake certifications, or unverified ingredients.
- **Color Palette**:
  ```css
  --c-bg-primary: #FDFBF7;         /* Warm archival paper ground */
  --c-bg-secondary: #FFFFFF;       /* Crisp white editorial surface */
  --c-bg-surface-tint: #F5EFE6;    /* Subtle warm parchment tint */
  --c-bg-dark: #16241C;            /* Deep botanical forest green */
  --c-bg-footer: #0A0F0C;          /* Deepest near-black forest */
  --c-text-primary: #1C1B18;       /* Primary dark ink */
  --c-text-muted: #5E5852;         /* Secondary editorial body text */
  --c-text-light: #FDFBF7;         /* Light cream text for dark themes */
  --c-text-light-muted: #B3AAA0;   /* Muted light text */
  --c-accent-forest: #16241C;      /* Deep primary forest */
  --c-accent-hover: #263D30;       /* Interactive button hover */
  --c-accent-ochre: #87591A;       /* Archival brass/ochre (WCAG AA 5.85:1 contrast) */
  --c-accent-ochre-light: #D4A574; /* Warm ochre highlight for dark backgrounds */
  ```
- **Typography**:
  - Headlines/Display: `'Instrument Serif', Georgia, serif`
  - Body/UI: `'Satoshi', -apple-system, sans-serif`
  - Cultural/Devanagari: `'Noto Serif Devanagari', serif`
- **Key UI Atoms**:
  - **Pill Buttons (`.btn`)**: `border-radius: 100px;` with subtle hover lift.
  - **Photographic Plates (`.img-frame`, `.facade-plate`, `.archive-frame`)**: `border-radius: 6px` (or `4px`), hairline borders, quiet captions.
  - **Museum Annotation (`.archive-annotation`)**: Restrained hairline rule (`1px`) with pinpoint dot (`5px`) and muted catalog tag box.
  - **Materia Medica Specimens (`.apothecary-item`)**: Specimen frame with click-to-zoom lightbox, classification index, and specification ledger (`<dl>`, `<dt>`, `<dd>`).

---

## 3. Tech Stack & Engineering Standards

- **Zero-Dependency Core**: Pure semantic HTML5, native CSS3 with custom properties, and vanilla modern JavaScript.
- **Vendored Libraries** (`assets/js/`):
  - **Lenis 1.1.18** (`assets/js/lenis.min.js`): Physics-based smooth scroll tied directly to `gsap.ticker`.
  - **GSAP 3.12.5 & ScrollTrigger** (`assets/js/gsap.min.js`, `assets/js/ScrollTrigger.min.js`): Immediate hero timeline and scroll-triggered section reveals.
- **Accessibility & Motion**:
  - Full keyboard focusability with visible `:focus-visible` styling (`outline: 2px solid var(--c-accent-ochre)`).
  - High contrast (WCAG AA passing throughout).
  - Complete animation and momentum scroll bypass when `prefers-reduced-motion: reduce` is detected.
- **Bundler Utility**: `node bundle.cjs` compiles `index.html`, `styles.css`, and `script.js` into a standalone, portable `all-in-one.html`.

---

## 4. Master Prompt Template for Future AI Collaborators

Copy and paste the prompt below into ChatGPT, Claude, Gemini, or any creative AI for copy, text, layout, or graphic critique:

```markdown
You are an expert creative director, editorial designer, and brand strategist specializing in historic medical archives and traditional pharmacopeias (think contemporary botanical archives, museum catalogues, Aesop, Buly 1803).

Review the website structure, copy, and visual identity of:
**Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)**
Historic Baidya Family Ayurvedic Clinic & Apothecary in Bagbazar, Kathmandu, Nepal.
Live Site: https://mojo-jojo-exe.github.io/SKA-website-2026/

### Essential Business Context:
- **Heritage**: Generational Baidya family practice. Archival color photography from 1968 AD (2025 BS) confirms continuous operation at the corner of Bagbazar road. Historical royal associations exist in family archives.
- **Location**: Bagbazar, Ward No. 28, Kathmandu 44600, Nepal. GPS: 27°42'21.0"N 85°19'04.0"E.
- **Services**: 
  - Herbal Pharmacy & Dispensary: 7:00 AM – 8:00 PM Daily (365 days).
  - Clinical Doctor Consultations: 9:00 AM – 11:00 AM (Sunday–Friday).
  - Custom Compounding & European Export: Formulating bespoke botanical compounds for European partner companies.
- **Visual Identity**: "The Apothecary Archive" — Warm archival paper ground (#FDFBF7), deep botanical forest green (#16241C), archival ochre/brass (#87591A), Instrument Serif + Satoshi + Noto Serif Devanagari. Architectural plates with 4px–6px radii, no generic rounded cards, no yellow gradients.
- **Official Email**: shreekrishna_aush@hotmail.com | Phone: 01-5322079, 984-3748078 | WhatsApp: +977 984-3748078

### Guidelines for Changes:
1. Maintain strict factual integrity (no invented medical claims, awards, or historical dates).
2. Respect the established "Apothecary Archive" visual identity.
3. Keep all interactions understated, authentic, and dignified.
```
