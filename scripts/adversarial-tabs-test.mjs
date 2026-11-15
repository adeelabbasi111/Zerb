import http from 'http';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Playwright loader
const fallbackNodeModules = 'C:\\Users\\adeel\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules';
let chromium;
try {
  chromium = require('playwright').chromium;
} catch (e) {
  chromium = require(path.join(fallbackNodeModules, 'playwright')).chromium;
}

const WORKSPACE_ROOT = 'c:\\Users\\adeel\\OneDrive\\Desktop\\Business\\Zerb';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function createStaticServer(root) {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, 'http://127.0.0.1');
    let pathname = decodeURIComponent(parsedUrl.pathname);
    if (pathname === '/') pathname = '/index.html';

    const filePath = path.join(root, pathname);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });

      fs.createReadStream(filePath).pipe(res);
    });
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

const targetPages = [
  'services/web-development.html',
  'services/app-development.html',
  'services/game-development.html',
  'services/graphic-design.html',
  'services/ui-ux-design.html',
  'services/video-editing.html'
];

async function runAdversarialSuite() {
  console.log('================================================================');
  console.log('⚡ STARTING ADVERSARIAL STRESS TEST SUITE: SERVICE DETAIL TABS ⚡');
  console.log('================================================================');

  const { server, port } = await createStaticServer(WORKSPACE_ROOT);
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Ephemeral test HTTP server listening on: ${baseUrl}`);

  const chromeExecutable = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  };
  if (fs.existsSync(chromeExecutable)) {
    launchOptions.executablePath = chromeExecutable;
  } else {
    launchOptions.channel = 'chrome';
  }

  let totalFailures = 0;
  let totalTestsPassed = 0;
  const auditReport = [];

  for (const pagePath of targetPages) {
    console.log(`\n----------------------------------------------------------------`);
    console.log(`🔥 ADVERSARIAL AUDIT: ${pagePath}`);
    console.log(`----------------------------------------------------------------`);

    const browser = await chromium.launch(launchOptions);
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();
    const pageErrors = [];
    const consoleWarnings = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        pageErrors.push(`[Console Error] ${msg.text()}`);
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(`[Console Warn] ${msg.text()}`);
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(`[Page Exception] ${err.message}`);
    });

    try {
      await page.goto(`${baseUrl}/${pagePath}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600); // Allow GSAP / Lenis / Custom Elements to initialize

      const pageResult = {
        page: pagePath,
        passed: true,
        checks: []
      };

      function recordCheck(name, passed, detail) {
        if (!passed) {
          pageResult.passed = false;
          totalFailures++;
          console.error(`  ❌ [FAIL] ${name}: ${detail}`);
        } else {
          totalTestsPassed++;
          console.log(`  ✅ [PASS] ${name}`);
        }
        pageResult.checks.push({ name, passed, detail });
      }

      // Invariant assertion helper
      async function assertTabStateInvariants(stageName) {
        const state = await page.evaluate(() => {
          const tablists = Array.from(document.querySelectorAll('.service-tabs-nav[role="tablist"], [role="tablist"]'));
          if (!tablists.length) return { error: 'No tablist found' };

          const tablist = tablists[0];
          const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
          const selectedTabs = tabs.filter(t => t.getAttribute('aria-selected') === 'true');
          const zeroTabindexTabs = tabs.filter(t => t.getAttribute('tabindex') === '0');
          const activeClassTabs = tabs.filter(t => t.classList.contains('active'));

          const panels = tabs.map(t => {
            const id = t.getAttribute('aria-controls') || t.getAttribute('data-target');
            return id ? document.getElementById(id) : null;
          });

          const missingPanels = panels.filter(p => !p);
          const visiblePanels = panels.filter(p => p && !p.hasAttribute('hidden'));
          const activeClassPanels = panels.filter(p => p && p.classList.contains('active'));

          const activeTab = selectedTabs[0];
          const activeTabControls = activeTab ? (activeTab.getAttribute('aria-controls') || activeTab.getAttribute('data-target')) : null;
          const visiblePanelId = visiblePanels[0] ? visiblePanels[0].id : null;

          return {
            tabCount: tabs.length,
            selectedCount: selectedTabs.length,
            zeroTabindexCount: zeroTabindexTabs.length,
            activeClassTabCount: activeClassTabs.length,
            missingPanelCount: missingPanels.length,
            visiblePanelCount: visiblePanels.length,
            activeClassPanelCount: activeClassPanels.length,
            activeTabControls,
            visiblePanelId,
            inSync: activeTabControls === visiblePanelId
          };
        });

        const ok = state.tabCount === 4 &&
                   state.selectedCount === 1 &&
                   state.zeroTabindexCount === 1 &&
                   state.activeClassTabCount === 1 &&
                   state.missingPanelCount === 0 &&
                   state.visiblePanelCount === 1 &&
                   state.activeClassPanelCount === 1 &&
                   state.inSync;

        return { ok, state };
      }

      // Check 1: Initial Invariant
      const initInv = await assertTabStateInvariants('Initial state');
      recordCheck('Initial State Invariants', initInv.ok, JSON.stringify(initInv.state));

      // Check 2: Idempotency stress test (Repeatedly clicking current active tab)
      console.log('  Testing Idempotency: 6 rapid clicks on already active tab...');
      const activeTabLoc = page.locator('[role="tab"][aria-selected="true"]');
      for (let i = 0; i < 6; i++) {
        await activeTabLoc.click();
      }
      const idempInv = await assertTabStateInvariants('Post-idempotency clicks');
      recordCheck('Idempotent Multi-Clicks', idempInv.ok, JSON.stringify(idempInv.state));

      // Check 3: Adversarial Rapid Click Fuzzing (50 rapid randomized clicks)
      console.log('  Testing Fuzzing: 50 randomized rapid clicks across tabs with 10ms gap...');
      const tabsLoc = page.locator('[role="tab"]');
      const tabCount = await tabsLoc.count();
      for (let i = 0; i < 50; i++) {
        const randIdx = Math.floor(Math.random() * tabCount);
        await tabsLoc.nth(randIdx).click({ delay: 5 });
      }
      await page.waitForTimeout(150); // Let any microtask settle
      const fuzzInv = await assertTabStateInvariants('Post-click fuzzing burst');
      recordCheck('50-Cycle Rapid Click Fuzzing', fuzzInv.ok, JSON.stringify(fuzzInv.state));

      // Check 4: Boundary Bounce (Alternating Tab 0 and Tab 3 rapidly)
      console.log('  Testing Boundary Bounce: 14 alternating clicks between Tab 0 and Tab 3...');
      for (let i = 0; i < 14; i++) {
        const target = (i % 2 === 0) ? tabsLoc.nth(0) : tabsLoc.nth(3);
        await target.click({ delay: 5 });
      }
      await page.waitForTimeout(100);
      const bounceInv = await assertTabStateInvariants('Post-boundary bounce');
      recordCheck('Boundary Bounce (Tab 0 <-> Tab 3)', bounceInv.ok, JSON.stringify(bounceInv.state));

      // Check 5: Keyboard Navigation Loop (ArrowRight 40-step continuous cycle)
      console.log('  Testing Keyboard Navigation: ArrowRight 40-cycle infinite loop...');
      // Start at Tab 0
      await tabsLoc.nth(0).click();
      await tabsLoc.nth(0).focus();
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press('ArrowRight');
      }
      await page.waitForTimeout(100);
      // 40 % 4 === 0 -> should land cleanly back on Tab 0
      const activeIdxRight = await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      });
      const rightInv = await assertTabStateInvariants('Post-ArrowRight 40 loop');
      const rightPassed = rightInv.ok && activeIdxRight === 0;
      recordCheck('Keyboard 40-Step ArrowRight Loop', rightPassed, `activeIdx=${activeIdxRight}, state=${JSON.stringify(rightInv.state)}`);

      // Check 6: Keyboard Navigation Loop (ArrowLeft 40-step continuous cycle)
      console.log('  Testing Keyboard Navigation: ArrowLeft 40-cycle reverse loop...');
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press('ArrowLeft');
      }
      await page.waitForTimeout(100);
      const activeIdxLeft = await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      });
      const leftInv = await assertTabStateInvariants('Post-ArrowLeft 40 loop');
      const leftPassed = leftInv.ok && activeIdxLeft === 0;
      recordCheck('Keyboard 40-Step ArrowLeft Reverse Loop', leftPassed, `activeIdx=${activeIdxLeft}, state=${JSON.stringify(leftInv.state)}`);

      // Check 7: Vertical Arrow Keys (ArrowDown / ArrowUp)
      console.log('  Testing Vertical Arrow Keys (ArrowDown / ArrowUp)...');
      await page.keyboard.press('ArrowDown'); // should move to Tab 1
      await page.waitForTimeout(50);
      const idxAfterDown = await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      });
      await page.keyboard.press('ArrowUp'); // should move back to Tab 0
      await page.waitForTimeout(50);
      const idxAfterUp = await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      });
      const vertPassed = idxAfterDown === 1 && idxAfterUp === 0;
      recordCheck('Vertical Arrow Keys (ArrowDown / ArrowUp)', vertPassed, `down=${idxAfterDown}, up=${idxAfterUp}`);

      // Check 8: Extreme Keyboard Keys: End and Home
      console.log('  Testing Home and End keys...');
      await page.keyboard.press('End');
      await page.waitForTimeout(50);
      const idxAfterEnd = await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      });
      await page.keyboard.press('Home');
      await page.waitForTimeout(50);
      const idxAfterHome = await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      });
      const endHomePassed = idxAfterEnd === 3 && idxAfterHome === 0;
      recordCheck('Extreme Keys: Home and End', endHomePassed, `endIdx=${idxAfterEnd}, homeIdx=${idxAfterHome}`);

      // Check 9: Focus Following and Tab Navigation into Active Panel
      console.log('  Testing Focus Flow: Verify active element and Tab into panel...');
      const focusedTagName = await page.evaluate(() => document.activeElement ? document.activeElement.tagName : 'NONE');
      const focusedId = await page.evaluate(() => document.activeElement ? document.activeElement.id : 'NONE');
      // Tab key should move into panel or next interactive element without getting trapped
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      const nextFocusTag = await page.evaluate(() => document.activeElement ? document.activeElement.tagName : 'NONE');
      const nextFocusId = await page.evaluate(() => document.activeElement ? document.activeElement.id : 'NONE');
      const focusFlowOk = (focusedTagName === 'BUTTON') && nextFocusTag !== 'NONE';
      recordCheck('Focus Flow & Panel Entry', focusFlowOk, `focused=${focusedTagName}#${focusedId}, nextFocus=${nextFocusTag}#${nextFocusId}`);

      // Check 10: ScrollTrigger & Lenis Synchronization under scroll pressure
      console.log('  Testing ScrollTrigger / Lenis stability during tab switches...');
      // Scroll page down 600px
      await page.evaluate(() => window.scrollTo(0, 600));
      await page.waitForTimeout(100);
      // Rapid switch tabs while scrolled
      for (let i = 0; i < 10; i++) {
        await tabsLoc.nth(i % 4).click({ delay: 5 });
      }
      await page.waitForTimeout(100);
      const scrollTriggerStatus = await page.evaluate(() => {
        const st = window.ScrollTrigger;
        const lenis = window.lenis;
        return {
          stPresent: !!st,
          stRefreshWorks: st && typeof st.refresh === 'function',
          scrollY: window.scrollY
        };
      });
      const scrollOk = !isNaN(scrollTriggerStatus.scrollY) && scrollTriggerStatus.scrollY >= 0;
      recordCheck('ScrollTrigger / Lenis Sync Under Scroll', scrollOk, JSON.stringify(scrollTriggerStatus));

      // Check 11: Special Page Checks
      if (pagePath.includes('graphic-design.html')) {
        console.log('  Testing Graphic Design specific controls: prev/next buttons and sliders...');
        const prevBtn = page.locator('#prev-section-btn');
        const nextBtn = page.locator('#next-section-btn');
        const prevExists = (await prevBtn.count()) > 0;
        const nextExists = (await nextBtn.count()) > 0;

        if (prevExists && nextExists) {
          // At Tab 0, verify prevBtn disabled state
          await tabsLoc.nth(0).click();
          await page.waitForTimeout(200);
          const prevDisabledAt0 = await page.evaluate(() => document.getElementById('prev-section-btn').disabled);
          const idxAt0 = await page.evaluate(() => {
            const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
            return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
          });

          // Test section navigation button clicks
          await page.evaluate(() => document.getElementById('next-section-btn').click());
          await page.waitForTimeout(300);
          const idxAfterClick1 = await page.evaluate(() => {
            const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
            return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
          });

          await page.evaluate(() => document.getElementById('next-section-btn').click());
          await page.waitForTimeout(300);
          const idxAfterClick2 = await page.evaluate(() => {
            const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
            return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
          });

          await page.evaluate(() => document.getElementById('next-section-btn').click());
          await page.waitForTimeout(300);
          const idxAfterClick3 = await page.evaluate(() => {
            const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
            return tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
          });

          const nextDisabledAt3 = await page.evaluate(() => document.getElementById('next-section-btn').disabled);

          // Check img-comparison-slider presence and error-free rendering
          const sliderCount = await page.locator('img-comparison-slider').count();

          const gdOk = prevDisabledAt0 && nextDisabledAt3 && idxAfterClick3 === 3 && sliderCount >= 12;
          recordCheck('Graphic Design Nav Buttons & Sliders', gdOk, `idxAt0=${idxAt0}, c1=${idxAfterClick1}, c2=${idxAfterClick2}, c3=${idxAfterClick3}, nextDisabledAt3=${nextDisabledAt3}, prevDisabledAt0=${prevDisabledAt0}, sliders=${sliderCount}`);
        }
      }

      // Check 12: Visual Indicator (WCAG 1.4.1 Shape/Underline Indicator)
      console.log('  Testing WCAG 1.4.1 Non-Color Indicator for active tab...');
      const visualIndicatorCheck = await page.evaluate(() => {
        const activeTab = document.querySelector('[role="tab"][aria-selected="true"]');
        if (!activeTab) return { hasIndicator: false, error: 'No active tab' };

        const style = window.getComputedStyle(activeTab, '::after');
        const content = style.getPropertyValue('content');
        const height = style.getPropertyValue('height');
        const hasBorderOrHeight = (height && height !== 'auto' && height !== '0px') || (content && content !== 'none');
        return {
          content,
          height,
          hasIndicator: hasBorderOrHeight
        };
      });
      recordCheck('WCAG 1.4.1 Visual Shape/Underline Indicator', visualIndicatorCheck.hasIndicator, JSON.stringify(visualIndicatorCheck));

      // Check 13: Console Errors and Exceptions
      console.log(`  Evaluating Console Logs (Errors: ${pageErrors.length}, Warnings: ${consoleWarnings.length})...`);
      const zeroErrors = pageErrors.length === 0;
      recordCheck('Zero Console Errors & Unhandled Rejections', zeroErrors, pageErrors.join(' | ') || 'No console errors');

      auditReport.push(pageResult);
    } catch (err) {
      console.error(`  💥 EXCEPTION on ${pagePath}:`, err);
      totalFailures++;
      auditReport.push({
        page: pagePath,
        passed: false,
        error: err.message
      });
    } finally {
      await page.close().catch(() => {});
      await context.close().catch(() => {});
      await browser.close().catch(() => {});
    }
  }

  server.close();

  console.log('\n================================================================');
  console.log('📊 FINAL ADVERSARIAL VERIFICATION SUMMARY');
  console.log('================================================================');
  console.log(`TOTAL AUDIT CHECKS PASSED: ${totalTestsPassed}`);
  console.log(`TOTAL AUDIT CHECKS FAILED: ${totalFailures}`);

  if (totalFailures === 0) {
    console.log('🎉 VERDICT: APPROVE — ALL ADVERSARIAL STRESS HARNESS CHECKS PASSED WITH 0 DEFECTS!');
  } else {
    console.error(`⚠️ VERDICT: REQUEST_CHANGES — DETECTED ${totalFailures} FAILURES DURING STRESS TESTING.`);
  }

  return { totalTestsPassed, totalFailures, auditReport };
}

runAdversarialSuite().then(({ totalFailures }) => {
  process.exit(totalFailures === 0 ? 0 : 1);
}).catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
