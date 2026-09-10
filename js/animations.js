/* ============================================================================
   ZERB â€” ANIMATIONS.JS
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

})();




