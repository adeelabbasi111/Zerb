/* ============================================================================
   ZERB - GRAPHIC DESIGN BEFORE/AFTER SHOWCASE CONTROLLER
   ============================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const navBtns = Array.from(document.querySelectorAll('.portfolio-nav .nav-btn'));
  const sections = Array.from(document.querySelectorAll('.portfolio-section'));
  const prevBtn = document.getElementById('prev-section-btn');
  const nextBtn = document.getElementById('next-section-btn');

  if (!navBtns.length || !sections.length) return;

  function switchSection(targetId) {
    navBtns.forEach((btn) => {
      if (btn.getAttribute('data-target') === targetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    sections.forEach((section) => {
      if (section.id === targetId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    updateNavBtnState();
  }

  function getCurrentIndex() {
    return sections.findIndex(sec => sec.classList.contains('active'));
  }

  function updateNavBtnState() {
    const idx = getCurrentIndex();
    if (prevBtn) prevBtn.disabled = idx <= 0;
    if (nextBtn) nextBtn.disabled = idx >= sections.length - 1;
  }

  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      switchSection(targetId);
      const grid = document.getElementById('portfolio-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const idx = getCurrentIndex();
      if (idx > 0) {
        const targetId = sections[idx - 1].id;
        switchSection(targetId);
        const grid = document.getElementById('portfolio-grid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const idx = getCurrentIndex();
      if (idx < sections.length - 1) {
        const targetId = sections[idx + 1].id;
        switchSection(targetId);
        const grid = document.getElementById('portfolio-grid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  updateNavBtnState();
});
