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
  let isProgrammaticScroll = false;
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
      menuToggle.focus();
    } else {
      isMenuOpen = true;
      mobileMenu.classList.add('mobile-menu--open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.classList.add('nav__toggle--active');
      if (lenis) lenis.stop();
      const firstLink = mobileMenu.querySelector('.mobile-menu__nav a, .m-link');
      if (firstLink) setTimeout(() => firstLink.focus(), 100);
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

  // Focus trap for mobile menu
  mobileMenu.addEventListener('keydown', (e) => {
    if (!isMenuOpen || e.key !== 'Tab') return;
    const focusable = mobileMenu.querySelectorAll('a, button');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
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
          isProgrammaticScroll = true;
          lenis.scrollTo(targetEl, {
            offset: -80,
            onComplete: () => {
              isProgrammaticScroll = false;
            }
          });
          // Failsafe timeout in case scrolling is interrupted
          setTimeout(() => { isProgrammaticScroll = false; }, 2500);
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
        // Toggle active state and update accessibility attributes
        filterButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

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

  // 11. Working Apothecary — Fluid Archival Gallery Controller
  // Replaces disruptive pinning with a natural, continuous gallery experience:
  // - Preserves normal vertical scrolling (visitors can explore or scroll past anytime)
  // - Enables smooth previous/next plate buttons and live plate counter
  // - Supports tactile grab-and-drag horizontal scrolling on desktop
  // - Preserves touch swiping on mobile and keyboard arrow navigation
  // - Prevents accidental lightbox triggers during drag gestures
  const wapSection       = document.getElementById('working-apothecary');
  const wapTrackViewport = document.querySelector('.wap-track-viewport');
  const wapTrack         = document.getElementById('wapTrack');
  const wapPrevBtn       = document.getElementById('wapPrevBtn');
  const wapNextBtn       = document.getElementById('wapNextBtn');
  const wapNavCounter    = document.getElementById('wapNavCounter');

  if (wapSection && wapTrackViewport && wapTrack) {
    const plates = Array.from(wapTrack.querySelectorAll('.wap-item'));
    const totalPlates = plates.length;

    // Calculate dynamic step based on first plate's width and gap
    const getScrollStep = () => {
      if (plates.length > 0) {
        const firstPlate = plates[0];
        const style = window.getComputedStyle(wapTrack);
        const gap = parseFloat(style.gap) || 28;
        return firstPlate.getBoundingClientRect().width + gap;
      }
      return 360;
    };

    // Update nav buttons disabled state and live counter indicator
    const updateWapNav = () => {
      const scrollLeft = wapTrackViewport.scrollLeft;
      const maxScroll = wapTrackViewport.scrollWidth - wapTrackViewport.clientWidth;

      if (wapPrevBtn) wapPrevBtn.disabled = scrollLeft <= 8;
      if (wapNextBtn) wapNextBtn.disabled = scrollLeft >= maxScroll - 8;

      if (wapNavCounter && totalPlates > 0) {
        const vpRect = wapTrackViewport.getBoundingClientRect();
        let activeIdx = 0;
        let minDiff = Infinity;

        plates.forEach((p, idx) => {
          const pRect = p.getBoundingClientRect();
          const diff = Math.abs(pRect.left - vpRect.left);
          if (diff < minDiff) {
            minDiff = diff;
            activeIdx = idx;
          }
        });

        const plateNum = String(activeIdx + 1).padStart(2, '0');
        wapNavCounter.textContent = `Plate ${plateNum} / ${totalPlates}`;
      }
    };

    wapTrackViewport.addEventListener('scroll', updateWapNav, { passive: true });

    if (wapPrevBtn) {
      wapPrevBtn.addEventListener('click', () => {
        wapTrackViewport.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
    }

    if (wapNextBtn) {
      wapNextBtn.addEventListener('click', () => {
        wapTrackViewport.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Tactile Mouse Drag-to-Scroll on Desktop
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let dragDistance = 0;

    wapTrackViewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.pageX;
      scrollStart = wapTrackViewport.scrollLeft;
      dragDistance = 0;
      wapTrackViewport.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      dragDistance = Math.abs(dx);
      wapTrackViewport.scrollLeft = scrollStart - dx;
    });

    const stopDrag = () => {
      if (!isDown) return;
      isDown = false;
      wapTrackViewport.classList.remove('is-dragging');
    };

    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mouseleave', stopDrag);

    // Suppress lightbox click if user dragged the track
    wapTrack.addEventListener('click', (e) => {
      if (dragDistance > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // Keyboard navigation: Left/Right arrows when focused inside track
    wapTrackViewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        wapTrackViewport.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        wapTrackViewport.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      }
    });

    // Initial state setup
    updateWapNav();
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
  // Uses getBoundingClientRect for live position (handles GSAP-pinned sections whose
  // offsetTop is unreliable after ScrollTrigger pins them). Clears all active states
  // while the visitor is in the Hero zone so Working Apothecary never lights up at load.
  const navLinks = document.querySelectorAll('.nav__menu .nav__link');
  if (navLinks.length > 0) {
    const sectionIds = Array.from(navLinks)
      .map(l => l.getAttribute('href'))
      .filter(h => h && h.startsWith('#'));

    const NAV_HEIGHT = 82; // px — matches .nav height

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = scrollY + NAV_HEIGHT + 4; // 4px tolerance

      // Use live getBoundingClientRect so pinned sections report correctly
      const tops = sectionIds.map(id => {
        const el = document.querySelector(id);
        if (!el) return null;
        return { id, top: el.getBoundingClientRect().top + scrollY };
      }).filter(Boolean);

      // Find last section whose document-top is at/above the threshold
      let activeId = null;
      for (let i = 0; i < tops.length; i++) {
        if (tops[i].top <= threshold) activeId = tops[i].id;
      }

      // If we haven't scrolled into the first nav section, keep everything clear (Hero state)
      if (tops.length > 0 && scrollY + NAV_HEIGHT < tops[0].top) {
        activeId = null;
      }

      navLinks.forEach(l => {
        l.classList.toggle('is-active', l.getAttribute('href') === activeId);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Also listen to Lenis scroll for frame-accurate RAF updates
    const hookLenis = () => {
      const l = getLenis();
      if (l) l.on('scroll', onScroll);
      else setTimeout(hookLenis, 100);
    };
    hookLenis();

    // Delay initial call to let GSAP + Lenis initialize and pin sections first
    setTimeout(onScroll, 250);
  }

  // --- Archival Plate & Product Lightbox ---
  // Fades in/out via CSS class. Coordinates Lenis scroll lock, keyboard focus trapping, and focus restoration.
  const overlay  = document.getElementById('lightboxOverlay');
  const lbImg    = document.getElementById('lightboxImg');
  const lbClose  = document.getElementById('lightboxClose');

  // Get lenis instance if available (created in IIFE above, stored on window for cross-IIFE access)
  const getLenis = () => window.__SKA_lenis || null;

  if (overlay && lbImg && lbClose) {
    let lastFocusedTrigger = null;

    const openLightbox = (img, triggerEl) => {
      lastFocusedTrigger = triggerEl || document.activeElement;
      lbImg.src = img.src;
      lbImg.alt = img.alt || 'Archival plate full inspection';
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      const l = getLenis(); if (l) l.stop();
      lbClose.focus();
    };

    const closeLightbox = () => {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      const l = getLenis(); if (l) l.start();
      // Remove src after transition completes to avoid empty-source browser fetch
      setTimeout(() => { lbImg.removeAttribute('src'); }, 350);
      if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
        lastFocusedTrigger.focus();
      }
    };

    // Attach click and keyboard triggers to all inspection elements
    const triggers = document.querySelectorAll('[data-lightbox-trigger], .item-visual');
    triggers.forEach(trigger => {
      const img = trigger.querySelector('img');
      if (!img) return;
      trigger.style.cursor = 'zoom-in';

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(img, trigger);
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(img, trigger);
        }
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });

    // Trap focus inside modal and close on Escape
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        lbClose.focus();
      }
    });
  }

})();
