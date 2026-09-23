import io

with io.open('js/animations.js', 'r', encoding='utf-8') as f:
    js = f.read()

transition_js = '''
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
'''

js = js.replace('})();', transition_js + '\n})();')

# We should call initPageTransition immediately, not wait for fonts, so it hides the unstyled flash
# We'll put it right at the top of the IIFE
js = js.replace("if (prefersReduced) return;", "if (prefersReduced) return;\n\n  initPageTransition();")


with io.open('js/animations.js', 'w', encoding='utf-8') as f:
    f.write(js)
