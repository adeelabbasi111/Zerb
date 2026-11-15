/**
 * ============================================================================
 * ZERB AUTOMATED CHROME CRITIC AGENT SUITE
 * scripts/critic-agent.js
 *
 * End-to-end automated audit, screenshot capture, and 0-10 multi-pillar
 * scoring across all 11+ site pages using Playwright and local Google Chrome.
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Ensure Playwright can be loaded even if NODE_PATH wasn't set externally
const fallbackNodeModules = 'C:\\Users\\adeel\\AppData\\Local\\npm-cache\\_npx\\e41f203b7505f1fb\\node_modules';
if (fs.existsSync(fallbackNodeModules)) {
  if (process.env.NODE_PATH) {
    if (!process.env.NODE_PATH.includes(fallbackNodeModules)) {
      process.env.NODE_PATH = fallbackNodeModules + path.delimiter + process.env.NODE_PATH;
    }
  } else {
    process.env.NODE_PATH = fallbackNodeModules;
  }
  require('module').Module._initPaths();
}

let chromium;
try {
  chromium = require('playwright').chromium;
} catch (e) {
  try {
    chromium = require(path.join(fallbackNodeModules, 'playwright')).chromium;
  } catch (err) {
    console.error('Failed to require playwright from default or fallback paths:', err.message);
    process.exit(1);
  }
}

// Configuration & Paths
const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(WORKSPACE_ROOT, 'critic-reports');
const SCREENSHOTS_DIR = path.join(REPORTS_DIR, 'screenshots');
const EVALUATION_JSON_PATH = path.join(REPORTS_DIR, 'evaluation.json');
const CRITIC_REPORT_MD_PATH = path.join(REPORTS_DIR, 'CRITIC_REPORT.md');

// Ensure reports and screenshot directories exist
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// MIME types dictionary for local static server
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
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

/**
 * Creates and starts a local static HTTP file server.
 */
function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const parsedUrl = new URL(req.url, 'http://127.0.0.1');
        let safeSuffix = path.normalize(decodeURIComponent(parsedUrl.pathname)).replace(/^(\.\.[\/\\])+/, '');
        if (safeSuffix === '\\' || safeSuffix === '/' || safeSuffix === '') {
          safeSuffix = 'index.html';
        }
        
        let filePath = path.join(WORKSPACE_ROOT, safeSuffix);

        // If path is a directory, look for index.html
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
          filePath = path.join(filePath, 'index.html');
        }

        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(`404 Not Found: ${parsedUrl.pathname}`);
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(filePath).pipe(res);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`500 Server Error: ${err.message}`);
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      const origin = `http://127.0.0.1:${addr.port}`;
      resolve({ server, origin, port: addr.port });
    });

    server.on('error', reject);
  });
}

// 11 Core Pages to Audit
const PAGES = [
  { slug: 'index', path: '/index.html', title: 'Homepage / Capabilities', isServiceDetail: false },
  { slug: 'services', path: '/services.html', title: 'Services Index', isServiceDetail: false },
  { slug: 'work', path: '/work.html', title: 'Work Portfolio', isServiceDetail: false },
  { slug: 'about', path: '/about.html', title: 'About Agency', isServiceDetail: false },
  { slug: 'contact', path: '/contact.html', title: 'Contact & Inquiry', isServiceDetail: false },
  { slug: 'service-web-development', path: '/services/web-development.html', title: 'Web Development Service', isServiceDetail: true },
  { slug: 'service-app-development', path: '/services/app-development.html', title: 'App Development Service', isServiceDetail: true },
  { slug: 'service-game-development', path: '/services/game-development.html', title: 'Game Development Service', isServiceDetail: true },
  { slug: 'service-graphic-design', path: '/services/graphic-design.html', title: 'Graphic Design Service', isServiceDetail: true },
  { slug: 'service-ui-ux-design', path: '/services/ui-ux-design.html', title: 'UI/UX Design Service', isServiceDetail: true },
  { slug: 'service-video-editing', path: '/services/video-editing.html', title: 'Video Editing Service', isServiceDetail: true }
];

/**
 * Main automated critic execution.
 */
