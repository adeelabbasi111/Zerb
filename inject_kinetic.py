import re

with open('js/animations.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add a simple text splitter utility at the top of animations.js
text_splitter = '''
  // Simple Text Splitter Utility
  function splitText(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el.classList.contains('split-done')) return;
      const text = el.innerText;
      el.innerHTML = text.split('').map(char => char === ' ' ? '&nbsp;' : <span class="char" style="display:inline-block; opacity:0; transform:translateY(20px);"></span>).join('');
      el.classList.add('split-done');
    });
  }
'''

if 'function splitText' not in js:
    js = js.replace("function initHeroAnimations() {", text_splitter + "\n  function initHeroAnimations() {")
    
    # Update initHeroAnimations to use the character animation
    old_hero = '''    gsap.set(heroLines, { yPercent: 110 });'''
    new_hero = '''    splitText('.hero-title');
    const chars = document.querySelectorAll('.hero-title .char');
    gsap.set(heroLines, { yPercent: 110 });'''
    
    js = js.replace(old_hero, new_hero)
    
    old_anim = '''      .to(heroLines[0], { yPercent: 0, duration: 0.9 }, 0.5)
      .to(heroLines[1], { yPercent: 0, duration: 0.9 }, 0.65)
      .to(heroLines[2], { yPercent: 0, duration: 0.9 }, 0.8)'''
      
    new_anim = '''      .to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'back.out(1.7)'
      }, 0.5)'''
      
    js = js.replace(old_anim, new_anim)
    
    with open('js/animations.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Injected Kinetic Typography")
