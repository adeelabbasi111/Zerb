/* ============================================================================
   ADEEL ABBASI - PORTFOLIO INTERACTIVE MODULE
   Interactive Terminal, Project Filter Tabs, Architecture Modal, Time HUD
   ============================================================================ */

(function () {
  'use strict';

  // ========================================================================
  // 1. PROJECT FILTER TABS
  // ========================================================================
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.featured-project-card, .work-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            if (window.gsap) {
              gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
            } else {
              card.style.opacity = '1';
            }
          } else {
            card.style.display = 'none';
          }
        });

        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    });
  }

  // ========================================================================
  // 2. ARCHITECTURE MODAL DEFINITIONS
  // ========================================================================
  const ARCHITECTURES = {
    beatgrid: {
      title: "BeatGrid &mdash; Web Audio Sampler & 16-Step Looper",
      subtitle: "Low-Latency DSP Engine & Polyphonic Step Sequencer (FED-02)",
      diagram: `
+-------------------------------------------------------------------------+
|                          Web Audio Graph                                |
|                                                                         |
|  [Hardware Input]                                                       |
|   (Keyboard/Pads) ----+                                                 |
|                       |                                                 |
|  [Step Sequencer] ---+---> [AudioBufferSource] ---> [Pad GainNode]      |
|  (Lookahead Clock)                                        |             |
|                                                           v             |
|                                                 [Master GainNode]       |
|                                                           |             |
|                                                           v             |
|                                                 [Analyser / VU Meter]   |
|                                                           |             |
|                                                           v             |
|                                                  [audioCtx.destination] |
+-------------------------------------------------------------------------+`,
      keyDecisions: [
        "Sample-Accurate Timing: Abandoned standard setInterval/setTimeout in favor of Chris Wilson's dual-timer lookahead scheduler (100ms lookahead, 25ms interval) preventing clock drift under CPU load.",
        "Zero-Latency Synthesis: Utilized OfflineAudioContext for procedural synthesis of 808 kicks, snappy snares, and hi-hats with zero asset loading network latency.",
        "Roger Linn Swing: Dynamic 0-50% groove shuffle delaying alternate 16th notes without desynchronizing global tempo.",
        "Polyphonic 16x16 State Matrix: Tracks step triggers, pad assignments, and velocities across all 16 tracks in persistent memory."
      ],
      stack: ["Web Audio API", "Vanilla JavaScript (ES6+)", "Vite", "OfflineAudioContext", "WCAG 2.1 AA"],
      repo: "https://github.com/adeelabbasi111/Beat-Grid"
    },

    newsscraper: {
      title: "AI News Research & Content Generator",
      subtitle: "Token-Optimized News Aggregation & Script Synthesis Platform",
      diagram: `
+-------------------------------------------------------------------------+
|                        Data & Synthesis Pipeline                        |
|                                                                         |
|  [User Topic / Query]                                                   |
|           |                                                             |
|           v                                                             |
|  [Google Custom Search JSON API]                                        |
|           |                                                             |
|           v                                                             |
|  [Raw HTML Scrapers] ---> [Trafilatura + BeautifulSoup Local Stripper]  |
|                                   | (Strips 65% Boilerplate / Cookies)  |
|                                   v                                     |
|                       [Optimized Context Buffer]                        |
|                                   |                                     |
|                                   v                                     |
|                       [Google Gemini 2.5 Flash]                         |
|                                   |                                     |
|                                   v                                     |
|              [Dual Script Output: Short-Form / Long-Form]               |
+-------------------------------------------------------------------------+`,
      keyDecisions: [
        "Python-First Token Cost Reduction: Raw web pages often contain 80% advertising and navigation markup. By using Trafilatura and BeautifulSoup to sanitize text locally before invoking the LLM, token consumption and API costs were cut by ~65%.",
        "Dual-Model Awareness: Tailored prompts differentiate between Short-Form viral scripts (optimized for immediate timeline highlights) and Long-Form research reports (deep background synthesis).",
        "Credit Ledger & Idempotency: Implemented atomic balance deductions with automated refunds on upstream API failure."
      ],
      stack: ["FastAPI", "Google Gemini 2.5 Flash", "Google Custom Search API", "Trafilatura", "SQLAlchemy", "SQLite"],
      repo: "https://github.com/adeelabbasi111/News-Scraper"
    },

    xlovebeatz: {
      title: "XLoveBeats &mdash; Digital Audio Marketplace Platform",
      subtitle: "Flask Blueprint Architecture, Automated PDF DRM & Payment Flows",
      diagram: `
+-------------------------------------------------------------------------+
|                   Application & Licensing Architecture                  |
|                                                                         |
|  [Browser / Client] ---> [Flask App Factory / Blueprints]               |
|                                   |                                     |
|        +--------------------------+--------------------------+          |
|        |                          |                          |          |
|        v                          v                          v          |
|  [Auth & Dashboard]     [Catalog & Preview Player]  [Cart & Checkout]   |
|                                                              |          |
|                                                              v          |
|                                                     [Razorpay Gateway]  |
|                                                              |          |
|                                                              v          |
|                                                    [ReportLab Engine]   |
|                                                              | (PDF DRM)|
|                                                              v          |
|                                                    [Signed License]     |
+-------------------------------------------------------------------------+`,
      keyDecisions: [
        "Modular Blueprint Architecture: Separated domain concerns into Auth, Cart, Admin, Audio Player, and Payment modules.",
        "Automated License Generation: Utilized ReportLab to generate cryptographically styled, high-resolution PDF licensing certificates embedded with customer purchase metadata.",
        "Audio Preview Protection: Segmented preview tracks from full-resolution WAV/multitrack stems with server-side download authorization."
      ],
      stack: ["Python Flask", "Flask-SQLAlchemy", "Razorpay API", "ReportLab PDF", "Jinja2 Templates", "pytest"],
      repo: "https://github.com/adeelabbasi111/XloveBeatz"
    },

    whatsapp: {
      title: "WhatsApp Automater &mdash; Professional Campaign Engine",
      subtitle: "Anti-Detection Messaging Engine with Human Kinematic Simulation",
      diagram: `
+-------------------------------------------------------------------------+
|                      Kinematics & Execution Engine                      |
|                                                                         |
|  [CSV Contact Manifest] ---> [Pakistani Phone Normalizer (+92)]         |
|                                       |                                 |
|                                       v                                 |
|                           [Atomic State Machine]                        |
|                                       |                                 |
|               +-----------------------+-----------------------+         |
|               |                                               |         |
|               v                                               v         |
|    [Bezier Curve Generator]                       [Gaussian Typing Engine]
|    - Micro-tremor perturbation                    - Variable character delays
|    - Natural acceleration curves                  - Typos & auto-corrections|
|               |                                               |         |
|               +-----------------------+-----------------------+         |
|                                       |                                 |
|                                       v                                 |
|                         [WhatsApp Web Target Session]                   |
+-------------------------------------------------------------------------+`,
      keyDecisions: [
        "Humanized Trajectory Math: Employs cubic Bezier curves with Perlin-style micro-tremors to mimic physiological human hand movements, mitigating anti-bot heuristics.",
        "Gaussian Typing Cadence: Implements variable inter-key delays and simulated typographical corrections to match real operator behavior.",
        "Crash-Safe Atomic Checkpointing: Logs recipient status as `sent`, `failed`, or `skipped` atomically, enabling resume capability without duplicate transmissions."
      ],
      stack: ["Python 3.10+", "PyAutoGUI", "pywin32 / Win32 GUI", "Pillow", "Bezier Kinematics"],
      repo: "https://github.com/adeelabbasi111/Whatsapp-Automater"
    },

    custportal: {
      title: "CUST Portal 2.0 &mdash; Scraper & Visualizer",
      subtitle: "Selenium Headless Automation & Standalone Windows Packaging",
      diagram: `
+-------------------------------------------------------------------------+
|                       Portal Extraction Pipeline                        |
|                                                                         |
|  [Tkinter GUI Launcher] ---> [Selenium WebDriver (Microsoft Edge)]      |
|                                       |                                 |
|                                       v                                 |
|                          [Authenticated Portal SSO]                     |
|                                       |                                 |
|                 +---------------------+---------------------+           |
|                 |                                           |           |
|                 v                                           v           |
|      [Dashboard Scraper]                           [Gradebook Scraper]  |
|      (Attendance & Schedule)                      (Categories & Weights)|
|                 |                                           |           |
|                 +---------------------+---------------------+           |
|                                       |                                 |
|                                       v                                 |
|                         [Persistent Student JSON Data]                 |
|                                       |                                 |
|                                       v                                 |
|                     [Flask Web UI Analytics Visualizer]                 |
+-------------------------------------------------------------------------+`,
      keyDecisions: [
        "Resilient Browser Session Management: Built on Selenium 4 with support for Microsoft Edge, handling SSO sessions and dynamic DOM elements.",
        "Structured Schema Normalization: Transformed erratic university portal HTML tables into structured JSON schemas with automated GPA projections.",
        "Standalone Windows Packaging: Bundled Flask runtime, templates, and Selenium dependencies into a zero-install executable using PyInstaller."
      ],
      stack: ["Python", "Selenium 4", "Flask", "Tkinter", "PyInstaller Windows EXE", "JSON Schema"],
      repo: "https://github.com/adeelabbasi111/CUST-PORTAL-2.0"
    },

    chitchat: {
      title: "Chit-Chat CLI &mdash; Encrypted Terminal Messenger",
      subtitle: "C++11 Object-Oriented Architecture & Windows Console Interface",
      diagram: `
+-------------------------------------------------------------------------+
|                      Chit-Chat CLI System Layers                        |
|                                                                         |
|  [Windows Console Layer]                                                |
|   - SetConsoleTextAttribute (Color Schemes)                            |
|   - Custom Box-Drawing Geometry                                         |
|           |                                                             |
|           v                                                             |
|  [Session & Auth Controller (OOP)]                                      |
|           |                                                             |
|           v                                                             |
|  [Cryptographic Engine]                                                 |
|   - Multi-stage Caesar Keyed Cipher                                     |
|   - Message Integrity Check                                             |
|           |                                                             |
|           v                                                             |
|  [Persistence Engine (File Streams)]                                    |
|   - Auto Directory Creation (_mkdir)                                    |
|   - Encrypted Vault Storage (ChatData/*.txt)                            |
+-------------------------------------------------------------------------+`,
      keyDecisions: [
        "Pure C++ Zero Dependencies: Implemented without external packages, relying exclusively on C++11 STL and the Windows Console API (`windows.h`).",
        "Custom Cryptographic Vaults: Guarantees user credentials and communication payloads remain unreadable in plain text via custom encryption layers.",
        "Modular OOP Design: Decoupled into distinct subsystems for networking/session, cryptography, terminal UI rendering, and disk persistence."
      ],
      stack: ["C++11", "Windows Console API", "File I/O Streams", "Custom Cryptography", "OOP Architecture"],
      repo: "https://github.com/adeelabbasi111/Chit-Chat-CLI"
    }
  };

  window.openArchModal = function (projectId) {
    const data = ARCHITECTURES[projectId];
    if (!data) return;

    const modal = document.getElementById('arch-modal');
    const body = document.getElementById('arch-modal-body');

    body.innerHTML = `
      <div style="margin-bottom: var(--space-4);">
        <span class="t-label" style="color: var(--accent);">SYSTEM ARCHITECTURE &bull; TECHNICAL SPECIFICATION</span>
        <h2 class="t-h2" id="modal-arch-title" style="margin-top: 6px;">${data.title}</h2>
        <p style="font-size: 0.9375rem; color: var(--text-secondary);">${data.subtitle}</p>
      </div>

      <div class="arch-diagram-box">
        <pre style="margin: 0; font-family: var(--font-mono); font-size: 0.75rem; line-height: 1.4;">${data.diagram}</pre>
      </div>

      <div style="margin-top: var(--space-5);">
        <h4 class="t-h4" style="color: var(--text-primary); margin-bottom: var(--space-3);">Key Technical Decisions</h4>
        <ul style="list-style: disc; padding-left: 20px; color: var(--text-secondary); font-size: 0.875rem; line-height: 1.7;">
          ${data.keyDecisions.map(d => `<li style="margin-bottom: 8px;">${d}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-top: var(--space-5);">
        <h4 class="t-h4" style="color: var(--text-primary); margin-bottom: var(--space-2);">Core Technology Stack</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${data.stack.map(s => `<span class="tech-badge" style="background: var(--accent-subtle); border: 1px solid var(--accent); color: var(--text-primary);">${s}</span>`).join('')}
        </div>
      </div>

      <div style="margin-top: var(--space-6); padding-top: var(--space-4); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <a href="${data.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          Inspect Source on GitHub <span class="arrow">&rarr;</span>
        </a>
        <button class="btn btn-outline" onclick="closeArchModal()">Close Specification</button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeArchModal = function () {
    const modal = document.getElementById('arch-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeArchModal();
    }
  });

  // ========================================================================
  // 3. INTERACTIVE TERMINAL / CLI (ZERB SOFTWARE HOUSE SHELL)
  // ========================================================================
  function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const body = document.getElementById('terminal-body');

    if (!input || !output) return;

    const COMMANDS = {
      help: `Available ZERB Terminal commands:
  help        - List all interactive terminal commands
  whoami      - Display ZERB Software House profile & mission
  services    - List capabilities (Web, Mobile, AI, Audio DSP, Games)
  projects    - List verified engineered systems & codebases
  cat <repo>  - Inspect system architecture (e.g. "cat beatgrid", "cat newsscraper")
  team        - Engineering leadership & credentials
  contact     - Display communication channels & consultation links
  clear       - Clear the terminal screen`,

      whoami: `ZERB &mdash; Premium Software House & Product Studio (Est. 2024)
Headquarters: Islamabad / Rawalpindi, Pakistan (UTC+5)
Engineering Leadership: Adeel Abbasi (Lead Full-Stack & AI Systems Architect)
Academic Distinction: CUST Artificial Intelligence '29 (GPA 3.74/4.00)
Mission: We engineer digital products that move industries &mdash; design, engineering, and strategy under one roof.`,

      services: `ZERB Core Capabilities:
  01 // Web Applications      - Custom dashboards, SaaS platforms, high-performance web systems
  02 // Mobile Development    - Cross-platform & native mobile applications
  03 // AI & Data Pipelines   - Google Gemini 2.5 Flash, token-efficient extraction, automated research
  04 // Web Audio & DSP       - Real-time synthesizers, Web Audio API lookahead schedulers
  05 // Automation Engines    - Anti-detection heuristics, Bezier kinematics, Selenium 4
  06 // UI/UX Architecture    - Research, design systems, and Awwwards-tier micro-interactions`,

      projects: `ZERB Engineered Systems & Public Repositories (github.com/adeelabbasi111):
  [01] BeatGrid           - 16-Pad Web Audio Sampler & 16-Step Looper (FED-02)
  [02] News-Scraper        - AI News Research & Content Engine (FastAPI + Gemini 2.5)
  [03] XLoveBeats          - Flask Audio Distribution & Automated PDF Licensing
  [04] WhatsApp Automater  - Humanized Kinematics & Campaign Automation System
  [05] CUST Portal 2.0     - Selenium 4 Edge Scraper & Visualizer (Windows EXE)
  [06] Chit-Chat CLI       - Encrypted C++ Terminal Messaging Engine
  [07] mosquitobusters.pk  - Commercial Business Production Platform
  [08] The Chain Reaction  - Interactive Habit & Achievement Experience`,

      team: `Engineering Leadership:
  Founder & Lead Engineer: Adeel Abbasi
  Specialization: Full-Stack Systems, Native Web Audio DSP, Autonomous AI
  Education: Capital University of Science and Technology (BS AI '29, GPA 3.74/4.00)
  Honors: 93% Distinction in Science & Mathematics Matriculation
  Internship: Zynvex Solutions (Project FED-02 BeatGrid)`,

      contact: `ZERB Direct Channels:
  Email:    adeelabbasipersonal@gmail.com
  WhatsApp: +92 321 5773211 (Instant Response)
  LinkedIn: https://www.linkedin.com/in/adeelabbasi111/
  GitHub:   https://github.com/adeelabbasi111`,

      date: `Current UTC Time: ${new Date().toUTCString()}`
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = input.value.trim();
        const cmd = rawCmd.toLowerCase();
        input.value = '';

        if (!rawCmd) return;

        let response = '';

        if (cmd === 'clear') {
          output.textContent = 'ZERB Terminal v2.5.0\nType "help" for a list of commands.\n------------------------------------------------';
          return;
        } else if (COMMANDS[cmd]) {
          response = COMMANDS[cmd];
        } else if (cmd.startsWith('cat ')) {
          const target = cmd.replace('cat ', '').trim();
          if (target === 'beatgrid' || target === 'beat-grid') {
            response = `=== BeatGrid Architecture ===\nSample-accurate 16-pad drum machine with lookahead scheduling, Roger Linn shuffle algorithms, and procedural OfflineAudioContext drum synthesis.\nRepo: https://github.com/adeelabbasi111/Beat-Grid`;
          } else if (target === 'newsscraper' || target === 'news-scraper') {
            response = `=== AI News Research & Content Generator ===\nFastAPI platform leveraging Google Gemini 2.5 Flash and Google Search API. Features local Trafilatura HTML cleaning for 65% token cost optimization.\nRepo: https://github.com/adeelabbasi111/News-Scraper`;
          } else if (target === 'whatsapp' || target === 'whatsapp-automater') {
            response = `=== WhatsApp Automater ===\nAnti-bot mitigation engine with Bezier mouse movements, micro-tremor simulation, variable typing latency, and atomic crash recovery.\nRepo: https://github.com/adeelabbasi111/Whatsapp-Automater`;
          } else if (target === 'chitchat' || target === 'chitchat-cli') {
            response = `=== Chit-Chat CLI ===\nEncrypted terminal messenger built in pure C++11 utilizing the Windows Console API and custom cryptographic encryption.\nRepo: https://github.com/adeelabbasi111/Chit-Chat-CLI`;
          } else {
            response = `System "${target}" not found. Try "cat beatgrid", "cat newsscraper", or "cat whatsapp".`;
          }
        } else {
          response = `Command not recognized: "${rawCmd}". Type "help" for available commands.`;
        }

        output.textContent += `\n\nzerb@software-house:~$ ${rawCmd}\n${response}`;
        body.scrollTop = body.scrollHeight;
      }
    });
  }

  // ========================================================================
  // 4. LIVE LOCAL TIME CLOCK (PKT)
  // ========================================================================
  function initLiveClock() {
    const timeEl = document.getElementById('current-local-time');
    if (!timeEl) return;

    function update() {
      const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      timeEl.textContent = new Intl.DateTimeFormat([], options).format(new Date()) + ' PKT (UTC+5)';
    }

    update();
    setInterval(update, 1000);
  }

  // ========================================================================
  // 5. CONTACT FORM HANDLER
  // ========================================================================
  window.handleContactSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const feedback = document.getElementById('contact-status-feedback');

    if (!name || !email || !message) return;

    feedback.style.display = 'block';
    feedback.style.color = '#22C55E';
    feedback.innerHTML = `  Inquiry queued. Initializing direct dispatch to ZERB Software House...`;

    // Construct WhatsApp pre-filled link
    const waText = encodeURIComponent(`*New Project Inquiry for ZERB*\n*From:* ${name} (${email})\n*Subject:* ${subject}\n*Message:* ${message}`);
    const waUrl = `https://wa.me/923215773211?text=${waText}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      feedback.innerHTML = `  WhatsApp dispatch launched. Alternatively, you can email directly at <a href="mailto:adeelabbasipersonal@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}" style="color: var(--accent); text-decoration: underline;">adeelabbasipersonal@gmail.com</a>.`;
    }, 600);
  };

  // ========================================================================
  // 6. INTERACTIVE SERVICES PANEL
  // ========================================================================
  function initServicesInteractivePanel() {
    const decks = document.querySelectorAll('.services-interactive-deck');
    if (!decks.length) return;

    decks.forEach(deck => {
      const navButtons = deck.querySelectorAll('.service-nav-btn');
      const servicePanes = deck.querySelectorAll('.service-pane');

      navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-service-target');

          navButtons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          servicePanes.forEach(pane => {
            if (pane.id === targetId) {
              pane.classList.add('active');
            } else {
              pane.classList.remove('active');
            }
          });

          if (window.ScrollTrigger) ScrollTrigger.refresh();
        });
      });
    });
  }

  // ========================================================================
  // INITIALIZATION ON DOM READY
  // ========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
    initTerminal();
    initLiveClock();
    initServicesInteractivePanel();
  });

})();
