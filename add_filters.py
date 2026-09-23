import io

with io.open('js/animations.js', 'r', encoding='utf-8') as f:
    js = f.read()

filter_js = '''
  // ========================================================================
  // PORTFOLIO FILTERING
  // ========================================================================
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.work-card');

    if (!filterBtns.length || !projects.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // GSAP animation for filtering
        projects.forEach(project => {
          const category = project.getAttribute('data-category');
          
          if (filter === 'all' || filter === category) {
            gsap.to(project, {
              display: 'block',
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out'
            });
          } else {
            gsap.to(project, {
              opacity: 0,
              scale: 0.95,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => {
                project.style.display = 'none';
              }
            });
          }
        });
        
        // Refresh ScrollTrigger to recalculate heights
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 500);
      });
    });
  }
'''

js = js.replace('})();', filter_js + '\n})();')
js = js.replace('init3DTilt();', 'init3DTilt();\n    initPortfolioFilters();')

with io.open('js/animations.js', 'w', encoding='utf-8') as f:
    f.write(js)
