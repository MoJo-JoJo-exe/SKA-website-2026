# AI HANDOFF & MASTER SYSTEM PROMPT
## Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)

> **Instructions for any AI assistant (ChatGPT, Claude, Cursor, v0, Windsurf, Midjourney, etc.) working on this project:**
> Read this document completely before proposing copy, designing graphics, or writing code. This project has an established visual language, interaction engine, and strict factual boundaries. Preserve them.

---

## 1. Project Identity & Verified Facts

- **Institution**: Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)
- **Nature**: Authentic, generational **Baidya family Ayurvedic clinic and botanical pharmacy** in Kathmandu, Nepal.
- **Location**: Bagbazar, Kathmandu 44600, Nepal.
  - **Important Ward Clarification**: In historical municipal numbering, the clinic was located in **Ward 31**. Under current municipal delimitation, Bagbazar is **Ward 28**.
  - **Rule**: Do **NOT** combine "31" and "Bagbazar" as a single street address ("31 Bagbazar" is deprecated). Only mention ward numbering where necessary (such as in legal address blocks: `Bagbazar, Ward No. 28 (formerly Ward 31), Kathmandu 44600`).
- **Heritage**: Documented in archival color photography dated **1968 AD (2025 BS)** showing the traditional corner shopfront on Bagbazar road. Historical royal family associations and unbroken generational Baidya stewardship.
- **Official Contact Details**:
  - **Official Email**: `shreekrishna_aush@hotmail.com`
  - **Landline (Dispensary)**: `01-5322079`
  - **Mobile (Direct Inquiries)**: `984-3748078`
  - **WhatsApp Business**: `+977 984-3748078` (`https://wa.me/9779843748078`)
  - **Instagram**: `@into_the_ayurveda` (`https://www.instagram.com/into_the_ayurveda/?hl=en`)
  - **Google Maps**: `https://maps.app.goo.gl/NF5HAXusb7DdSV8k9`
- **Operating Hours**:
  - **Herbal Pharmacy & Dispensary**: **7:00 AM – 8:00 PM**, Daily (Sunday through Saturday, 365 days).
  - **Doctor Consultations**: **9:00 AM – 11:00 AM**, Sunday through Friday (Closed Saturdays for doctor consultations; pharmacy remains open).
- **International Capabilities**: Formulates and supplies classical and customized Ayurvedic medicines to partner companies across Europe and internationally.

---

## 2. Visual & Architectural Design System

- **Aesthetic Direction**: Warm editorial wellness meets living Himalayan heritage. Inspired by high-end modern layout references (Havenly, Enblox) featuring warm amber radial glows, soft momentum scrolling, rounded geometry, and monumental bilingual typography.
- **Color Palette**:
  ```css
  --c-bg-primary: #FDFBF7;      /* Warm paper ground */
  --c-bg-secondary: #FFFFFF;    /* Clean card surfaces */
  --c-bg-dark: #1A2C22;         /* Deep botanical forest (temperature shift sections) */
  --c-bg-footer: #0A0A09;       /* Deep near-black footer */
  --c-accent-primary: #1A2C22;  /* Forest green for buttons and badges */
  --c-accent-hover: #2A3F30;    /* Interactive button hover */
  --c-accent-ochre: #87591A;    /* Archival brass/ochre (WCAG AA 5.85:1 contrast) */
  --c-accent-warm: #E8D5B7;     /* Soft amber highlight */
  --glow-warm: radial-gradient(circle at center, rgba(232, 213, 183, 0.8) 0%, rgba(212, 165, 116, 0.4) 40%, rgba(196, 149, 106, 0) 70%);
  ```
- **Typography Pairing**:
  - Headlines/Display: `Instrument Serif` (Google Fonts)
  - Body/UI: `Satoshi` (Fontshare)
  - Cultural/Devanagari: `Noto Serif Devanagari`
- **Key UI Components**:
  - **Pill Badges (`.pill`)**: `border-radius: 100px;` with live indicator dot (`.pill__dot`).
  - **Pill Buttons (`.btn`)**: `border-radius: 100px;` with smooth hover lift and SVG arrow micro-interaction.
  - **Image Frames (`.img-frame`)**: `border-radius: 24px; overflow: hidden;` with subtle warm-tinted shadow (`--shadow-warm`).
  - **Cards (`.service-card`, `.med-card`, `.visit__card`)**: `border-radius: 24px;` with smooth hover lift (`translateY(-8px)`).
  - **Zero Hidden States in CSS**: All content is 100% visible by default in HTML/CSS (`opacity: 1; transform: none`). GSAP applies dynamic entry animations progressively.

---

## 3. Tech Stack & Motion Engine

