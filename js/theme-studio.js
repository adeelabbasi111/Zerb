/**
 * ZERB Theme & Typography Studio
 * Interactive Real-Time Customizer (Gold Collection + Cyan & Lime)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA: CURATED PALETTES (Exact Image Gold + Variants + Cyan & Lime)
  // ==========================================================================
  const COLOR_PALETTES = [
    // ── 01. FLAGSHIP: EXACT SCREENSHOT MATCH (Imperial Champagne Gold) ──────
    {
      id: 'imperial-champagne-gold',
      name: 'Imperial Champagne Gold',
      archetype: 'Exact Screenshot Match · Prestige Noir',
      tokens: {
        '--bg-primary': '#0A0806',
        '--bg-surface': '#140F0B',
        '--bg-elevated': '#1D1611',
        '--border-subtle': '#271D15',
        '--border-visible': '#3D2E21',
        '--border-active': 'rgba(200, 157, 108, 0.5)',
        '--text-primary': '#FAF5EE',
        '--text-secondary': '#B3A292',
        '--text-tertiary': '#706254',
        '--accent': '#C89D6C',
        '--accent-hover': '#DFBA8F',
        '--accent-subtle': 'rgba(200, 157, 108, 0.15)',
        '--accent-glow': 'rgba(200, 157, 108, 0.35)',
        '--accent-warm': '#FBE6C9',
        '--accent-warm-glow': 'rgba(251, 230, 201, 0.35)'
      }
    },

    // ── 02. LUMINOUS ROYAL GOLD ─────────────────────────────────────────────
    {
      id: 'luminous-royal-gold',
      name: 'Luminous Royal Gold',
      archetype: '24K Radiant Sheen · Dark',
      tokens: {
        '--bg-primary': '#080706',
        '--bg-surface': '#120F0C',
        '--bg-elevated': '#1B1611',
        '--border-subtle': '#282118',
        '--border-visible': '#3F3426',
        '--border-active': 'rgba(218, 175, 78, 0.5)',
        '--text-primary': '#FCF9F2',
        '--text-secondary': '#BDB09B',
        '--text-tertiary': '#756854',
        '--accent': '#D4AF37',
        '--accent-hover': '#ECD27A',
        '--accent-subtle': 'rgba(212, 175, 55, 0.16)',
        '--accent-glow': 'rgba(212, 175, 55, 0.35)',
        '--accent-warm': '#FFF0BE',
        '--accent-warm-glow': 'rgba(255, 240, 190, 0.35)'
      }
    },

    // ── 03. VENETIAN BRONZE GOLD ────────────────────────────────────────────
    {
      id: 'venetian-bronze-gold',
      name: 'Venetian Bronze Gold',
      archetype: 'Deep Burnished Metal · Dark',
      tokens: {
        '--bg-primary': '#0B0907',
        '--bg-surface': '#15110E',
        '--bg-elevated': '#1E1712',
        '--border-subtle': '#2A1E17',
        '--border-visible': '#412E22',
        '--border-active': 'rgba(186, 135, 78, 0.5)',
        '--text-primary': '#F8F2EC',
        '--text-secondary': '#AE9B8B',
        '--text-tertiary': '#6D5C4E',
        '--accent': '#BA874E',
        '--accent-hover': '#D7A368',
        '--accent-subtle': 'rgba(186, 135, 78, 0.15)',
        '--accent-glow': 'rgba(186, 135, 78, 0.35)',
        '--accent-warm': '#F2C895',
        '--accent-warm-glow': 'rgba(242, 200, 149, 0.35)'
      }
    },

    // ── 04. NOCTURNE RAW GOLD ───────────────────────────────────────────────
    {
      id: 'nocturne-raw-gold',
      name: 'Nocturne Raw Gold',
      archetype: 'Pitch Obsidian & Molten Gold',
      tokens: {
        '--bg-primary': '#050403',
        '--bg-surface': '#0D0A08',
        '--bg-elevated': '#17120E',
        '--border-subtle': '#231B13',
        '--border-visible': '#3A2D20',
        '--border-active': 'rgba(229, 169, 85, 0.55)',
        '--text-primary': '#FFFDF9',
        '--text-secondary': '#B3A593',
        '--text-tertiary': '#6F6150',
        '--accent': '#E5A955',
        '--accent-hover': '#F5C278',
        '--accent-subtle': 'rgba(229, 169, 85, 0.16)',
        '--accent-glow': 'rgba(229, 169, 85, 0.38)',
        '--accent-warm': '#FFDC9E',
        '--accent-warm-glow': 'rgba(255, 220, 158, 0.38)'
      }
    },

    // ── 05. SAHARA SAND GOLD ────────────────────────────────────────────────
    {
      id: 'sahara-sand-gold',
      name: 'Sahara Sand Gold',
      archetype: 'Understated Warm Cashmere',
      tokens: {
        '--bg-primary': '#0B0908',
        '--bg-surface': '#151210',
        '--bg-elevated': '#1E1916',
        '--border-subtle': '#2A231F',
        '--border-visible': '#3F352E',
        '--border-active': 'rgba(194, 159, 120, 0.5)',
        '--text-primary': '#FAF6F2',
        '--text-secondary': '#B0A398',
        '--text-tertiary': '#6E6257',
        '--accent': '#C29F78',
        '--accent-hover': '#D8BCA0',
        '--accent-subtle': 'rgba(194, 159, 120, 0.14)',
        '--accent-glow': 'rgba(194, 159, 120, 0.3)',
        '--accent-warm': '#F5E5D3',
        '--accent-warm-glow': 'rgba(245, 229, 211, 0.3)'
      }
    },

    // ── 06. ROSE AUREATE GOLD ───────────────────────────────────────────────
    {
      id: 'rose-aureate-gold',
      name: 'Rose Aureate Gold',
      archetype: 'Warm Sunset Champagne · Dark',
      tokens: {
        '--bg-primary': '#0C0807',
        '--bg-surface': '#16100F',
        '--bg-elevated': '#201715',
        '--border-subtle': '#2E201E',
        '--border-visible': '#44312E',
        '--border-active': 'rgba(200, 147, 121, 0.5)',
        '--text-primary': '#FAF3F2',
        '--text-secondary': '#B4A2A0',
        '--text-tertiary': '#745E5C',
        '--accent': '#C89379',
        '--accent-hover': '#DFAEA0',
        '--accent-subtle': 'rgba(200, 147, 121, 0.15)',
        '--accent-glow': 'rgba(200, 147, 121, 0.35)',
        '--accent-warm': '#F8D8CF',
        '--accent-warm-glow': 'rgba(248, 216, 207, 0.35)'
      }
    },

    // ── 07. MONACO SILK GOLD (LIGHT LUXURY VARIANT) ─────────────────────────
    {
      id: 'monaco-silk-gold',
      name: 'Monaco Silk Gold',
      archetype: 'Haute Couture Cream · Light',
      tokens: {
        '--bg-primary': '#FCFAF6',
        '--bg-surface': '#F5F1E8',
        '--bg-elevated': '#FFFFFF',
        '--border-subtle': '#E8E1D5',
        '--border-visible': '#D5C9B8',
        '--border-active': 'rgba(168, 123, 69, 0.45)',
        '--text-primary': '#221A12',
        '--text-secondary': '#605143',
        '--text-tertiary': '#958573',
        '--accent': '#A87B45',
        '--accent-hover': '#C4965D',
        '--accent-subtle': 'rgba(168, 123, 69, 0.12)',
        '--accent-glow': 'rgba(168, 123, 69, 0.25)',
        '--accent-warm': '#D8AC74',
        '--accent-warm-glow': 'rgba(216, 172, 116, 0.25)'
      }
    },

    // ── 08. KEPT: NORDIC TITANIUM & FROST CYAN ──────────────────────────────
    {
      id: 'nordic-titanium-frost',
      name: 'Nordic Titanium & Frost Cyan',
      archetype: 'Anodized Hardware · Cyan',
      tokens: {
        '--bg-primary': '#0B0E11',
        '--bg-surface': '#13181E',
        '--bg-elevated': '#1A222B',
        '--border-subtle': '#25313D',
        '--border-visible': '#354556',
        '--border-active': 'rgba(0, 229, 255, 0.5)',
        '--text-primary': '#EEF4F8',
        '--text-secondary': '#96A5B4',
        '--text-tertiary': '#566574',
        '--accent': '#00E5FF',
        '--accent-hover': '#33EBFF',
        '--accent-subtle': 'rgba(0, 229, 255, 0.15)',
        '--accent-glow': 'rgba(0, 229, 255, 0.3)',
        '--accent-warm': '#33EBFF',
        '--accent-warm-glow': 'rgba(0, 229, 255, 0.3)'
      }
    },

    // ── 09. KEPT: CHARCOAL & ELECTRIC LIME ──────────────────────────────────
    {
      id: 'charcoal-electric-lime',
      name: 'Charcoal & Electric Lime',
      archetype: 'Startup Energy · Lime',
      tokens: {
        '--bg-primary': '#0C0D0B',
        '--bg-surface': '#141614',
        '--bg-elevated': '#1D201C',
        '--border-subtle': '#2C302A',
        '--border-visible': '#3E4438',
        '--border-active': 'rgba(163, 230, 53, 0.5)',
        '--text-primary': '#F4F6F0',
        '--text-secondary': '#A0A898',
        '--text-tertiary': '#606860',
        '--accent': '#A3E635',
        '--accent-hover': '#BEF264',
        '--accent-subtle': 'rgba(163, 230, 53, 0.14)',
        '--accent-glow': 'rgba(163, 230, 53, 0.28)',
        '--accent-warm': '#C8F56E',
        '--accent-warm-glow': 'rgba(163, 230, 53, 0.28)'
      }
    }
  ];

  // ==========================================================================
  // 2. DATA: 10 PREMIER FONT PAIRINGS
  // ==========================================================================
  const FONT_PAIRINGS = [
    // ── 01. WARMING HUMANIST CRAFT (Exact Screenshot Serif Aesthetic) ────────
    {
      id: 'warming-humanist-craft',
      name: 'Warming Humanist Craft',
      tone: 'Exact Serif Luxury (Screenshot Match)',
      headlineFamily: "'Fraunces', Georgia, serif",
      bodyFamily: "'DM Sans', sans-serif",
      monoFamily: "'IBM Plex Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap'
    },
    // ── 02. FUTURISTIC NORDIC TERMINAL (Kept as user requested) ─────────────
    {
      id: 'futuristic-nordic-terminal',
      name: 'Futuristic Nordic Terminal',
      tone: 'Cybernetic liquidity & telemetry (Crypto / Protocol)',
      headlineFamily: "'Sora', sans-serif",
      bodyFamily: "'Plus Jakarta Sans', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap'
    },
    // ── 03. EDITORIAL ROYAL SERIF ───────────────────────────────────────────
    {
      id: 'editorial-modern-luxury',
      name: 'Editorial Royal Serif',
      tone: 'Bespoke high-fashion craft & couture',
      headlineFamily: "'Playfair Display', Georgia, serif",
      bodyFamily: "'Hanken Grotesk', -apple-system, sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap'
    },
    // ── 04. GEOMETRIC PRECISION ─────────────────────────────────────────────
    {
      id: 'geometric-precision-duo',
      name: 'Geometric Precision',
      tone: 'Mathematical clarity & Swiss rigor (Linear / Stripe)',
      headlineFamily: "'Inter Tight', sans-serif",
      bodyFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      monoFamily: "'Fira Code', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap'
    },
    // ── 05. DRAMATIC EDITORIAL SERIF ────────────────────────────────────────
    {
      id: 'dramatic-editorial-serif',
      name: 'Dramatic Editorial Serif',
      tone: 'Magazine masthead elegance (Vogue / Bloomberg)',
      headlineFamily: "'DM Serif Display', Georgia, serif",
      bodyFamily: "'Source Sans 3', sans-serif",
      monoFamily: "'Source Code Pro', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Source+Code+Pro:wght@400;500&family=Source+Sans+3:wght@400;500;600&display=swap'
    },
    // ── 06. MONOSPACE ENGINEERING ───────────────────────────────────────────
    {
      id: 'monospace-engineering',
      name: 'Monospace Engineering',
      tone: 'Code-first identity for developer brands (GitHub / Terminal)',
      headlineFamily: "'JetBrains Mono', monospace",
      bodyFamily: "'IBM Plex Sans', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap'
    },
    // ── 07. SCIENTIFIC RATIONALIST ──────────────────────────────────────────
    {
      id: 'scientific-rationalist',
      name: 'Scientific Rationalist',
      tone: 'Data-driven research & precision analytics (NASA / CERN)',
      headlineFamily: "'Barlow', sans-serif",
      bodyFamily: "'IBM Plex Sans', sans-serif",
      monoFamily: "'IBM Plex Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap'
    },
    // ── 08. HUMANIST NEO-CLASSIC ────────────────────────────────────────────
    {
      id: 'humanist-neo-classic',
      name: 'Humanist Neo-Classic',
      tone: 'Intellectual warmth meets modern readability (Stripe / Medium)',
      headlineFamily: "'Libre Baskerville', Georgia, serif",
      bodyFamily: "'Lato', sans-serif",
      monoFamily: "'Inconsolata', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600&family=Lato:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap'
    },
    // ── 09. EXPRESSIVE DISPLAY BOLD ─────────────────────────────────────────
    {
      id: 'expressive-display-bold',
      name: 'Expressive Display Bold',
      tone: 'High-contrast ink-trap hero typography (Wix / Awwwards)',
      headlineFamily: "'Bricolage Grotesque', sans-serif",
      bodyFamily: "'Outfit', sans-serif",
      monoFamily: "'Space Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Outfit:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap'
    },
    // ── 10. SPACE-AGE INDUSTRIAL ────────────────────────────────────────────
    {
      id: 'space-age-industrial',
      name: 'Space-Age Industrial',
      tone: 'Hardware modularity & zero-gravity grids (SpaceX / Teenage Eng.)',
      headlineFamily: "'Space Grotesk', sans-serif",
      bodyFamily: "'Chivo', sans-serif",
      monoFamily: "'Space Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Chivo:wght@400;600;700&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap'
    }
  ];

  // State keys
  const STORAGE_KEY_PALETTE = 'zerb_selected_palette';
  const STORAGE_KEY_FONT = 'zerb_selected_font';

  // Default to exact user choice: Imperial Champagne Gold & Humanist Neo Classic
  let activePaletteId = localStorage.getItem(STORAGE_KEY_PALETTE) || 'imperial-champagne-gold';
  let activeFontId = 'humanist-neo-classic';
  localStorage.setItem(STORAGE_KEY_FONT, 'humanist-neo-classic');

  // Loaded fonts cache
  const loadedFonts = new Set();

  // ==========================================================================
  // 3. CORE LOGIC: APPLY PALETTE & FONT PAIRING
  // ==========================================================================
  function applyPalette(paletteId) {
    const palette = COLOR_PALETTES.find(p => p.id === paletteId) || COLOR_PALETTES[0];
    activePaletteId = palette.id;
    localStorage.setItem(STORAGE_KEY_PALETTE, palette.id);

    const root = document.documentElement;
    Object.entries(palette.tokens).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });

    // Ensure secondary accent & warm glow match the chosen palette
    const warmVal = palette.tokens['--accent-warm'] || palette.tokens['--accent-hover'] || palette.tokens['--accent'];
    const warmGlowVal = palette.tokens['--accent-warm-glow'] || palette.tokens['--accent-glow'] || 'rgba(0, 0, 0, 0.25)';
    root.style.setProperty('--accent-warm', warmVal);
    root.style.setProperty('--accent-warm-glow', warmGlowVal);

    // Dynamic 3D Hero WebGL Particle Recoloring
    if (typeof window.updateHeroParticlesTheme === 'function') {
      window.updateHeroParticlesTheme(
        palette.tokens['--accent'],
        palette.tokens['--text-primary'],
        palette.tokens['--accent-hover']
      );
    }

    // Update active badges in DOM
    document.querySelectorAll('.palette-card').forEach(card => {
      const isSelected = card.dataset.paletteId === palette.id;
      card.classList.toggle('is-selected', isSelected);
      const badge = card.querySelector('.palette-badge');
      if (badge) badge.textContent = isSelected ? 'Active' : '';
    });

    updateStatusBar();
  }

  function applyFontPairing(fontId) {
    const font = FONT_PAIRINGS.find(f => f.id === fontId) || FONT_PAIRINGS[0];
    activeFontId = font.id;
    localStorage.setItem(STORAGE_KEY_FONT, font.id);

    // Dynamically inject Google Fonts stylesheet if not loaded
    if (!loadedFonts.has(font.id) && font.googleUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = font.googleUrl;
      document.head.appendChild(link);
      loadedFonts.add(font.id);
    }

    const root = document.documentElement;
    root.style.setProperty('--font-headline', font.headlineFamily);
    root.style.setProperty('--font-body', font.bodyFamily);
    root.style.setProperty('--font-mono', font.monoFamily);

    // Update active badges in DOM
    document.querySelectorAll('.font-card').forEach(card => {
      const isSelected = card.dataset.fontId === font.id;
      card.classList.toggle('is-selected', isSelected);
      const badge = card.querySelector('.font-badge');
      if (badge) badge.textContent = isSelected ? 'Active' : '';
    });

    updateStatusBar();
  }

  function updateStatusBar() {
    const palette = COLOR_PALETTES.find(p => p.id === activePaletteId) || COLOR_PALETTES[0];
    const font = FONT_PAIRINGS.find(f => f.id === activeFontId) || FONT_PAIRINGS[0];

    const currentPaletteEl = document.getElementById('studio-current-palette');
    const currentFontEl = document.getElementById('studio-current-font');

    if (currentPaletteEl) currentPaletteEl.textContent = palette.name;
    if (currentFontEl) currentFontEl.textContent = font.name;
  }

  // ==========================================================================
  // 4. UI CREATION & MOUNTING
  // ==========================================================================
  function createStudioUI() {
    // 1. Floating Launcher Button
    const launcher = document.createElement('button');
    launcher.className = 'theme-studio-launcher';
    launcher.setAttribute('aria-label', 'Open Theme and Typography Studio');
    launcher.innerHTML = `
      <span class="launcher-icon">✦</span>
      <span>Themes &amp; Fonts</span>
      <span class="launcher-badge">${COLOR_PALETTES.length} × 10</span>
    `;

    // 2. Studio Drawer Container
    const drawer = document.createElement('div');
    drawer.className = 'theme-studio-drawer';
    drawer.setAttribute('data-lenis-prevent', 'true');
    drawer.setAttribute('data-lenis-prevent-wheel', 'true');
    drawer.setAttribute('data-lenis-prevent-touch', 'true');
    drawer.innerHTML = `
      <div class="studio-header">
        <div class="studio-title-wrap">
          <div class="studio-title">
            <span class="sparkle">✦</span>
            <span>Design Studio Experimenter</span>
          </div>
          <div class="studio-subtitle">Gold Collection · Cyan &amp; Lime · 10 Curated Fonts</div>
        </div>
        <button class="studio-close-btn" id="studio-close" aria-label="Close studio">&times;</button>
      </div>

      <div class="studio-status-banner">
        <div class="studio-status-info">
          <span>Active:</span>
          <span class="studio-status-highlight" id="studio-current-palette">...</span>
          <span>+</span>
          <span class="studio-status-highlight" id="studio-current-font">...</span>
        </div>
        <button class="studio-reset-btn" id="studio-reset">Reset</button>
      </div>

      <div class="studio-tabs">
        <button class="studio-tab-btn active" data-tab="palettes">Palettes (${COLOR_PALETTES.length})</button>
        <button class="studio-tab-btn" data-tab="fonts">Typography (10)</button>
      </div>

      <div class="studio-content-pane" data-lenis-prevent="true" data-lenis-prevent-wheel="true" data-lenis-prevent-touch="true">
        <!-- Tab 1: Palettes -->
        <div class="studio-tab-panel active" id="tab-palettes"></div>

        <!-- Tab 2: Typography -->
        <div class="studio-tab-panel" id="tab-fonts"></div>
      </div>

      <div class="studio-footer">
        <button class="studio-copy-btn" id="studio-copy-btn">
          <span>📋</span>
          <span>Copy Configuration</span>
        </button>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(drawer);

    // Prevent Lenis smooth scroll interception & allow native scrolling inside drawer
    drawer.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: false });

    drawer.addEventListener('touchmove', (e) => {
      e.stopPropagation();
    }, { passive: false });

    // 3. Populate Palettes Tab
    const palettesPanel = drawer.querySelector('#tab-palettes');
    COLOR_PALETTES.forEach(pal => {
      const card = document.createElement('div');
      card.className = `palette-card ${pal.id === activePaletteId ? 'is-selected' : ''}`;
      card.dataset.paletteId = pal.id;
      card.innerHTML = `
        <div class="palette-card-top">
          <div class="palette-name-wrap">
            <span class="palette-name">${pal.name}</span>
            <span class="palette-archetype">${pal.archetype}</span>
          </div>
          <span class="palette-badge">${pal.id === activePaletteId ? 'Active' : ''}</span>
        </div>
        <div class="palette-swatches">
          <div class="swatch-item" style="background:${pal.tokens['--bg-primary']};" title="Canvas Background: ${pal.tokens['--bg-primary']}"></div>
          <div class="swatch-item" style="background:${pal.tokens['--bg-surface']};" title="Card Surface: ${pal.tokens['--bg-surface']}"></div>
          <div class="swatch-item" style="background:${pal.tokens['--border-subtle']};" title="Border: ${pal.tokens['--border-subtle']}"></div>
          <div class="swatch-item" style="background:${pal.tokens['--text-primary']};" title="Text Primary: ${pal.tokens['--text-primary']}"></div>
          <div class="swatch-item accent-swatch" style="background:${pal.tokens['--accent']}; color:${pal.tokens['--accent']};" title="Accent Brand Color: ${pal.tokens['--accent']}"></div>
        </div>
      `;
      card.addEventListener('click', () => applyPalette(pal.id));
      palettesPanel.appendChild(card);
    });

    // 4. Populate Fonts Tab
    const fontsPanel = drawer.querySelector('#tab-fonts');
    FONT_PAIRINGS.forEach(fp => {
      const card = document.createElement('div');
      card.className = `font-card ${fp.id === activeFontId ? 'is-selected' : ''}`;
      card.dataset.fontId = fp.id;
      card.innerHTML = `
        <div class="font-card-top">
          <div>
            <div class="font-name">${fp.name}</div>
            <div class="font-tone">${fp.tone}</div>
          </div>
          <span class="palette-badge font-badge">${fp.id === activeFontId ? 'Active' : ''}</span>
        </div>
        <div class="font-preview-box">
          <div class="font-preview-headline" style="font-family:${fp.headlineFamily};">Digital Excellence &mdash; 01</div>
          <div class="font-preview-body" style="font-family:${fp.bodyFamily};">We engineer high-performance web systems and scalable digital platforms.</div>
          <div class="font-preview-mono" style="font-family:${fp.monoFamily};">SYS.CONFIG // STACK_ACTIVE</div>
        </div>
      `;
      card.addEventListener('click', () => applyFontPairing(fp.id));
      fontsPanel.appendChild(card);
    });

    // 5. Event Listeners for Open / Close & Tabs
    launcher.addEventListener('click', () => {
      drawer.classList.toggle('is-open');
    });

    drawer.querySelector('#studio-close').addEventListener('click', () => {
      drawer.classList.remove('is-open');
    });

    const tabButtons = drawer.querySelectorAll('.studio-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetTab = btn.dataset.tab;
        drawer.querySelectorAll('.studio-tab-panel').forEach(panel => {
          panel.classList.toggle('active', panel.id === `tab-${targetTab}`);
        });
      });
    });

    // Reset button
    drawer.querySelector('#studio-reset').addEventListener('click', () => {
      applyPalette('imperial-champagne-gold');
      applyFontPairing('humanist-neo-classic');
    });

    // Copy configuration button
    drawer.querySelector('#studio-copy-btn').addEventListener('click', (e) => {
      const pal = COLOR_PALETTES.find(p => p.id === activePaletteId) || COLOR_PALETTES[0];
      const font = FONT_PAIRINGS.find(f => f.id === activeFontId) || FONT_PAIRINGS[0];

      const configText = `ZERB Selected Style:
Palette: ${pal.name} (${pal.archetype})
Accent: ${pal.tokens['--accent']} | Background: ${pal.tokens['--bg-primary']}
Typography: ${font.name}
Headline: ${font.headlineFamily}
Body: ${font.bodyFamily}
Mono: ${font.monoFamily}`;

      navigator.clipboard.writeText(configText).then(() => {
        const btn = e.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓</span><span>Copied to Clipboard!</span>';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
      }).catch(() => {
        alert(configText);
      });
    });

    // Initial variable application from saved state
    applyPalette(activePaletteId);
    applyFontPairing(activeFontId);
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createStudioUI);
  } else {
    createStudioUI();
  }
})();
