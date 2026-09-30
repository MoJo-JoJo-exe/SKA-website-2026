# Shree Krishna Aushadhalaya (श्री कृष्ण औषधालय)
### Authentic Ayurvedic Clinic & Dispensary · 31 Bagbazar, Kathmandu, Nepal

Official website codebase for Shree Krishna Aushadhalaya, built with a modern wellness aesthetic featuring warm radial glows, Lenis smooth scrolling, GSAP scroll-driven animations, an authentic Bento image gallery, and full WCAG AA accessibility.

---

## 🚀 Quick Start (Run Locally)

This site is built with vanilla HTML, CSS, and JavaScript. It has **zero build steps** and requires no Node.js/npm dependencies to run.

```bash
# In PowerShell / Terminal:
cd C:\Users\Bigat\.gemini\antigravity\scratch\shree-krishna-aushadhalaya
python -m http.server 8088
```

Open your browser at: **[http://localhost:8088/](http://localhost:8088/)**

---

## 📁 Project Structure

```
shree-krishna-aushadhalaya/
├── index.html        # Semantic HTML5 narrative with Schema.org JSON-LD
├── styles.css        # CSS custom properties, fluid typography, warm gradients & Bento grid
├── script.js         # Lenis momentum smooth scroll & GSAP ScrollTrigger controller
├── AI_HANDOFF.md     # Master prompt & system guide for feeding this site into other AIs
├── DESIGN.md         # Design system specifications & token mapping
└── assets/
    └── images/
        ├── facade-full.jpg          # Three-story clinic facade portrait
        ├── dispensary-interior.jpg  # Dispensary counter & apothecary archive
        ├── century-heritage.jpg     # Timber windows with festive marigold garlands
        ├── signboard-detail.jpg     # Registered hand-painted vintage signboard
        ├── indoor-signboard.jpg     # Wall plaque: आयुर्वेदीय हरेक औषधि पाइन्छ
        └── street-context.jpg       # Bagbazar road approach & streetscape
```

---

## 🛠️ How to Make Changes

### 1. Edit Text or Contact Information
Open `index.html`:
- **Hours & Address**: Look for `.visit__card` and `.footer__top`.
- **Phone Numbers**: Look for `tel:015322079` or `tel:9843748078`.
- **WhatsApp**: Look for `https://wa.me/9779843748078`.
- **Instagram**: Look for `https://www.instagram.com/into_the_ayurveda/?hl=en`.

### 2. Add New Photos
1. Put your image file inside `assets/images/`.
2. Wrap it with an `<div class="img-frame"><img src="assets/images/your-photo.jpg" alt="..."></div>`.
3. It automatically inherits smooth rounded corners, warm shadows, parallax scroll, and hover scale!

### 3. Add or Modify Animations
To make any new element animate in on scroll, add `data-animate="fade-up"` to it in `index.html`. You can also stagger it with `data-delay="0.1"`, `data-delay="0.2"`, etc.

---

## 🤖 Feeding this Project into Another AI

When sharing this project with ChatGPT, Claude, Cursor, v0, Bolt, or Windsurf:
1. **Copy the contents of `AI_HANDOFF.md`** and paste it at the beginning of your prompt.
2. Tell the AI what specific section you want to add or change.
3. The AI will strictly respect your colors, Lenis smooth scrolling, GSAP animations, and verified clinic facts without breaking anything!

---

## 🌐 Free 1-Click Deployment Options

You can deploy this website for free in under 60 seconds:
- **Netlify**: Drag and drop the `shree-krishna-aushadhalaya` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Run `npx vercel` in this folder, or connect your GitHub repository.
- **Cloudflare Pages / GitHub Pages**: Push to a GitHub repo and enable Pages.
