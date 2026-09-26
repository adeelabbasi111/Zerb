import re

with open('js/core.js', 'r', encoding='utf-8') as f:
    js = f.read()

if 'barba.init' not in js:
    barba_code = '''
  // ========================================================================
  // BARBA.JS PAGE TRANSITIONS
  // ========================================================================
  if (typeof barba !== 'undefined') {
    barba.init({
      sync: true,
      transitions: [{
        name: 'opacity-transition',
        leave(data) {
          return gsap.to(data.current.container, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: 'power2.in'
          });
        },
        enter(data) {
          // Re-init WebGL if needed on new page
          if (window.initHeroAnimations) window.initHeroAnimations();
          if (window.ScrollTrigger) ScrollTrigger.refresh();
          if (lenis) lenis.scrollTo(0, { immediate: true });
          
          return gsap.from(data.next.container, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.2
          });
        }
      }]
    });
  }
'''
    js = js.replace('})();', barba_code + '\n})();')
    with open('js/core.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Injected Barba.js logic into core.js")
