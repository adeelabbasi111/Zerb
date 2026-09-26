import re
with open('js/core.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add logic for mobile-overlay
if "const mobileOverlay = document.getElementById('mobile-overlay');" not in js:
    js = js.replace("const mobileLinks = document.querySelectorAll('.mobile-menu-link');", "const mobileLinks = document.querySelectorAll('.mobile-menu-link');\n  const mobileOverlay = document.getElementById('mobile-overlay');")
    
    # In navToggle event listener
    js = js.replace("mobileMenu.classList.toggle('active');", "mobileMenu.classList.toggle('active');\n      if(mobileOverlay) mobileOverlay.classList.toggle('active');")
    
    # In mobileLinks event listener
    js = js.replace("mobileMenu.classList.remove('active');", "mobileMenu.classList.remove('active');\n        if(mobileOverlay) mobileOverlay.classList.remove('active');")
    
    # Add click event to overlay to close menu
    overlay_close = '''
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileOverlay.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    });
  }
'''
    js = js.replace("});\n  }", "});\n  }" + overlay_close)
    
    with open('js/core.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Updated core.js for mobile overlay")
