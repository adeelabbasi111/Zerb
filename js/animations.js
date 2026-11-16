/* ============================================================================
   ZERB -  ANIMATIONS.JS
   GSAP ScrollTrigger sequences for homepage
   ============================================================================ */

(function() {
  'use strict';

  const { prefersReduced } = window.ZERB || {};
  if (prefersReduced) return;

  initPageTransition();

  const startAnimations = () => {
    initHeroAnimations();
    initProjectReveals();
    initStatementScrollytelling();
    initCapabilitiesReveal();
    initProcessHorizontalScroll();
    initCustomCursor();
    init3DTilt();
  };

  if (document.fonts && document.fonts.ready) {
    Promise.race([
      document.fonts.ready,
      new Promise(r => setTimeout(r, 250))
    ]).then(startAnimations);
  } else {
    startAnimations();
  }

  // ========================================================================
  // HERO ENTRANCE ANIMATION
  // ========================================================================
  
  // Simple Text Splitter Utility
  function splitText(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el.classList.contains('split-done')) return;
      const text = el.innerText;
      el.innerHTML = text.split('').map(char => char === ' ' ? '&nbsp;' : `<span class="char" style="display:inline-block; opacity:0; transform:translateY(20px);">${char}</span>`).join('');
      el.classList.add('split-done');
    });
  }

  function initHeroAnimations() {
    const heroLabel = document.querySelector('.hero-label');
    const heroLines = document.querySelectorAll('.hero-title .line-inner');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelectorAll('.hero-actions .btn, .hero-content .btn');
    const heroMedia = document.querySelector('.hero-media');
    const heroTelemetry = document.querySelectorAll('.hero-hud-card, .telemetry-strip');

    if (!heroLines.length) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(heroLines, { yPercent: 110, opacity: 0 });
    gsap.set([heroLabel, heroSubtitle], { opacity: 0, y: 20 });
    gsap.set(heroCTA, { opacity: 0, y: 15 });
    if (heroTelemetry.length) gsap.set(heroTelemetry, { opacity: 0, y: 20 });
    if (heroMedia) gsap.set(heroMedia, { opacity: 0, scale: 0.95 });

    tl.to(heroLabel, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .to(heroLines, {
        opacity: 1,
        yPercent: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
      }, 0.3)
      .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.7 }, 0.7)
      .to(heroCTA, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, 0.9)
      .to(heroTelemetry, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 }, 1.1);

    if (heroMedia) {
      tl.to(heroMedia, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0.4);
    }
  }

  // ========================================================================
  // PROJECT IMAGE REVEALS
  // ========================================================================
  function initProjectReveals() {
    const projectImages = document.querySelectorAll('.project-card-image.clip-reveal');

    projectImages.forEach((img) => {
      gsap.fromTo(img,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
          }
        }
      );

      const innerImg = img.querySelector('img');
      if (innerImg) {
        gsap.from(innerImg, {
          scale: 1.15,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
          }
        });
      }
    });
  }

  // ========================================================================
  // CINEMATIC SCROLLYTELLING STATEMENT
  // ========================================================================
  function initStatementScrollytelling() {
    const scene = document.querySelector('#statement-scene');
    if (!scene) return;

    const step1 = scene.querySelector('.step-1');
    const step2 = scene.querySelector('.step-2');
    const step3 = scene.querySelector('.step-3');
    const bgVideo = document.getElementById('statement-video');

    if (!step1 || !step2 || !step3) return;

    let isIntroPhase = true;

    // Advanced Video Playback Controller
    if (bgVideo) {
      bgVideo.addEventListener('timeupdate', function() {
        // Pause exactly at 3 seconds while they read step-1 (No looping)
        if (isIntroPhase && this.currentTime >= 3.0) {
          this.pause();
        }
      });

      // Autoplay only when in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // If it's paused at the end of the intro phase, keep it paused until they scroll
            if (isIntroPhase && bgVideo.currentTime >= 3.0) return;
            bgVideo.play().catch(() => {});
          } else {
            bgVideo.pause();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(scene);
    }

    // Pin the section and scrub through the cinematic timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (bgVideo) {
            if (self.progress > 0.12 && isIntroPhase) {
              isIntroPhase = false;
              // Ensure we start precisely at the whip pan trigger point
              if (bgVideo.currentTime < 3.0) bgVideo.currentTime = 3.0;
              bgVideo.play().catch(()=>{});
            } else if (self.progress <= 0.12 && !isIntroPhase) {
              isIntroPhase = true;
              bgVideo.currentTime = 3.0;
              bgVideo.pause();
            }
          }
        }
      }
    });

    // STEP 1: Already visible via CSS. Hold it, then fade out with blur.
    tl.to(step1, { duration: 0.5 })
      .to(step1, { opacity: 0, scale: 1.1, autoAlpha: 0, filter: 'blur(10px)', duration: 1 }, 'beat1')

    // STEP 2: The accent punch line fades in from blur
      .fromTo(step2,
        { opacity: 0, scale: 0.9, autoAlpha: 0, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 1 },
        'beat1+=0.5'
      )
      // Darken and blur the video so the copper text pops!
      .to(bgVideo, { opacity: 0.45, duration: 1 }, 'beat1+=0.5')
      
      .to(step2, { duration: 1.0 })
      .to(step2, { opacity: 0, scale: 1.1, autoAlpha: 0, filter: 'blur(10px)', duration: 1 }, 'beat2')

    // STEP 3: The closing line rises in (video stays dark and blurred)
      .fromTo(step3,
        { opacity: 0, y: 30, autoAlpha: 0 },
        { opacity: 1, y: 0, autoAlpha: 1, duration: 1 },
        'beat2+=0.5'
      )
      .to(step3, { duration: 1 });
  }

  // ========================================================================
  // CAPABILITIES - Staggered Card Reveal
  // ========================================================================
  function initCapabilitiesReveal() {
    const cards = document.querySelectorAll('.cap-card');
    if (!cards.length) return;

    // Stagger reveal: each card slides up and fades in with a slight delay
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.capabilities-grid',
        start: 'top 80%',
      }
    });

    // Also reveal the section header
    const header = document.querySelector('.capabilities-header');
    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
          }
        }
      );
    }
  }

  // ========================================================================
  // PROCESS SECTION - Horizontal Scroll
  // ========================================================================
  function initProcessHorizontalScroll() {
    const processSection = document.querySelector('.section-process');
    const processWrapper = document.querySelector('.process-wrapper');
    const processTrack = document.querySelector('.process-track');

    if (!processSection || !processWrapper || !processTrack) return;

    // Only apply horizontal scroll on desktop (match CSS query for touch snap)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Calculate how far to move horizontally
      const trackWidth = processTrack.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // If the track is smaller than the viewport, don't pin
      if (trackWidth <= viewportWidth) return;

      const xMove = trackWidth - viewportWidth + 120; // 120px extra padding buffer

      gsap.to(processTrack, {
        x: -xMove,
        ease: 'none',
        scrollTrigger: {
          trigger: processWrapper,
          start: 'center center',
          end: () => `+=${xMove}`, // scroll distance equals horizontal distance
          pin: true,
          scrub: 1, // smooth scrubbing
          invalidateOnRefresh: true, // recalculate on resize
        }
      });
    });
  }


  // ========================================================================
  // CUSTOM MAGNETIC CURSOR (BULLETPROOF & PER-PAGE PERSISTENT)
  // ========================================================================
  function initCustomCursor() {
    // Only run on desktop devices with hover support
    if (window.innerWidth <= 1024 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }

    let cursor = document.querySelector('.custom-cursor');
    let follower = document.querySelector('.custom-cursor-follower');
    
    // Automatically inject custom cursor DOM elements if not present in the HTML
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursor);
    }
    if (!follower) {
      follower = document.createElement('div');
      follower.className = 'custom-cursor-follower';
      follower.setAttribute('aria-hidden', 'true');
      document.body.appendChild(follower);
    }

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let isVisible = false;

    // High-performance GSAP Ticker for smooth 120 FPS lerp interpolation
    const updateCursor = () => {
      if (!isVisible) return;
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      
      gsap.set(cursor, { x: mouseX, y: mouseY });
      gsap.set(follower, { x: followerX, y: followerY });
    };

    gsap.ticker.add(updateCursor);

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursor.classList.add('visible');
        follower.classList.add('visible');
        followerX = mouseX;
        followerY = mouseY;
        gsap.set(cursor, { x: mouseX, y: mouseY });
        gsap.set(follower, { x: followerX, y: followerY });
      }
    }, { passive: true });

    // Handle mouse leaving and entering viewport
    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursor.classList.remove('visible');
      follower.classList.remove('visible');
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      cursor.classList.add('visible');
      follower.classList.add('visible');
    });

    // Dynamic event delegation for interactive elements across all pages
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], [role="tab"], .btn, .cap-card, .project-card, .service-nav-btn, .editorial-bento-card, .nav-toggle, .chip');
      const textInput = target.closest('input, textarea, select');

      if (textInput) {
        cursor.classList.add('text-mode');
        follower.classList.add('text-mode');
      } else if (interactive) {
        cursor.classList.add('hovering');
        follower.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], [role="tab"], .btn, .cap-card, .project-card, .service-nav-btn, .editorial-bento-card, .nav-toggle, .chip');
      const textInput = target.closest('input, textarea, select');

      if (textInput) {
        cursor.classList.remove('text-mode');
        follower.classList.remove('text-mode');
      }
      if (interactive) {
        cursor.classList.remove('hovering');
        follower.classList.remove('hovering');
      }
    });
  }


  // ========================================================================
  // 3D TILT & MOUSE SPOTLIGHT EFFECT
  // ========================================================================
  function init3DTilt() {
    const cards = document.querySelectorAll('.cap-card, .card-glass, .hero-hud-card, .approach-step, .credential-card, .project-stack-card');
    if (!cards.length) return;

    cards.forEach(card => {
      const inner = card.querySelector('.cap-card-inner') || card;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        if (window.innerWidth > 1024 && card.classList.contains('cap-card')) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const tiltX = ((centerY - y) / centerY) * 6;
          const tiltY = ((x - centerX) / centerX) * 6;

          gsap.to(inner, {
            duration: 0.4,
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1000,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 1024 && card.classList.contains('cap-card')) {
          gsap.to(inner, {
            duration: 0.6,
            rotateX: 0,
            rotateY: 0,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    });
  }





  // ========================================================================
  // PAGE LOAD TRANSITION
  // ========================================================================
  function initPageTransition() {
    const overlay = document.querySelector('.page-transition-overlay');
    const logo = document.querySelector('.page-transition-logo');
    
    if (!overlay || !logo) return;

    // Pulse logo in, then fade out overlay
    const tl = gsap.timeline();
    tl.to(logo, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to(logo, { opacity: 0, duration: 0.4, delay: 0.2, ease: 'power2.in' })
      .to(overlay, { 
        yPercent: -100, 
        duration: 0.8, 
        ease: 'power4.inOut' 
      }, '-=0.2');
  }

})();






