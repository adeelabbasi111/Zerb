/**
 * ZERB Theme & Typography Studio
 * Interactive Real-Time Customizer (10 Palettes & 10 Font Pairings)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA: 10 TOP-TIER COLOR PALETTES
  // ==========================================================================
  const COLOR_PALETTES = [
    {
      id: 'linear-cyber-slate',
      name: 'Linear Cyber Slate',
      archetype: 'DevTools Precision',
      tokens: {
        '--bg-primary': '#08090C',
        '--bg-surface': '#101216',
        '--bg-elevated': '#181B22',
        '--border-subtle': '#222631',
        '--border-visible': '#303646',
        '--border-active': 'rgba(94, 106, 210, 0.5)',
        '--text-primary': '#F2F5F9',
        '--text-secondary': '#949EAE',
        '--text-tertiary': '#586274',
        '--accent': '#5E6AD2',
        '--accent-hover': '#717DEC',
        '--accent-subtle': 'rgba(94, 106, 210, 0.15)',
        '--accent-glow': 'rgba(94, 106, 210, 0.3)',
        '--accent-warm': '#828EFA',
        '--accent-warm-glow': 'rgba(94, 106, 210, 0.3)'
      }
    },
    {
      id: 'warm-obsidian-terracotta',
      name: 'Warm Obsidian & Terracotta',
      archetype: 'ZERB Signature Craft',
      tokens: {
        '--bg-primary': '#0C0A09',
        '--bg-surface': '#171412',
        '--bg-elevated': '#241F1B',
        '--border-subtle': '#2D2621',
        '--border-visible': '#3D3630',
        '--border-active': 'rgba(196, 115, 74, 0.45)',
        '--text-primary': '#F5F0EB',
        '--text-secondary': '#A89F95',
        '--text-tertiary': '#635B53',
        '--accent': '#C4734A',
        '--accent-hover': '#DB855B',
        '--accent-subtle': 'rgba(196, 115, 74, 0.15)',
        '--accent-glow': 'rgba(196, 115, 74, 0.3)',
        '--accent-warm': '#E08758',
        '--accent-warm-glow': 'rgba(224, 135, 88, 0.25)'
      }
    },
    {
      id: 'vercel-monochrome',
      name: 'Vercel Monochrome Precision',
      archetype: 'Swiss Achromatic',
      tokens: {
        '--bg-primary': '#000000',
        '--bg-surface': '#0A0A0A',
        '--bg-elevated': '#141414',
        '--border-subtle': '#222222',
        '--border-visible': '#333333',
        '--border-active': 'rgba(0, 112, 243, 0.5)',
        '--text-primary': '#EDEDED',
        '--text-secondary': '#A1A1A1',
        '--text-tertiary': '#666666',
        '--accent': '#0070F3',
        '--accent-hover': '#0080FF',
        '--accent-subtle': 'rgba(0, 112, 243, 0.15)',
        '--accent-glow': 'rgba(0, 112, 243, 0.3)',
        '--accent-warm': '#3291FF',
        '--accent-warm-glow': 'rgba(0, 112, 243, 0.3)'
      }
    },
    {
      id: 'midnight-electric-violet',
      name: 'Midnight & Electric Violet',
      archetype: 'Cosmic Cloud SaaS',
      tokens: {
        '--bg-primary': '#060713',
        '--bg-surface': '#0E1024',
        '--bg-elevated': '#171A38',
        '--border-subtle': '#23274E',
        '--border-visible': '#343A70',
        '--border-active': 'rgba(121, 82, 255, 0.5)',
        '--text-primary': '#F3F4FD',
        '--text-secondary': '#9FA6D2',
        '--text-tertiary': '#5D6493',
        '--accent': '#7952FF',
        '--accent-hover': '#926FFD',
        '--accent-subtle': 'rgba(121, 82, 255, 0.15)',
        '--accent-glow': 'rgba(121, 82, 255, 0.3)',
        '--accent-warm': '#A380FF',
        '--accent-warm-glow': 'rgba(121, 82, 255, 0.3)'
      }
    },
    {
      id: 'nordic-titanium-frost',
      name: 'Nordic Titanium & Frost Cyan',
      archetype: 'Anodized Hardware',
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
    {
      id: 'monolith-bronze-gold',
      name: 'Monolith Bronze & Gold',
      archetype: 'Heritage Luxury',
      tokens: {
        '--bg-primary': '#0A0907',
        '--bg-surface': '#14120E',
        '--bg-elevated': '#1E1B15',
        '--border-subtle': '#2E281F',
        '--border-visible': '#423A2D',
        '--border-active': 'rgba(212, 175, 55, 0.5)',
        '--text-primary': '#FAF4EB',
        '--text-secondary': '#B5A996',
        '--text-tertiary': '#6B604F',
        '--accent': '#D4AF37',
        '--accent-hover': '#E5C358',
        '--accent-subtle': 'rgba(212, 175, 55, 0.15)',
        '--accent-glow': 'rgba(212, 175, 55, 0.3)',
        '--accent-warm': '#ECD27A',
        '--accent-warm-glow': 'rgba(212, 175, 55, 0.3)'
      }
    },
    {
      id: 'brutalist-swiss-matrix',
      name: 'Brutalist Swiss Matrix',
      archetype: 'Structural Red Grid',
      tokens: {
        '--bg-primary': '#0E0E0E',
        '--bg-surface': '#161616',
        '--bg-elevated': '#202020',
        '--border-subtle': '#2D2D2D',
        '--border-visible': '#404040',
        '--border-active': 'rgba(255, 51, 51, 0.5)',
        '--text-primary': '#FFFFFF',
        '--text-secondary': '#A8A8A8',
        '--text-tertiary': '#606060',
        '--accent': '#FF3333',
        '--accent-hover': '#FF5555',
        '--accent-subtle': 'rgba(255, 51, 51, 0.15)',
        '--accent-glow': 'rgba(255, 51, 51, 0.3)',
        '--accent-warm': '#FF6666',
        '--accent-warm-glow': 'rgba(255, 51, 51, 0.3)'
      }
    },
    {
      id: 'cyber-emerald-terminal',
      name: 'Cyber Emerald Terminal',
      archetype: 'Phosphor Protocol',
      tokens: {
        '--bg-primary': '#050B07',
        '--bg-surface': '#0B160F',
        '--bg-elevated': '#122218',
        '--border-subtle': '#193323',
        '--border-visible': '#254A34',
        '--border-active': 'rgba(16, 185, 129, 0.5)',
        '--text-primary': '#EAFAF0',
        '--text-secondary': '#88BA9A',
        '--text-tertiary': '#497056',
        '--accent': '#10B981',
        '--accent-hover': '#34D399',
        '--accent-subtle': 'rgba(16, 185, 129, 0.15)',
        '--accent-glow': 'rgba(16, 185, 129, 0.3)',
        '--accent-warm': '#34D399',
        '--accent-warm-glow': 'rgba(16, 185, 129, 0.3)'
      }
    },
    {
      id: 'luxury-velvet-eclipse',
      name: 'Luxury Velvet Eclipse',
      archetype: 'Nocturnal Orchid',
      tokens: {
        '--bg-primary': '#0A060D',
        '--bg-surface': '#140E1B',
        '--bg-elevated': '#20162B',
        '--border-subtle': '#2F1F3D',
        '--border-visible': '#442C58',
        '--border-active': 'rgba(224, 64, 251, 0.5)',
        '--text-primary': '#FAF5FD',
        '--text-secondary': '#BAA8CB',
        '--text-tertiary': '#6D587E',
        '--accent': '#E040FB',
        '--accent-hover': '#EA66FF',
        '--accent-subtle': 'rgba(224, 64, 251, 0.15)',
        '--accent-glow': 'rgba(224, 64, 251, 0.3)',
        '--accent-warm': '#F07FFF',
        '--accent-warm-glow': 'rgba(224, 64, 251, 0.3)'
      }
    },
    {
      id: 'tokyo-neon-synthwave',
      name: 'Tokyo Neon Synthwave',
      archetype: 'Sunset Vermilion',
      tokens: {
        '--bg-primary': '#08080C',
        '--bg-surface': '#10111A',
        '--bg-elevated': '#1A1B29',
        '--border-subtle': '#262940',
        '--border-visible': '#373C5E',
        '--border-active': 'rgba(255, 94, 58, 0.5)',
        '--text-primary': '#F8F9FD',
        '--text-secondary': '#9FA5C7',
        '--text-tertiary': '#5C6185',
        '--accent': '#FF5E3A',
        '--accent-hover': '#FF7A5C',
        '--accent-subtle': 'rgba(255, 94, 58, 0.15)',
        '--accent-glow': 'rgba(255, 94, 58, 0.3)',
        '--accent-warm': '#FF8C70',
        '--accent-warm-glow': 'rgba(255, 94, 58, 0.3)'
      }
    }
  ];

  // ==========================================================================
  // 2. DATA: 10 PREMIER FONT PAIRINGS
  // ==========================================================================
  const FONT_PAIRINGS = [
    {
      id: 'neo-grotesque-precision',
      name: 'Neo-Grotesque Precision',
      tone: 'Hyper-rational Silicon Valley (Vercel / Linear)',
      headlineFamily: "'Geist', sans-serif",
      bodyFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      monoFamily: "'Geist Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700;800&family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap'
    },
    {
      id: 'editorial-modern-luxury',
      name: 'Editorial Modern Luxury',
      tone: 'Bespoke craft & couture (ZERB Signature)',
      headlineFamily: "'Playfair Display', Georgia, serif",
      bodyFamily: "'Hanken Grotesk', -apple-system, sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap'
    },
    {
      id: 'high-tech-industrial',
      name: 'High-Tech Industrial',
      tone: 'Hardware modularity (Teenage Engineering)',
      headlineFamily: "'Space Grotesk', sans-serif",
      bodyFamily: "'Plus Jakarta Sans', sans-serif",
      monoFamily: "'Space Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap'
    },
    {
      id: 'kinetic-geometric-future',
      name: 'Kinetic Geometric Future',
      tone: 'Experimental avant-garde (Awwwards Studio)',
      headlineFamily: "'Syne', sans-serif",
      bodyFamily: "'Outfit', sans-serif",
      monoFamily: "'Azeret Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;500;600&family=Outfit:wght@400;500;600&family=Syne:wght@600;700;800&display=swap'
    },
    {
      id: 'architectural-brutalist',
      name: 'Architectural Brutalist',
      tone: 'Heavyweight structural grid (Swiss Poster)',
      headlineFamily: "'Unbounded', sans-serif",
      bodyFamily: "'Chivo', sans-serif",
      monoFamily: "'Chivo Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@400;500&family=Chivo:wght@400;600;700&family=Unbounded:wght@600;700;800&display=swap'
    },
    {
      id: 'haute-couture-serif',
      name: 'Haute Couture Serif',
      tone: 'Timeless literature meets editorial luxury',
      headlineFamily: "'Cormorant Garamond', Georgia, serif",
      bodyFamily: "'Manrope', sans-serif",
      monoFamily: "'IBM Plex Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600&display=swap'
    },
    {
      id: 'contemporary-ai-workspace',
      name: 'Contemporary AI & Studio',
      tone: 'Fluid, intelligent creative tools (Cursor / Instrument)',
      headlineFamily: "'Instrument Serif', Georgia, serif",
      bodyFamily: "'Instrument Sans', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'
    },
    {
      id: 'warming-humanist-craft',
      name: 'Warming Humanist Craft',
      tone: 'Warm, approachable product craftsmanship (Basecamp)',
      headlineFamily: "'Fraunces', serif",
      bodyFamily: "'DM Sans', sans-serif",
      monoFamily: "'IBM Plex Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap'
    },
    {
      id: 'expressive-neo-grotesque',
      name: 'Expressive Ink-Trap Impact',
      tone: 'Dynamic, charismatic modern magazine style',
      headlineFamily: "'Bricolage Grotesque', sans-serif",
      bodyFamily: "'Schibsted Grotesk', sans-serif",
      monoFamily: "'Space Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Schibsted+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap'
    },
    {
      id: 'futuristic-nordic-terminal',
      name: 'Futuristic Nordic Terminal',
      tone: 'Cybernetic liquidity & telemetry (Crypto / Protocol)',
      headlineFamily: "'Sora', sans-serif",
      bodyFamily: "'Plus Jakarta Sans', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap'
    }
  ];

  // State keys
  const STORAGE_KEY_PALETTE = 'zerb_selected_palette';
  const STORAGE_KEY_FONT = 'zerb_selected_font';

  let activePaletteId = localStorage.getItem(STORAGE_KEY_PALETTE) || 'warm-obsidian-terracotta';
  let activeFontId = localStorage.getItem(STORAGE_KEY_FONT) || 'editorial-modern-luxury';

  // Loaded fonts cache
  const loadedFonts = new Set();

  // ==========================================================================
  // 3. CORE LOGIC: APPLY PALETTE & FONT PAIRING
  // ==========================================================================
  function applyPalette(paletteId) {
    const palette = COLOR_PALETTES.find(p => p.id === paletteId) || COLOR_PALETTES[1];
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
    const font = FONT_PAIRINGS.find(f => f.id === fontId) || FONT_PAIRINGS[1];
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
    const palette = COLOR_PALETTES.find(p => p.id === activePaletteId) || COLOR_PALETTES[1];
    const font = FONT_PAIRINGS.find(f => f.id === activeFontId) || FONT_PAIRINGS[1];

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
      <span class="launcher-badge">10 × 10</span>
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
          <div class="studio-subtitle">10 Top Agency Palettes · 10 Curated Font Pairings</div>
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
        <button class="studio-tab-btn active" data-tab="palettes">Color Palettes (10)</button>
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
      applyPalette('warm-obsidian-terracotta');
      applyFontPairing('editorial-modern-luxury');
    });

    // Copy configuration button
    drawer.querySelector('#studio-copy-btn').addEventListener('click', (e) => {
      const pal = COLOR_PALETTES.find(p => p.id === activePaletteId) || COLOR_PALETTES[1];
      const font = FONT_PAIRINGS.find(f => f.id === activeFontId) || FONT_PAIRINGS[1];

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
