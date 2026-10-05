(function() {
  'use strict';

  // 1. Dynamic Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Check animation library availability
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  const hasLenis = typeof Lenis !== 'undefined';
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Lenis Smooth Scrolling (Gentle, Luxurious Physics)
  let lenis = null;
  if (hasLenis && !prefersReducedMotion) {
    try {
      lenis = new Lenis({
        duration: 1.35,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });

      // Expose for cross-IIFE access (lightbox scroll-lock coordination)
      window.__SKA_lenis = lenis;

      if (hasGSAP) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } catch (err) {
      console.warn('Lenis initialization bypassed:', err);
      lenis = null;
    }
  }

  // 3. Smart Header Scroll Shrink
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => {
      const scrollY = (lenis && typeof lenis.scroll === 'number') ? lenis.scroll : (window.scrollY || window.pageYOffset || 0);
      if (scrollY > 50) {
        nav.classList.add('is-scrolled', 'nav--scrolled');
      } else {
        nav.classList.remove('is-scrolled', 'nav--scrolled');
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    if (lenis) lenis.on('scroll', updateNav);
    updateNav();
  }

  // 4. Archival Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu .m-link, .mobile-menu a');
  let isMenuOpen = false;

  function toggleMenu(forceClose) {
    if (!menuToggle || !mobileMenu) return;

    if (isMenuOpen || forceClose) {
      isMenuOpen = false;
      mobileMenu.classList.remove('mobile-menu--open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('nav__toggle--active');
      if (lenis) lenis.start();
    } else {
      isMenuOpen = true;
      mobileMenu.classList.add('mobile-menu--open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.classList.add('nav__toggle--active');
      if (lenis) lenis.stop();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMenu());
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu(true);
    }
  });

  // 5. Smooth Anchor Scrolling
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        toggleMenu(true);
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -80 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 6. Apothecary Category Filters (Instant & Tactile)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const apothecaryItems = document.querySelectorAll('.apothecary-item');

  if (filterButtons.length > 0 && apothecaryItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active state
        filterButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filterValue = btn.getAttribute('data-filter');

        apothecaryItems.forEach(item => {
          const category = item.getAttribute('data-category') || '';
          if (filterValue === 'all' || category.includes(filterValue)) {
            item.style.display = 'grid';
            if (hasGSAP && !prefersReducedMotion) {
              gsap.fromTo(item, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
            } else {
              item.style.opacity = '1';
            }
          } else {
            item.style.display = 'none';
          }
        });

        if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });
    });
  }

  // If GSAP is missing or user prefers reduced motion, exit gracefully
  if (!hasGSAP || prefersReducedMotion) {
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Helper: Split text into word spans
  function splitTextToWords(el) {
    const text = el.innerText.trim();
    if (!text) return [];
    const words = text.split(/\s+/);
    el.innerHTML = '';
    const wordSpans = [];

    words.forEach((word, idx) => {
      const wrap = document.createElement('span');
      wrap.className = 'word-wrap';
      wrap.style.display = 'inline-block';
      wrap.style.overflow = 'hidden';
      wrap.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.className = 'word';
      inner.style.display = 'inline-block';
      inner.textContent = word;

      wrap.appendChild(inner);
      el.appendChild(wrap);
      wordSpans.push(inner);

      if (idx < words.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }
    });

    return wordSpans;
  }

  // 7. Hero Section Animation (Immediate on page load — zero scroll dependency)
  const heroSection = document.querySelector('.hero-archival');
  if (heroSection) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Split title lines
    const heroTitleLines = heroSection.querySelectorAll('[data-animate="split-lines"]');
    const heroWords = [];
    heroTitleLines.forEach(line => {
      heroWords.push(...splitTextToWords(line));
    });

    const heroDev = heroSection.querySelector('.hero-archival__devanagari');
    const heroStandfirst = heroSection.querySelector('.hero-archival__standfirst');
    const heroCtas = heroSection.querySelector('.hero-archival__ctas');
    const heroFootnote = heroSection.querySelector('.hero-archival__footnote');
    const heroVisual = heroSection.querySelector('.hero-archival__visual');

    if (heroWords.length > 0) {
      heroTl.from(heroWords, { opacity: 0, y: '100%', stagger: 0.05, duration: 0.85 }, 0.15);
    }
    if (heroDev) heroTl.from(heroDev, { opacity: 0, y: 15, duration: 0.7 }, 0.4);
    if (heroStandfirst) heroTl.from(heroStandfirst, { opacity: 0, y: 15, duration: 0.7 }, 0.5);
    if (heroCtas) heroTl.from(heroCtas, { opacity: 0, y: 15, duration: 0.7 }, 0.6);
    if (heroFootnote) heroTl.from(heroFootnote, { opacity: 0, duration: 0.6 }, 0.7);
    if (heroVisual) heroTl.from(heroVisual, { opacity: 0, scale: 0.97, duration: 1.1 }, 0.3);
  }

  // 8. Subtle Scroll-Driven Reveals for Sections Below Hero
  const fadeUpElements = document.querySelectorAll('main > section:not(.hero-archival) [data-animate="fade-up"]');
  fadeUpElements.forEach(el => {
    const delay = parseFloat(el.getAttribute('data-delay') || '0');
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.85,
      ease: 'power3.out',
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      }
    });
  });

  // 9. Split Lines for Sub-Sections
  const otherSplitLines = document.querySelectorAll('main > section:not(.hero-archival) [data-animate="split-lines"]');
  otherSplitLines.forEach(el => {
    const words = splitTextToWords(el);
    if (words.length > 0) {
      gsap.from(words, {
        opacity: 0,
        y: '100%',
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          once: true
        }
      });
    }
  });

  // 10. Subtle Parallax on Architectural Photographs
  // Facade plate is excluded — it is the primary identity photograph and must remain stable.
  // Displacement is small (-14px) so historical photographs feel grounded, not floating.
  const parallaxImages = document.querySelectorAll('.img-frame img, .archive-frame img');
  parallaxImages.forEach(img => {
    gsap.to(img, {
      y: -14,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement || img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.85
      }
    });
  });

  // 11. Working Apothecary — Calibrated Horizontal Camera-Pan (Desktop Archival Traverse)
  // Restores horizontal museum wall traverse with deliberate, unhurried pacing.
  // Uses linear progress (ease: 'none') to eliminate mid-track velocity spikes,
  // generous vertical distance (~400px scroll per photo) so visitors can examine details,
  // and tightly coupled damping to prevent mouse-wheel flicks from racing past images.
  const wapSection = document.getElementById('working-apothecary');
  const wapTrack   = document.getElementById('wapTrack');

  if (wapSection && wapTrack && hasGSAP && !prefersReducedMotion) {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1025px)', () => {
      // Dynamic horizontal travel: spans all 10 plates and colophon with clean edge breathing room
      const calculateTravel = () => {
        const trackWidth = wapTrack.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, trackWidth - viewportWidth + 60);
      };

      // Calibrated viewing distance: 1.45x travel provides ~380-420px of deliberate vertical
      // wheel scroll per photographic plate. Ensures comfortable viewing without rushing.
      const getScrollDistance = () => {
        const travel = calculateTravel();
        return Math.max(2600, Math.min(4800, Math.round(travel * 1.45)));
      };

      // Timeline configuration: scrub 0.95 coupled with Lenis physics absorbs raw wheel ticks
      // while settling smoothly without skating uncontrollably.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wapSection,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.95,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      // Phase 1: Calm Arrival (8%) — Section pins; Plate 01 and title rest stably in view
      // to let the visitor orient before lateral movement begins.
      tl.to(wapTrack, {
        x: () => -Math.min(18, calculateTravel() * 0.015),
        duration: 0.08,
        ease: 'power1.out'
      });

      // Phase 2: Steady Camera Traverse (84%) — Linear ease guarantees uniform, predictable
      // speed across all 10 plates. No acceleration or rushing through the middle photos.
      tl.to(wapTrack, {
        x: () => -calculateTravel(),
        duration: 0.84,
        ease: 'none'
      });

      // Phase 3: Departure Hold (8%) — Settled pause on Colophon & final archival record
      // before unpinning cleanly into Section 04 (Our Practice).
      tl.to({}, {
        duration: 0.08
      });

      return () => {
        tl.kill();
        gsap.set(wapTrack, { clearProps: 'transform' });
      };
    });
  }

  // Recalculate ScrollTrigger positions on full page load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
  ScrollTrigger.refresh();

})();

