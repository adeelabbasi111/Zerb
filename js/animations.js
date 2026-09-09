/* ============================================================================
   ZERB — ANIMATIONS.JS
   GSAP ScrollTrigger sequences for homepage
   ============================================================================ */

(function() {
  'use strict';

  const { prefersReduced } = window.ZERB || {};
  if (prefersReduced) return;

  document.fonts.ready.then(() => {
    initHeroAnimations();
    initProjectReveals();
    initStatementScrollytelling();
  });

  // ========================================================================
  // HERO ENTRANCE ANIMATION
  // ========================================================================
  function initHeroAnimations() {
    const heroLabel = document.querySelector('.hero-label');
    const heroLines = document.querySelectorAll('.hero-title .line-inner');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelector('.hero-content .btn');
    const heroMedia = document.querySelector('.hero-media');

    if (!heroLines.length) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(heroLines, { yPercent: 110 });
    gsap.set([heroLabel, heroSubtitle, heroCTA], { opacity: 0, y: 20 });
    if (heroMedia) gsap.set(heroMedia, { opacity: 0, scale: 0.95, x: 20 });

    tl.to(heroLabel, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
      .to(heroLines[0], { yPercent: 0, duration: 0.9 }, 0.5)
      .to(heroLines[1], { yPercent: 0, duration: 0.9 }, 0.65)
      .to(heroLines[2], { yPercent: 0, duration: 0.9 }, 0.8)
      .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.7 }, 1.2)
      .to(heroCTA, { opacity: 1, y: 0, duration: 0.6 }, 1.4);

    if (heroMedia) {
      tl.to(heroMedia, { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' }, 0.8);
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
          ease: 'power3.out',
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

    // Loop only the first 2 seconds of the video
    if (bgVideo) {
      bgVideo.addEventListener('timeupdate', function() {
        if (this.currentTime >= 2) {
          this.currentTime = 0;
        }
      });

      // Play the video only when the section is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
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
        end: '+=2500',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // STEP 1: Already visible via CSS. Hold it, then fade out with blur.
    tl.to(step1, { duration: 0.5 })
      .to(step1, { opacity: 0, scale: 1.1, autoAlpha: 0, filter: 'blur(10px)', duration: 1 }, 'beat1')
      .to(bgVideo, { opacity: 0.3, duration: 1 }, 'beat1')

    // STEP 2: The accent punch line fades in from blur
      .fromTo(step2,
        { opacity: 0, scale: 0.9, autoAlpha: 0, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 1 },
        'beat1+=0.5'
      )
      .to(step2, { duration: 0.8 })
      .to(step2, { opacity: 0, scale: 1.1, autoAlpha: 0, filter: 'blur(10px)', duration: 1 }, 'beat2')

    // STEP 3: The closing line rises in
      .fromTo(step3,
        { opacity: 0, y: 30, autoAlpha: 0 },
        { opacity: 1, y: 0, autoAlpha: 1, duration: 1 },
        'beat2+=0.5'
      )
      .to(bgVideo, { opacity: 0.1, duration: 1 }, 'beat2')

    // Hold the final phrase before unpinning
      .to(step3, { duration: 1 });
  }

})();