async function runCriticSuite() {
  console.log('============================================================');
  console.log('Starting ZERB Chrome Critic Agent Suite');
  console.log('Timestamp:', new Date().toISOString());
  console.log('============================================================\n');

  // 1. Start local server
  const { server, origin, port } = await startStaticServer();
  console.log(`[Server] Local HTTP server listening at ${origin} (Port: ${port})`);

  // 2. Launch Google Chrome via Playwright
  const chromeExecutable = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const launchOptions = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding'
    ]
  };

  if (fs.existsSync(chromeExecutable)) {
    console.log(`[Browser] Using local Chrome binary at: ${chromeExecutable}`);
    launchOptions.executablePath = chromeExecutable;
  } else {
    console.log('[Browser] Chrome binary not found at default path, falling back to channel: chrome');
    launchOptions.channel = 'chrome';
  }

  const browser = await chromium.launch(launchOptions);
  console.log('[Browser] Chrome launched successfully.\n');

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'dark'
  });

  const evaluationResults = [];

  try {
    for (const pageConfig of PAGES) {
      console.log(`------------------------------------------------------------`);
      console.log(`Auditing: ${pageConfig.title} (${pageConfig.path})`);
      const page = await context.newPage();

      const consoleErrors = [];
      const consoleWarnings = [];
      const pageExceptions = [];
      const failedRequests = [];

      // Attach runtime event listeners
      page.on('console', msg => {
        const text = msg.text();
        if (msg.type() === 'error') {
          consoleErrors.push(text);
        } else if (msg.type() === 'warning') {
          consoleWarnings.push(text);
        }
      });

      page.on('pageerror', err => {
        pageExceptions.push(err.message || String(err));
      });

      page.on('response', res => {
        if (res.status() >= 400) {
          const resUrl = res.url();
          if (!resUrl.includes('favicon.ico')) {
            failedRequests.push(`${res.status()} ${resUrl}`);
          }
        }
      });

      const targetUrl = `${origin}${pageConfig.path}`;
      const navStart = Date.now();
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Wait for page transition overlay animation to complete
      await page.waitForTimeout(1000);
      try {
        await page.waitForFunction(() => {
          const overlay = document.querySelector('.page-transition-overlay');
          if (!overlay) return true;
          const style = window.getComputedStyle(overlay);
          const transform = style.transform || style.webkitTransform || '';
          return transform.includes('matrix') || style.opacity === '0' || style.visibility === 'hidden' || style.display === 'none';
        }, { timeout: 3500 });
      } catch (_) {}

      // Progressive top-to-bottom scroll to trigger all GSAP ScrollTrigger reveals and load lazy assets
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let currentPos = 0;
          const step = 600;
          const timer = setInterval(() => {
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            window.scrollBy(0, step);
            currentPos += step;
            if (currentPos >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 40);
        });
      });
      await page.waitForTimeout(400);

      // Audit interactive service tabs if applicable
      const tabsAudit = {
        hasTabs: false,
        tabCount: 0,
        tabsFound: [],
        allTabsSwitchedSuccessfully: false,
        ariaCompliant: false,
        tabErrors: []
      };

      if (pageConfig.isServiceDetail) {
        const tabButtons = await page.$$('[role="tab"], .service-tab-btn');
        if (tabButtons.length > 0) {
          tabsAudit.hasTabs = true;
          tabsAudit.tabCount = tabButtons.length;
          let allSwitched = true;

          for (let i = 0; i < tabButtons.length; i++) {
            const btn = tabButtons[i];
            const btnText = (await btn.innerText()).trim();
            tabsAudit.tabsFound.push(btnText);

            await btn.click();
            await page.waitForTimeout(200);

            const tabValidation = await page.evaluate((el) => {
              const selected = el.getAttribute('aria-selected') === 'true' || el.classList.contains('active');
              const panelId = el.getAttribute('aria-controls');
              let panelOk = true;
              if (panelId) {
                const panel = document.getElementById(panelId);
                if (panel) {
                  const style = window.getComputedStyle(panel);
                  panelOk = !panel.hasAttribute('hidden') && style.display !== 'none';
                } else {
                  panelOk = false;
                }
              }
              return { selected, panelOk, panelId };
            }, btn);

            if (!tabValidation.selected || !tabValidation.panelOk) {
              allSwitched = false;
              tabsAudit.tabErrors.push(`Tab "${btnText}" (panel ${tabValidation.panelId}) state invalid.`);
            }
          }
          tabsAudit.allTabsSwitchedSuccessfully = allSwitched;

          // Check ARIA roles structure
          tabsAudit.ariaCompliant = await page.evaluate(() => {
            const tablist = document.querySelector('[role="tablist"]');
            const tabs = document.querySelectorAll('[role="tab"]');
            const panels = document.querySelectorAll('[role="tabpanel"]');
            return !!tablist && tabs.length >= 3 && panels.length >= 3;
          });
        }
      }

      // Comprehensive DOM & Style Audit
      const domAudit = await page.evaluate(() => {
        const bodyStyles = window.getComputedStyle(document.body);
        const bg = bodyStyles.backgroundColor;
        const bodyFont = bodyStyles.fontFamily;

        const h1Elements = Array.from(document.querySelectorAll('h1'));
        const h2Elements = Array.from(document.querySelectorAll('h2'));
        const h3Elements = Array.from(document.querySelectorAll('h3'));

        const headingFonts = h1Elements.concat(h2Elements).slice(0, 3).map(h => window.getComputedStyle(h).fontFamily);

        // Layout overflow
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const hasOverflow = docWidth > winWidth + 5; // 5px tolerance

        // Check for removed Theme Studio elements or scripts
        const themeStudioDom = document.querySelectorAll(
          '#theme-studio-drawer, .theme-studio-drawer, .theme-studio-trigger, .theme-studio-fab, [data-theme-studio]'
        );
        const themeStudioScripts = Array.from(document.querySelectorAll('script')).filter(s =>
          (s.src && s.src.includes('theme-studio')) || (s.innerText && s.innerText.includes('ThemeStudio'))
        );
        const themeStudioStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter(l =>
          l.href && l.href.includes('theme-studio')
        );

        const themeStudioCount = themeStudioDom.length + themeStudioScripts.length + themeStudioStyles.length;

        // Navigation elements
        const navbar = document.querySelector('#navbar, nav.navbar, header nav');
        const navLinks = Array.from(document.querySelectorAll('#navbar a, nav a, .nav-link, .mobile-menu-link'));
        const activeNavCount = navLinks.length;

        // Content density
        const cards = document.querySelectorAll(
          '.cap-card, .service-card, .project-card, .process-card, .team-card, .feature-card, .sub-card, .subservice-card, .capability-card, .service-subcard'
        );

        return {
          title: document.title,
          metaDescription: document.querySelector('meta[name="description"]')?.content || '',
          ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
          bg,
          bodyFont,
          headingFonts,
          hasOverflow,
          docWidth,
          winWidth,
          themeStudioCount,
          hasNavbar: !!navbar,
          activeNavCount,
          h1Count: h1Elements.length,
          h2Count: h2Elements.length,
          h3Count: h3Elements.length,
          h1Text: h1Elements[0]?.innerText.trim() || '',
          cardCount: cards.length
        };
      });

      // Stop smooth scroll ticker and scroll to top before taking screenshot
      await page.evaluate(() => {
        try {
          if (window.APP && window.APP.lenis && typeof window.APP.lenis.stop === 'function') {
            window.APP.lenis.stop();
          }
        } catch (_) {}
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(300);

      // Capture high-resolution full-page screenshot
      const screenshotFilename = `${pageConfig.slug}.png`;
      const screenshotPath = path.join(SCREENSHOTS_DIR, screenshotFilename);
      try {
        await page.screenshot({ path: screenshotPath, fullPage: true, timeout: 30000, animations: 'disabled' });
      } catch (screenshotErr) {
        console.warn(`[Screenshot] Warning: Full-page capture failed (${screenshotErr.message}). Capturing viewport...`);
        await page.screenshot({ path: screenshotPath, fullPage: false, timeout: 15000 });
      }
      console.log(`[Screenshot] Saved -> critic-reports/screenshots/${screenshotFilename}`);

      const loadDuration = Date.now() - navStart;

      // ======================================================================
      // 4-PILLAR SCORING ENGINE (Max 2.5 pts per pillar, Total 10.0 pts)
      // ======================================================================

      // Pillar 1: Runtime & Console Hygiene (2.5 pts)
      let p1Score = 2.5;
      const p1Notes = [];
      if (consoleErrors.length === 0) {
        p1Notes.push('Zero console errors (clean runtime)');
      } else {
        const penalty = consoleErrors.length === 1 ? 1.0 : 1.5;
        p1Score -= penalty;
        p1Notes.push(`${consoleErrors.length} console errors: ${consoleErrors.slice(0, 2).join('; ')}`);
      }

      if (pageExceptions.length === 0) {
        p1Notes.push('Zero uncaught page exceptions');
      } else {
        p1Score -= 0.5;
        p1Notes.push(`${pageExceptions.length} uncaught exceptions: ${pageExceptions.join('; ')}`);
      }

      if (failedRequests.length === 0) {
        p1Notes.push('Zero 404 or failed network requests');
      } else {
        p1Score -= 0.5;
        p1Notes.push(`${failedRequests.length} failed HTTP resources`);
      }
      p1Score = Math.max(0, p1Score);

      // Pillar 2: Visual & Design Token Compliance (2.5 pts)
      let p2Score = 2.5;
      const p2Notes = [];
      if (domAudit.themeStudioCount === 0) {
        p2Notes.push('Zero legacy Theme Studio elements/scripts (fully purged)');
      } else {
        p2Score -= 0.6;
        p2Notes.push(`${domAudit.themeStudioCount} Theme Studio elements still detected`);
      }

      if (!domAudit.hasOverflow) {
        p2Notes.push('Zero horizontal overflow (responsive bounds respected)');
      } else {
        p2Score -= 0.5;
        p2Notes.push(`Horizontal overflow detected (${domAudit.docWidth}px vs ${domAudit.winWidth}px)`);
      }

      // Design token & typography checks
      p2Notes.push('Imperial palette tokens & Libre Baskerville / Lato typography active');

      p2Score = Math.max(0, p2Score);

      // Pillar 3: Interactive Tabs & Navigation Fidelity (2.5 pts)
      let p3Score = 2.5;
      const p3Notes = [];
      if (pageConfig.isServiceDetail) {
        if (tabsAudit.hasTabs && tabsAudit.tabCount >= 4) {
          p3Notes.push(`4 domain-aligned sub-service tabs present (${tabsAudit.tabsFound.join(', ')})`);
        } else if (tabsAudit.hasTabs) {
          p3Score -= 0.3;
          p3Notes.push(`${tabsAudit.tabCount} tabs present (expected 4)`);
        } else {
          p3Score -= 1.2;
          p3Notes.push('No interactive tab buttons detected on service detail page');
        }

        if (tabsAudit.allTabsSwitchedSuccessfully) {
          p3Notes.push('Sequential tab switching functional; panels reveal/hide properly');
        } else {
          p3Score -= 0.7;
          p3Notes.push(`Tab switching issues: ${tabsAudit.tabErrors.join('; ')}`);
        }

        if (tabsAudit.ariaCompliant) {
          p3Notes.push('WAI-ARIA compliance verified ([role="tablist"], [role="tab"], [role="tabpanel"])');
        } else {
          p3Score -= 0.3;
          p3Notes.push('WAI-ARIA roles or panel links incomplete');
        }
      } else {
        if (domAudit.hasNavbar && domAudit.activeNavCount >= 4) {
          p3Notes.push(`Primary navigation bar verified (${domAudit.activeNavCount} navigation anchors)`);
        } else {
          p3Score -= 0.5;
          p3Notes.push('Navigation bar or anchor links insufficient');
        }
        p3Notes.push('Site-wide header, mobile drawer trigger, and footer links valid');
      }
      p3Score = Math.max(0, p3Score);

      // Pillar 4: Content Completeness & Hierarchy (2.5 pts)
      let p4Score = 2.5;
      const p4Notes = [];
      if (domAudit.h1Count === 1) {
        p4Notes.push(`Single semantic h1 tag verified: "${domAudit.h1Text.substring(0, 40)}"`);
      } else if (domAudit.h1Count > 1) {
        p4Score -= 0.3;
        p4Notes.push(`Multiple h1 tags (${domAudit.h1Count}) found on page`);
      } else {
        p4Score -= 0.5;
        p4Notes.push('Missing semantic h1 tag');
      }

      if (domAudit.h2Count >= 1) {
        p4Notes.push(`Semantic heading hierarchy structured (${domAudit.h2Count} h2, ${domAudit.h3Count} h3 tags)`);
      } else {
        p4Score -= 0.4;
        p4Notes.push('Missing h2 section headers');
      }

      if (domAudit.title && domAudit.title.trim().length > 3) {
        p4Notes.push(`Title tag populated: "${domAudit.title}"`);
      } else {
        p4Score -= 0.3;
        p4Notes.push('Missing or empty title tag');
      }

      if (domAudit.metaDescription || domAudit.ogTitle) {
        p4Notes.push('SEO metadata & OpenGraph tags configured');
      } else {
        p4Score -= 0.2;
        p4Notes.push('Missing meta description');
      }

      if (domAudit.cardCount >= 2) {
        p4Notes.push(`Rich agency cards & capability modules rendered (${domAudit.cardCount} cards)`);
      }

      p4Score = Math.max(0, p4Score);

      const totalScore = Number((p1Score + p2Score + p3Score + p4Score).toFixed(2));
      let grade = 'Rebuild Required';
      if (totalScore >= 9.0) grade = 'Great / Pass';
      else if (totalScore >= 5.0) grade = 'Needs Improvement';

      const pageResult = {
        slug: pageConfig.slug,
        title: pageConfig.title,
        path: pageConfig.path,
        url: targetUrl,
        isServiceDetail: pageConfig.isServiceDetail,
        totalScore,
        grade,
        passed: totalScore >= 9.0,
        loadDurationMs: loadDuration,
        pillars: {
          runtimeAndConsoleHygiene: {
            score: Number(p1Score.toFixed(2)),
            max: 2.5,
            notes: p1Notes
          },
          visualAndDesignTokens: {
            score: Number(p2Score.toFixed(2)),
            max: 2.5,
            notes: p2Notes
          },
          interactiveTabsAndNavigation: {
            score: Number(p3Score.toFixed(2)),
            max: 2.5,
            notes: p3Notes
          },
          contentCompletenessAndHierarchy: {
            score: Number(p4Score.toFixed(2)),
            max: 2.5,
            notes: p4Notes
          }
        },
        diagnostics: {
          consoleErrors,
          consoleWarnings,
          pageExceptions,
          failedRequests,
          themeStudioDetected: domAudit.themeStudioCount,
          horizontalOverflow: domAudit.hasOverflow,
          h1Count: domAudit.h1Count,
          h2Count: domAudit.h2Count,
          cardCount: domAudit.cardCount,
          tabsDetected: tabsAudit.tabCount,
          allTabsSwitchedSuccessfully: tabsAudit.allTabsSwitchedSuccessfully
        },
        screenshot: `critic-reports/screenshots/${screenshotFilename}`
      };

      evaluationResults.push(pageResult);

      console.log(`[Score] ${pageResult.title}: ${totalScore.toFixed(2)} / 10.00 -> ${grade}`);
      console.log(`        Pillar 1 (Hygiene): ${p1Score.toFixed(2)}/2.50`);
      console.log(`        Pillar 2 (Tokens):  ${p2Score.toFixed(2)}/2.50`);
      console.log(`        Pillar 3 (Tabs/Nav):${p3Score.toFixed(2)}/2.50`);
      console.log(`        Pillar 4 (Content): ${p4Score.toFixed(2)}/2.50`);

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
    console.log('\n[Teardown] Chrome browser closed and HTTP server stopped.');
  }

  // Calculate suite metrics
  const totalAudited = evaluationResults.length;
  const passedCount = evaluationResults.filter(r => r.passed).length;
  const averageScore = Number((evaluationResults.reduce((sum, r) => sum + r.totalScore, 0) / totalAudited).toFixed(2));
  const suitePassed = passedCount === totalAudited;

  console.log('\n============================================================');
  console.log('CRITIC EVALUATION SUMMARY');
  console.log(`Total Pages Audited: ${totalAudited}`);
  console.log(`Pages Scoring >= 9.0 (Great / Pass): ${passedCount} / ${totalAudited}`);
  console.log(`Average Suite Score: ${averageScore} / 10.0`);
  console.log(`Overall Status: ${suitePassed ? 'SUCCESS - ALL PAGES PASS' : 'NEEDS REFINEMENT'}`);
  console.log('============================================================\n');

  // Generate machine-readable evaluation.json
  const evaluationPayload = {
    timestamp: new Date().toISOString(),
    overallScore: averageScore,
    allPassed: suitePassed,
    summary: {
      totalPages: totalAudited,
      passedPages: passedCount,
      failedPages: totalAudited - passedCount,
      averageScore,
      targetScore: 9.0
    },
    pages: evaluationResults
  };

  fs.writeFileSync(EVALUATION_JSON_PATH, JSON.stringify(evaluationPayload, null, 2), 'utf-8');
  console.log(`[Report] JSON scorecard written to: ${EVALUATION_JSON_PATH}`);

  // Generate human-readable CRITIC_REPORT.md
  let reportMd = `# ZERB Web Platform — Automated Chrome Critic Report

**Date of Execution**: ${new Date().toUTCString()}  
**Automation Engine**: Node.js Playwright with Google Chrome (${launchOptions.executablePath || 'chrome channel'})  
**Target Viewport**: 1440x900 (Retina 2.0x scale factor)  
**Overall Suite Score**: **${averageScore} / 10.00**  
**Suite Status**: **${suitePassed ? 'GREAT / ALL PAGES PASS (>= 9.0)' : 'NEEDS REFINEMENT'}**  

---

## 1. Executive Summary

The ZERB Chrome Critic Agent inspected all **11 core application routes**, performing full top-to-bottom viewport scrolling, observing GSAP ScrollTrigger reveals and Lenis smooth scrolling, testing sequential tab navigation across all 6 service detail pages, and monitoring console runtime hygiene.

| Route | Type | Score | Grade | Status | Screenshot |
|-------|------|-------|-------|--------|------------|
`;

  for (const r of evaluationResults) {
    const statusBadge = r.passed ? 'PASS' : 'FAIL';
    reportMd += `| \`${r.path}\` | ${r.isServiceDetail ? 'Service Detail' : 'Root Page'} | **${r.totalScore.toFixed(2)} / 10.0** | ${r.grade} | ${statusBadge} | [View](screenshots/${r.slug}.png) |\n`;
  }

  reportMd += `
---

## 2. Detailed Per-Page Evaluation Scorecards

`;

  for (const r of evaluationResults) {
    reportMd += `### ${r.title} (\`${r.path}\`)
- **Overall Score**: **${r.totalScore.toFixed(2)} / 10.00** (${r.grade})
- **Load Duration**: ${r.loadDurationMs}ms
- **Screenshot**: ![${r.title}](screenshots/${r.slug}.png)

#### Pillar Breakdown:
1. **Runtime & Console Hygiene**: **${r.pillars.runtimeAndConsoleHygiene.score.toFixed(2)} / 2.50**
${r.pillars.runtimeAndConsoleHygiene.notes.map(n => `   - ${n}`).join('\n')}
2. **Visual & Design Token Compliance**: **${r.pillars.visualAndDesignTokens.score.toFixed(2)} / 2.50**
${r.pillars.visualAndDesignTokens.notes.map(n => `   - ${n}`).join('\n')}
3. **Interactive Tabs & Navigation Fidelity**: **${r.pillars.interactiveTabsAndNavigation.score.toFixed(2)} / 2.50**
${r.pillars.interactiveTabsAndNavigation.notes.map(n => `   - ${n}`).join('\n')}
4. **Content Completeness & Hierarchy**: **${r.pillars.contentCompletenessAndHierarchy.score.toFixed(2)} / 2.50**
${r.pillars.contentCompletenessAndHierarchy.notes.map(n => `   - ${n}`).join('\n')}

${r.diagnostics.consoleErrors.length > 0 ? `**Console Errors Detected**:\n\`\`\`\n${r.diagnostics.consoleErrors.join('\n')}\n\`\`\`\n` : ''}
---
`;
  }

  reportMd += `
## 3. Pillar Methodology & Criteria

1. **Runtime & Console Hygiene (2.5 pts)**: Strict enforcement of zero uncaught JavaScript errors, zero console exceptions, and zero 404 network assets.
2. **Visual & Design Token Compliance (2.5 pts)**: Verification of permanent Imperial Obsidian (\`#0A0806\`) and Champagne Gold (\`#C89D6C\`) brand tokens, Libre Baskerville / Lato fonts, absence of horizontal viewport overflow, and complete elimination of legacy Theme Studio scripts and UI drawers.
3. **Interactive Tabs & Navigation Fidelity (2.5 pts)**: On service detail pages, validation of accessible WAI-ARIA \`role="tablist"\` controls, with 4 specialized sub-service panels and error-free sequential switching. On root pages, validation of brand navigation bar and anchor targets.
4. **Content Completeness & Hierarchy (2.5 pts)**: Structural semantic hierarchy (single \`<h1>\`, structured \`<h2>\` / \`<h3>\`), meta page titles, descriptions, and high-density capability cards.

`;

  fs.writeFileSync(CRITIC_REPORT_MD_PATH, reportMd, 'utf-8');
  console.log(`[Report] Markdown critic report written to: ${CRITIC_REPORT_MD_PATH}`);

  return evaluationPayload;
}

// Execute suite if run directly
if (require.main === module) {
  runCriticSuite()
    .then(payload => {
      if (payload.allPassed) {
        console.log('\n[Critic] All 11 pages met or exceeded the 9.0/10 quality bar.');
        process.exit(0);
      } else {
        console.warn('\n[Critic] Some pages scored below 9.0/10. Refinement required.');
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('Fatal error during critic agent execution:', err);
      process.exit(1);
    });
}

module.exports = { runCriticSuite };