/* ============================================================
   EXTRA FEATURES — Scroll Progress + Nav Spy + Lightbox
   ============================================================ */
(function() {
  'use strict';

  const hasLenisRef = typeof Lenis !== 'undefined';

  // --- Scroll Progress Bar ---
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // --- Nav Scroll-Spy ---
  const navLinks = document.querySelectorAll('.nav__menu .nav__link');
  if (navLinks.length > 0) {
    const sectionIds = Array.from(navLinks).map(l => l.getAttribute('href')).filter(h => h && h.startsWith('#'));
    const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

    const onScroll = () => {
      const scrollMid = (window.scrollY || window.pageYOffset) + window.innerHeight * 0.4;
      let activeId = sectionIds[0];
      sections.forEach((sec, i) => {
        if (sec.offsetTop <= scrollMid) activeId = sectionIds[i];
      });
      navLinks.forEach(l => {
        l.classList.toggle('is-active', l.getAttribute('href') === activeId);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Archival Plate & Product Lightbox ---
  // Fades in/out via CSS class. Coordinates Lenis scroll lock like the mobile menu.
  const overlay  = document.getElementById('lightboxOverlay');
  const lbImg    = document.getElementById('lightboxImg');
  const lbClose  = document.getElementById('lightboxClose');

  // Get lenis instance if available (created in IIFE above, stored on window for cross-IIFE access)
  const getLenis = () => window.__SKA_lenis || null;

  if (overlay && lbImg && lbClose) {
    const productImgs  = document.querySelectorAll('.item-visual img');
    const archivalImgs = document.querySelectorAll('[data-lightbox-trigger] img');
    const allLbImgs = [...productImgs, ...archivalImgs];

    const openLightbox = (img) => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      const l = getLenis(); if (l) l.stop();
      lbClose.focus();
    };

    const closeLightbox = () => {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      const l = getLenis(); if (l) l.start();
      // Clear src after transition completes
      setTimeout(() => { lbImg.src = ''; }, 350);
    };

    allLbImgs.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(img));
    });

    lbClose.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeLightbox();
    });
  }


})();
