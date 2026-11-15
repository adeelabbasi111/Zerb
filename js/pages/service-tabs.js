/**
 * ZERB - Service Detail Interactive Tabs Controller
 * WAI-ARIA compliant tabbed interface adhering to Modern Web Guidance:
 * - role="tablist", role="tab", role="tabpanel"
 * - Roving tabindex (active tab has tabindex="0", inactive tabs have tabindex="-1")
 * - Keyboard navigation (ArrowLeft/ArrowRight/Home/End/Enter/Space)
 * - aria-selected sync and hidden attribute panel switching
 * - Lenis & GSAP ScrollTrigger synchronization on tab change
 */

(function () {
  'use strict';

  function initServiceTabs() {
    const tablists = document.querySelectorAll('.service-tabs-nav[role="tablist"], [role="tablist"]');
    if (!tablists.length) return;

    tablists.forEach((tablist) => {
      const tabs = Array.from(tablist.querySelectorAll('[role="tab"], .service-tab-btn'));
      if (!tabs.length) return;

      // Collect associated panels
      const panels = tabs.map((tab) => {
        const panelId = tab.getAttribute('aria-controls') || tab.getAttribute('data-target');
        return panelId ? document.getElementById(panelId) : null;
      }).filter(Boolean);

      const prevBtn = document.getElementById('prev-section-btn');
      const nextBtn = document.getElementById('next-section-btn');

      function updateNavButtons(currentIndex) {
        if (prevBtn) {
          prevBtn.disabled = currentIndex <= 0;
        }
        if (nextBtn) {
          nextBtn.disabled = currentIndex >= tabs.length - 1;
        }
      }

      function activateTab(tabToActivate, shouldFocus = false) {
        const targetIndex = tabs.indexOf(tabToActivate);
        if (targetIndex === -1) return;

        tabs.forEach((tab, index) => {
          const isSelected = index === targetIndex;
          tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
          tab.setAttribute('tabindex', isSelected ? '0' : '-1');
          tab.classList.toggle('active', isSelected);

          const panel = panels[index];
          if (panel) {
            if (isSelected) {
              panel.removeAttribute('hidden');
              panel.classList.add('active');
            } else {
              panel.setAttribute('hidden', '');
              panel.classList.remove('active');
            }
          }
        });

        // Ensure selected tab is visible in scrollable tablist
        if (typeof tabToActivate.scrollIntoView === 'function') {
          tabToActivate.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }

        if (shouldFocus) {
          tabToActivate.focus();
        }

        updateNavButtons(targetIndex);

        // Refresh GSAP ScrollTrigger & smooth scrolling geometry
        if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
          window.ScrollTrigger.refresh();
        }

        // Dispatch custom event for extensible listeners
        tablist.dispatchEvent(new CustomEvent('serviceTabChange', {
          bubbles: true,
          detail: {
            index: targetIndex,
            tab: tabToActivate,
            panel: panels[targetIndex]
          }
        }));
      }

      // Event listeners for tabs
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          activateTab(tab, false);
        });

        tab.addEventListener('keydown', (e) => {
          let targetTab = null;

          switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
              e.preventDefault();
              targetTab = tabs[(index + 1) % tabs.length];
              break;
            case 'ArrowLeft':
            case 'ArrowUp':
              e.preventDefault();
              targetTab = tabs[(index - 1 + tabs.length) % tabs.length];
              break;
            case 'Home':
              e.preventDefault();
              targetTab = tabs[0];
              break;
            case 'End':
              e.preventDefault();
              targetTab = tabs[tabs.length - 1];
              break;
            case 'Enter':
            case ' ':
              e.preventDefault();
              activateTab(tab, true);
              return;
            default:
              return;
          }

          if (targetTab) {
            activateTab(targetTab, true);
          }
        });
      });

      // Next / Previous buttons support
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          const currentIndex = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
          if (currentIndex > 0) {
            activateTab(tabs[currentIndex - 1], true);
            const grid = document.getElementById('portfolio-grid') || document.getElementById('capabilities');
            if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const currentIndex = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
          if (currentIndex >= 0 && currentIndex < tabs.length - 1) {
            activateTab(tabs[currentIndex + 1], true);
            const grid = document.getElementById('portfolio-grid') || document.getElementById('capabilities');
            if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }

      // Determine initial active tab
      const initiallySelected = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
      if (initiallySelected) {
        activateTab(initiallySelected, false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceTabs);
  } else {
    initServiceTabs();
  }
})();