- **Vanilla HTML5 & CSS3**: Pure semantic markup with Schema.org `MedicalClinic` JSON-LD. Zero CSS frameworks (no Tailwind, no Bootstrap).
- **Offline / Local Scripts** (`assets/js/`):
  - **Lenis 1.1.18** (`assets/js/lenis.min.js`): Smooth scroll physics without touch-hijacking.
  - **GSAP 3.12.5 & ScrollTrigger** (`assets/js/gsap.min.js`, `assets/js/ScrollTrigger.min.js`): Standalone timeline for Hero on load; ScrollTrigger for subsequent sections.
- **Zero Build Tools**: No Node/npm, Webpack, or Vite needed to run. Simply run `python -m http.server 8088` or deploy directly to Netlify, Vercel, or GitHub Pages.

---

## 4. Photography & Asset Inventory

All images are located in `assets/images/`:

| Filename | Role & Placement | Notes |
| :--- | :--- | :--- |
| `facade-full.jpg` | **Hero Visual Plane** & **Gallery Bento** | Three-story historic ochre building with traditional timber windows. |
| `heritage-1968-bagbazar.jpg` | **1968 AD Archival Spotlight** & **Gallery** | 1968 AD (2025 BS) photograph with pulsing locator pin on right corner shopfront. |
| `facade-timber-eaves.jpg` | **European Partnership Section** | Angled perspective of building facade with blue timber eaves. |
| `street-entrance-perspective.jpg` | **Gallery Bento (Tall portrait)** | Street-level view looking up at registered door entrance. |
| `dispensary-interior.jpg` | **About Section** & **Gallery Bento** | Wide wooden counter, classical amber glass bottles, authentic scales. |
| `century-heritage.jpg` | **Gallery Bento** | Upper facade adorned with festive orange marigold garlands. |
| `signboard-detail.jpg` | **Gallery Bento** | Historic hand-painted clinic signboard. |
| `indoor-signboard.jpg` | **Formulations Section** | Traditional Devanagari signboard (`आयुर्वेदीय हरेक औषधि पाइन्छ`). |
| `street-context.jpg` | **Visit Landmark Banner** | Bagbazar street approach. |
| `product-shilajit.jpg` | **Medicines Showcase Card 1** | Pure Himalayan Shilajit (शुद्ध शिलाजीत) in traditional box. |
| `product-ashwagandha.jpg` | **Medicines Showcase Card 2** | Ashwagandha Churna (अश्वगन्धा चूर्ण) with visible clinic seal. |
| `product-triphala.jpg` | **Medicines Showcase Card 3** | Triphala Tablets (त्रिफला वटी) bottle. |
| `product-sitopaladi.jpg` | **Medicines Showcase Card 4** | Sitopaladi Churna (सितोपलादि चूर्ण) bottle. |

---

## 5. PROMPT TEMPLATE TO PASTE INTO OTHER AIs

Copy and paste the prompt below into ChatGPT, Claude, Gemini, or any creative AI for copy, text, layout, or graphic critique:

```markdown
You are an expert creative director, copywriter, and brand strategist specializing in luxury wellness, traditional medicine, and heritage institutions (similar to Aesop, Buly 1803, Forest Essentials, Kama Ayurveda).

Review the website structure, copy, and visual identity of:
**Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)**
Historic Baidya Family Ayurvedic Clinic & Pharmacy in Bagbazar, Kathmandu, Nepal.

### Essential Business Context:
- **Heritage**: Generational Baidya family practice. Archival color photography from 1968 AD (2025 BS) confirms continuous operation on Bagbazar road. Historic royal associations exist in family archives.
- **Location**: Bagbazar, Kathmandu (Ward 28, formerly Ward 31). Note: Never write "31 Bagbazar" as a single street name.
- **Services**: 
  - Pharmacy & Dispensary: 7:00 AM – 8:00 PM Daily (Sunday–Saturday).
  - Doctor Consultations: 9:00 AM – 11:00 AM (Sunday–Friday).
  - Custom Compounding & European Export: Formulating bespoke botanical compounds for European partner companies.
- **Visual Identity**: Warm paper ground (#FDFBF7), deep botanical forest green (#1A2C22), warm archival ochre (#87591A), glowing amber radial gradients, typography using Instrument Serif + Satoshi + Noto Serif Devanagari.
- **Official Email**: shreekrishna_aush@hotmail.com | Phone: 01-5322079, 984-3748078

### What I need from you:
1. **Copywriting Critique & Refinement**: Review headline and section copy across Hero, 1968 Heritage, About, Consultations, Classical Medicines, and European Export. Suggest elevated, poetic, yet strictly authentic text variations that honor Himalayan botanical traditions without sounding like generic spa marketing.
2. **Graphic & Visual Suggestions**: Propose art direction ideas for photography, product presentation, certificate/archival displays, and packaging presentation.
3. **Product Showcase Expansion**: Suggestions on how to display more of our 37 proprietary products (herbal churnas, vatis, oils, Shilajit) in a "low-key, dignified, and editorial" manner that does not look like a commercial e-commerce store.
4. **Heritage Storytelling**: How best to frame the upcoming historical photos (including photos with the King and archival royal correspondence) once uploaded.
```
