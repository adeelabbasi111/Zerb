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

  function initHeroAnimations() {
    const heroLabel = document.querySelector('.hero-label');
    const heroLines = document.querySelectorAll('.hero-title .line-inner');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelector('.hero-content .btn');
    

    if (!heroLines.length) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(heroLines, { yPercent: 110 });
    gsap.set([heroLabel, heroSubtitle, heroCTA], { opacity: 0, y: 20 });

    tl.to(heroLabel, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
      .to(heroLines[0], { yPercent: 0, duration: 0.9 }, 0.5)
      .to(heroLines[1], { yPercent: 0, duration: 0.9 }, 0.65)
      .to(heroLines[2], { yPercent: 0, duration: 0.9 }, 0.8)
      .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.7 }, 1.2)
      .to(heroCTA, { opacity: 1, y: 0, duration: 0.6 }, 1.4)
      .to(scrollHint, { opacity: 1, y: 0, duration: 0.5 }, 1.6);
  }

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
})();




  // ========================================================================
  // CINEMATIC SCROLLYTELLING STATEMENT
  // ========================================================================
  function initStatementScrollytelling() {
    const scene = document.querySelector('#statement-scene');
    if (!scene) return;

    const step1 = scene.querySelector('.step-1');
    const step2 = scene.querySelector('.step-2');
    const step3 = scene.querySelector('.step-3');
    const bgVideo = scene.querySelector('.statement-bg video');

    // Make sure elements exist before animating
    if (!step1 || !step2 || !step3) return;

    // Create a master ScrollTrigger timeline that pins the scene
    // The "end" dictates how long they scroll for. 3000px is a good cinematic length.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: '+=2500', 
        scrub: 1, // Smooth scrubbing
        pin: true,
        anticipatePin: 1
      }
    });

    // STEP 1: Introduce first phrase
    tl.fromTo(step1, 
      { opacity: 0, scale: 0.9, autoAlpha: 0, filter: 'blur(10px)' }, 
      { opacity: 1, scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 1 }
    )
    // Hold it for a moment
    .to(step1, { duration: 0.5 })
    // Fade out and blur step 1, while bringing video opacity up slightly
    .to(step1, { opacity: 0, scale: 1.1, autoAlpha: 0, filter: 'blur(10px)', duration: 1 }, "transition1")
    .to(bgVideo, { opacity: 0.3, duration: 1 }, "transition1")

    // STEP 2: Introduce the glowing impact phrase
    .fromTo(step2, 
      { opacity: 0, scale: 0.9, autoAlpha: 0, filter: 'blur(10px)' }, 
      { opacity: 1, scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 1 },
      "transition1+=0.5" // Slight overlap
    )
    .to(step2, { duration: 0.5 })
    .to(step2, { opacity: 0, scale: 1.1, autoAlpha: 0, filter: 'blur(10px)', duration: 1 }, "transition2")

    // STEP 3: The final resolution text
    .fromTo(step3, 
      { opacity: 0, y: 30, autoAlpha: 0 }, 
      { opacity: 1, y: 0, autoAlpha: 1, duration: 1 },
      "transition2+=0.5"
    )
    .to(bgVideo, { opacity: 0.1, duration: 1 }, "transition2")
    
    // Hold the final phrase briefly before letting them unpin
    .to(step3, { duration: 1 });
  }
