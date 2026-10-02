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
  const parallaxImages = document.querySelectorAll('.img-frame img, .facade-plate img, .archive-frame img');
  parallaxImages.forEach(img => {
    gsap.to(img, {
      y: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement || img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  });

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

  // --- Product Image Lightbox (also covers archival plates) ---
  const overlay   = document.getElementById('lightboxOverlay');
  const lbImg     = document.getElementById('lightboxImg');
  const lbClose   = document.getElementById('lightboxClose');

  if (overlay && lbImg && lbClose) {
    // Collect both product images and archival plate images
    const productImgs   = document.querySelectorAll('.item-visual img');
    const archivalImgs  = document.querySelectorAll('[data-lightbox-trigger] img');
    const allLbImgs = [...productImgs, ...archivalImgs];

    const openLightbox = (img) => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    };

    const closeLightbox = () => {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      lbImg.src = '';
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
