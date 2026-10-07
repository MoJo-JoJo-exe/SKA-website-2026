# Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)
### Historic Baidya Family Ayurvedic Clinic & Apothecary · Bagbazar, Kathmandu, Nepal

[![Live Website](https://img.shields.io/badge/Live_Site-mojo--jojo--exe.github.io%2FSKA--website--2026-16241C?style=for-the-badge)](https://mojo-jojo-exe.github.io/SKA-website-2026/)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG_AA_Pass-87591A?style=for-the-badge)](#)
[![Zero Build](https://img.shields.io/badge/Architecture-Zero_Dependencies-16241C?style=for-the-badge)](#)

Official digital archive and institutional website for **Shree Krishna Aushadhalaya** (श्री कृष्ण औषधालय), a historic generational Baidya family Ayurvedic clinic, botanical pharmacy, and licensed compounding institution located on Bagbazar road in central Kathmandu, Nepal. Documented in archival color photography since **1968 AD (2025 BS)**.

---

## 🌐 Live Website

- **Production URL**: **[https://mojo-jojo-exe.github.io/SKA-website-2026/](https://mojo-jojo-exe.github.io/SKA-website-2026/)**
- **Repository**: [https://github.com/MoJo-JoJo-exe/SKA-website-2026](https://github.com/MoJo-JoJo-exe/SKA-website-2026)

---

## 🏛️ Verified Institutional Information

| Field | Detail |
|---|---|
| **Institution** | Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय) |
| **Tradition** | Generational Baidya Family Stewardship · Ayurvedic Medicine & Compounding |
| **Exact Address** | Bagbazar, Ward No. 28, Kathmandu 44600, Nepal |
| **GPS Coordinates** | `27°42'21.0"N 85°19'04.0"E` (Decimal: `27.705833, 85.317778`) |
| **Herbal Pharmacy** | **7:00 AM – 8:00 PM**, Daily (Sunday – Saturday, 365 days a year) |
| **Doctor Consultations** | **9:00 AM – 11:00 AM**, Sunday through Friday *(Closed Saturday for consultations)* |
| **Landline** | `01-5322079` |
| **Mobile** | `984-3748078` |
| **WhatsApp Business** | `+977 984-3748078` ([Chat Direct](https://wa.me/9779843748078)) |
| **Official Email** | `shreekrishna_aush@hotmail.com` |
| **Instagram** | [@into_the_ayurveda](https://www.instagram.com/into_the_ayurveda/?hl=en) |
| **Google Maps Pin** | [View on Google Maps](https://maps.app.goo.gl/NF5HAXusb7DdSV8k9) |

---

## 🎨 Editorial Art Direction: *The Apothecary Archive*

The website is art-directed as a **contemporary editorial publication and archival museum catalogue** for a century-old Himalayan medical institution. It avoids the visual cliches of wellness startups, spa templates, or standard ecommerce grids.

### Narrative Architecture
1. **01 · Title Plate (Hero)**: All-caps monumental serif masthead (`SHREE KRISHNA AUSHADHALAYA`), bilingual Devanagari identity, archival coordinate header, real operational footnote, and 6px framed facade plate.
2. **02 · The Institution**: 4-column editorial strip defining Clinical Practice, Herbal Pharmacy, Compounding, and Global Reach.
3. **03 · The 1968 Archive**: Monumental `1968` archival exhibition plate with hairline museum annotation and curatorial caption.
4. **04 · Our Practice**: Three-column essay on generational stewardship, classical dispensary stocks, and holistic constitutional balance (Prakriti / Vikriti).
5. **05 · The Apothecary**: Materia Medica specimen compendium with classification filters (Churnas, Vatis, Minerals, Classical Blends), specification ledgers, and interactive specimen lightbox.
6. **06 · Clinical Consultation**: Architectural consultation hours folio paired with "A Day at the Aushadhalaya" operational rhythm timeline.
7. **07 · Formulation Partners**: Dark botanical temperature shift detailing classical compounding and export partnerships across Europe.
8. **08 · The Visual Archive**: Asymmetric architectural gallery of authentic Bagbazar signboards, doors, timber eaves, and street context.
9. **09 · Visit Bagbazar**: Street approach photography, interactive Google Map embed, complete contact details, and direct action CTAs.
10. **10 · Archival Colophon**: Comprehensive archive directory, official contact channels, and monumental watermark seal (`श्री कृष्ण औषधालय`).

---

## 📂 Codebase & File Structure

```
SKA-website-2026/
├── index.html            # Semantic HTML5 archival publication with Schema.org JSON-LD
├── styles.css            # Complete design system: tokens, editorial grid, responsive rules
├── script.js             # Lenis smooth scroll, GSAP ScrollTrigger reveals, filter & lightbox
├── all-in-one.html       # Bundled standalone distribution file (zero external requests)
├── bundle.cjs            # Inliner build utility (generates all-in-one.html)
├── favicon.svg           # High-contrast Devanagari typographic favicon (श्री)
├── .nojekyll             # Prevents GitHub Pages Jekyll processing
├── DESIGN.md             # Art direction specification & design token system
├── AI_HANDOFF.md         # Master guide & boundary rules for AI contributors
└── assets/
    ├── js/               # Vendored local copies (GSAP, ScrollTrigger, Lenis)
    └── images/           # Super-sampled, high-fidelity architectural & product photography
```

---

## 🚀 Running Locally

The project requires **no compilers, no npm dependencies, and no build pipeline** to run.

```powershell
# Open with any local HTTP server:
python -m http.server 8080
# or
npx serve .
```

Visit `http://localhost:8080` in any browser.

To regenerate the standalone `all-in-one.html` bundle after editing:
```powershell
node bundle.cjs
```

---

## ♿ Accessibility & Performance Standards

- **WCAG 2.1 AA Compliant**: All text combinations meet or exceed the 4.5:1 contrast minimum (e.g. `--c-accent-ochre` #87591A has a 5.85:1 contrast ratio against the paper background).
- **Keyboard Navigation**: Dedicated `:focus-visible` styling on all interactive links, filters, and buttons.
- **Prefers-Reduced-Motion**: Complete animation bypass when users request reduced motion in system settings.
- **Image Optimization**: Hero image uses `loading="eager"` and `fetchpriority="high"`; all subsequent photographic plates use native `loading="lazy"`.
- **Zero Third-Party Trackers**: Self-contained fonts and vendored scripts.

---

## 📄 License & Attribution

© Shree Krishna Aushadhalaya. Historic Baidya family Ayurvedic institution, Bagbazar, Kathmandu. All rights reserved.
