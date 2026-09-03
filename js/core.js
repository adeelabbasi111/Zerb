/* ============================================================================
   ZERB — CORE.JS
   Initialization: Lenis, GSAP, Navigation, Accessibility
   ============================================================================ */

(function() {
  'use strict';

  // ========================================================================
  // REDUCED MOTION CHECK
  // ========================================================================
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========================================================================
  // LENIS SMOOTH SCROLL
  // ========================================================================
  let lenis = null;

  if (!prefersReduced) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Sync Lenis with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    // Still register ScrollTrigger even with reduced motion
    gsap.registerPlugin(ScrollTrigger);
  }

  // ========================================================================
  // NAVIGATION
  // ========================================================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  // Scroll state for navbar
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -60',
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 60) {
          navbar.classList.add('scrolled');
        } else if (self.scroll() <= 60) {
          navbar.classList.remove('scrolled');
        }
      },
    });
  }

  // Mobile menu toggle
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('active');
      mobileMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', !isOpen);

      if (!isOpen) {
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
      } else {
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ========================================================================
  // BASIC REVEAL OBSERVER (CSS Fallback — GSAP enhances in animations.js)
  // ========================================================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
    revealObserver.observe(el);
  });

  // ========================================================================
  // VIDEO LAZY PLAY/PAUSE (Performance)
  // ========================================================================
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector('video') || entry.target;
        if (video.tagName === 'VIDEO') {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      });
    },
    { rootMargin: '100px 0px' }
  );

  document.querySelectorAll('video, .hero-video-wrap').forEach((el) => {
    videoObserver.observe(el);
  });

  // ========================================================================
  // KEYBOARD ACCESSIBILITY — Focus visible
  // ========================================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Expose lenis for other modules
  window.ZERB = { lenis, prefersReduced };
})();
