/**
 * ZERB Theme & Typography Studio
 * Interactive Real-Time Customizer (15 Palettes & 10 Font Pairings)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA: 15 WORLD-CLASS COLOR PALETTES (Dark + Light + Gold)
  // ==========================================================================
  const COLOR_PALETTES = [
    // ── KEEP: Nordic Titanium & Frost Cyan ──────────────────────────────────
    {
      id: 'nordic-titanium-frost',
      name: 'Nordic Titanium & Frost Cyan',
      archetype: 'Anodized Hardware · Dark',
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

    // ── GOLD SHADES (3) ─────────────────────────────────────────────────────
    {
      id: 'obsidian-gold-classic',
      name: 'Obsidian & Classic Gold',
      archetype: 'Prestige Dark · Gold',
      tokens: {
        '--bg-primary': '#09080A',
        '--bg-surface': '#121110',
        '--bg-elevated': '#1C1A18',
        '--border-subtle': '#2A2622',
        '--border-visible': '#3E3830',
        '--border-active': 'rgba(212, 175, 55, 0.5)',
        '--text-primary': '#FAF6EE',
        '--text-secondary': '#B8AD9A',
        '--text-tertiary': '#6E6355',
        '--accent': '#D4AF37',
        '--accent-hover': '#E5C44E',
        '--accent-subtle': 'rgba(212, 175, 55, 0.14)',
        '--accent-glow': 'rgba(212, 175, 55, 0.3)',
        '--accent-warm': '#E8C950',
        '--accent-warm-glow': 'rgba(212, 175, 55, 0.3)'
      }
    },
    {
      id: 'champagne-rose-gold',
      name: 'Champagne & Rosé Gold',
      archetype: 'Sophisticated Warmth · Light',
      tokens: {
        '--bg-primary': '#FDFAF6',
        '--bg-surface': '#F7F2EC',
        '--bg-elevated': '#FFF9F3',
        '--border-subtle': '#E8DFD4',
        '--border-visible': '#D5C9BA',
        '--border-active': 'rgba(184, 134, 90, 0.5)',
        '--text-primary': '#2C2218',
        '--text-secondary': '#6B5D4F',
        '--text-tertiary': '#A09284',
        '--accent': '#B8865A',
        '--accent-hover': '#CF9A6B',
        '--accent-subtle': 'rgba(184, 134, 90, 0.12)',
        '--accent-glow': 'rgba(184, 134, 90, 0.25)',
        '--accent-warm': '#D4A06E',
        '--accent-warm-glow': 'rgba(184, 134, 90, 0.25)'
      }
    },
    {
      id: 'midnight-antique-gold',
      name: 'Midnight & Antique Gold',
      archetype: 'Heritage Opulence · Dark',
      tokens: {
        '--bg-primary': '#0A0A0E',
        '--bg-surface': '#131218',
        '--bg-elevated': '#1B1A22',
        '--border-subtle': '#2A2836',
        '--border-visible': '#3D3A4C',
        '--border-active': 'rgba(194, 160, 80, 0.5)',
        '--text-primary': '#F5F1E8',
        '--text-secondary': '#AEA690',
        '--text-tertiary': '#6D665A',
        '--accent': '#C2A050',
        '--accent-hover': '#D8B862',
        '--accent-subtle': 'rgba(194, 160, 80, 0.14)',
        '--accent-glow': 'rgba(194, 160, 80, 0.3)',
        '--accent-warm': '#DEBA64',
        '--accent-warm-glow': 'rgba(194, 160, 80, 0.3)'
      }
    },

    // ── DARK MODE PALETTES ──────────────────────────────────────────────────
    {
      id: 'deep-ocean-cobalt',
      name: 'Deep Ocean Cobalt',
      archetype: 'Enterprise SaaS · Dark',
      tokens: {
        '--bg-primary': '#060A12',
        '--bg-surface': '#0C1220',
        '--bg-elevated': '#141D2E',
        '--border-subtle': '#1E2C42',
        '--border-visible': '#2A3D5A',
        '--border-active': 'rgba(56, 132, 255, 0.5)',
        '--text-primary': '#F0F4FA',
        '--text-secondary': '#8FA3BE',
        '--text-tertiary': '#506580',
        '--accent': '#3884FF',
        '--accent-hover': '#5A9EFF',
        '--accent-subtle': 'rgba(56, 132, 255, 0.14)',
        '--accent-glow': 'rgba(56, 132, 255, 0.3)',
        '--accent-warm': '#6AAFFF',
        '--accent-warm-glow': 'rgba(56, 132, 255, 0.3)'
      }
    },
    {
      id: 'charcoal-electric-lime',
      name: 'Charcoal & Electric Lime',
      archetype: 'Startup Energy · Dark',
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
    },
    {
      id: 'volcanic-magma-red',
      name: 'Volcanic Magma',
      archetype: 'Bold Power · Dark',
      tokens: {
        '--bg-primary': '#0C0808',
        '--bg-surface': '#161010',
        '--bg-elevated': '#201818',
        '--border-subtle': '#302424',
        '--border-visible': '#443434',
        '--border-active': 'rgba(239, 68, 68, 0.5)',
        '--text-primary': '#FCF2F2',
        '--text-secondary': '#BEA0A0',
        '--text-tertiary': '#7A5E5E',
        '--accent': '#EF4444',
        '--accent-hover': '#F87171',
        '--accent-subtle': 'rgba(239, 68, 68, 0.14)',
        '--accent-glow': 'rgba(239, 68, 68, 0.3)',
        '--accent-warm': '#FB8A8A',
        '--accent-warm-glow': 'rgba(239, 68, 68, 0.3)'
      }
    },
    {
      id: 'moonstone-lavender',
      name: 'Moonstone & Lavender',
      archetype: 'Creative Studio · Dark',
      tokens: {
        '--bg-primary': '#0D0B10',
        '--bg-surface': '#16131C',
        '--bg-elevated': '#1E1A28',
        '--border-subtle': '#2D2840',
        '--border-visible': '#413A58',
        '--border-active': 'rgba(167, 139, 250, 0.5)',
        '--text-primary': '#F5F3FA',
        '--text-secondary': '#A99FC0',
        '--text-tertiary': '#6A607E',
        '--accent': '#A78BFA',
        '--accent-hover': '#C4B5FD',
        '--accent-subtle': 'rgba(167, 139, 250, 0.14)',
        '--accent-glow': 'rgba(167, 139, 250, 0.3)',
        '--accent-warm': '#D0C0FF',
        '--accent-warm-glow': 'rgba(167, 139, 250, 0.3)'
      }
    },
    {
      id: 'stealth-graphite',
      name: 'Stealth Graphite',
      archetype: 'Pure Monochrome · Dark',
      tokens: {
        '--bg-primary': '#0A0A0A',
        '--bg-surface': '#121212',
        '--bg-elevated': '#1A1A1A',
        '--border-subtle': '#262626',
        '--border-visible': '#383838',
        '--border-active': 'rgba(229, 229, 229, 0.35)',
        '--text-primary': '#ECECEC',
        '--text-secondary': '#9A9A9A',
        '--text-tertiary': '#5C5C5C',
        '--accent': '#E5E5E5',
        '--accent-hover': '#FFFFFF',
        '--accent-subtle': 'rgba(229, 229, 229, 0.1)',
        '--accent-glow': 'rgba(229, 229, 229, 0.2)',
        '--accent-warm': '#F5F5F5',
        '--accent-warm-glow': 'rgba(229, 229, 229, 0.2)'
      }
    },

    // ── LIGHT MODE PALETTES ─────────────────────────────────────────────────
    {
      id: 'snow-obsidian-ink',
      name: 'Snow & Obsidian Ink',
      archetype: 'Swiss Clarity · Light',
      tokens: {
        '--bg-primary': '#FAFAFA',
        '--bg-surface': '#F2F2F2',
        '--bg-elevated': '#FFFFFF',
        '--border-subtle': '#E5E5E5',
        '--border-visible': '#D4D4D4',
        '--border-active': 'rgba(23, 23, 23, 0.35)',
        '--text-primary': '#171717',
        '--text-secondary': '#525252',
        '--text-tertiary': '#A3A3A3',
        '--accent': '#171717',
        '--accent-hover': '#404040',
        '--accent-subtle': 'rgba(23, 23, 23, 0.08)',
        '--accent-glow': 'rgba(23, 23, 23, 0.15)',
        '--accent-warm': '#333333',
        '--accent-warm-glow': 'rgba(23, 23, 23, 0.15)'
      }
    },
    {
      id: 'ivory-azure-sky',
      name: 'Ivory & Azure Sky',
      archetype: 'Trust & Clarity · Light',
      tokens: {
        '--bg-primary': '#F8FAFC',
        '--bg-surface': '#F0F5FA',
        '--bg-elevated': '#FFFFFF',
        '--border-subtle': '#E1E8F0',
        '--border-visible': '#CBD5E1',
        '--border-active': 'rgba(37, 99, 235, 0.4)',
        '--text-primary': '#0F172A',
        '--text-secondary': '#475569',
        '--text-tertiary': '#94A3B8',
        '--accent': '#2563EB',
        '--accent-hover': '#3B82F6',
        '--accent-subtle': 'rgba(37, 99, 235, 0.1)',
        '--accent-glow': 'rgba(37, 99, 235, 0.2)',
        '--accent-warm': '#4F8EF7',
        '--accent-warm-glow': 'rgba(37, 99, 235, 0.2)'
      }
    },
    {
      id: 'pearl-emerald-garden',
      name: 'Pearl & Emerald Garden',
      archetype: 'Organic Growth · Light',
      tokens: {
        '--bg-primary': '#F6FAF7',
        '--bg-surface': '#EDF5EF',
        '--bg-elevated': '#FFFFFF',
        '--border-subtle': '#D6E8DA',
        '--border-visible': '#B8D6BF',
        '--border-active': 'rgba(5, 150, 105, 0.4)',
        '--text-primary': '#0D1F15',
        '--text-secondary': '#3D6E50',
        '--text-tertiary': '#7FAA8F',
        '--accent': '#059669',
        '--accent-hover': '#10B981',
        '--accent-subtle': 'rgba(5, 150, 105, 0.1)',
        '--accent-glow': 'rgba(5, 150, 105, 0.2)',
        '--accent-warm': '#22C588',
        '--accent-warm-glow': 'rgba(5, 150, 105, 0.2)'
      }
    },
    {
      id: 'linen-terracotta-warmth',
      name: 'Linen & Terracotta',
      archetype: 'Warm Earth · Light',
      tokens: {
        '--bg-primary': '#FBF8F4',
        '--bg-surface': '#F4EDE4',
        '--bg-elevated': '#FFFCF8',
        '--border-subtle': '#E6D9CB',
        '--border-visible': '#D4C3B0',
        '--border-active': 'rgba(180, 95, 55, 0.4)',
        '--text-primary': '#2A1F16',
        '--text-secondary': '#6E5844',
        '--text-tertiary': '#A8947E',
        '--accent': '#B45F37',
        '--accent-hover': '#CC7448',
        '--accent-subtle': 'rgba(180, 95, 55, 0.1)',
        '--accent-glow': 'rgba(180, 95, 55, 0.2)',
        '--accent-warm': '#D8804E',
        '--accent-warm-glow': 'rgba(180, 95, 55, 0.2)'
      }
    },
    {
      id: 'frost-electric-indigo',
      name: 'Frost & Electric Indigo',
      archetype: 'Modern SaaS · Light',
      tokens: {
        '--bg-primary': '#F7F7FB',
        '--bg-surface': '#EEEEF5',
        '--bg-elevated': '#FFFFFF',
        '--border-subtle': '#DDDDE8',
        '--border-visible': '#C8C8DA',
        '--border-active': 'rgba(79, 70, 229, 0.4)',
        '--text-primary': '#1A1736',
        '--text-secondary': '#4C476A',
        '--text-tertiary': '#9590B0',
        '--accent': '#4F46E5',
        '--accent-hover': '#6366F1',
        '--accent-subtle': 'rgba(79, 70, 229, 0.1)',
        '--accent-glow': 'rgba(79, 70, 229, 0.2)',
        '--accent-warm': '#7C7AF5',
        '--accent-warm-glow': 'rgba(79, 70, 229, 0.2)'
      }
    },
    {
      id: 'cloud-coral-sunset',
      name: 'Cloud & Coral Sunset',
      archetype: 'Vibrant Warmth · Light',
      tokens: {
        '--bg-primary': '#FFFAF8',
        '--bg-surface': '#FFF0EB',
        '--bg-elevated': '#FFFFFF',
        '--border-subtle': '#F5DED4',
        '--border-visible': '#EBC8B8',
        '--border-active': 'rgba(236, 72, 89, 0.4)',
        '--text-primary': '#2B1318',
        '--text-secondary': '#7D4050',
        '--text-tertiary': '#B88494',
        '--accent': '#EC4859',
        '--accent-hover': '#F06B7A',
        '--accent-subtle': 'rgba(236, 72, 89, 0.1)',
        '--accent-glow': 'rgba(236, 72, 89, 0.2)',
        '--accent-warm': '#F48490',
        '--accent-warm-glow': 'rgba(236, 72, 89, 0.2)'
      }
    }
  ];

  // ==========================================================================
  // 2. DATA: 10 PREMIER FONT PAIRINGS (Futuristic + Humanist + 8 New)
  // ==========================================================================
  const FONT_PAIRINGS = [
    // ── KEEP: Futuristic Nordic Terminal ─────────────────────────────────────
    {
      id: 'futuristic-nordic-terminal',
      name: 'Futuristic Nordic Terminal',
      tone: 'Cybernetic liquidity & telemetry (Crypto / Protocol)',
      headlineFamily: "'Sora', sans-serif",
      bodyFamily: "'Plus Jakarta Sans', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@500;600;700&display=swap'
    },
    // ── KEEP: Warming Humanist Craft ────────────────────────────────────────
    {
      id: 'warming-humanist-craft',
      name: 'Warming Humanist Craft',
      tone: 'Warm, approachable product craftsmanship (Basecamp)',
      headlineFamily: "'Fraunces', serif",
      bodyFamily: "'DM Sans', sans-serif",
      monoFamily: "'IBM Plex Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap'
    },
    // ── NEW 1: Geometric Precision ──────────────────────────────────────────
    {
      id: 'geometric-precision-duo',
      name: 'Geometric Precision',
      tone: 'Mathematical clarity & Swiss rigor (Linear / Stripe)',
      headlineFamily: "'Inter Tight', sans-serif",
      bodyFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      monoFamily: "'Fira Code', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap'
    },
    // ── NEW 2: Dramatic Serif ───────────────────────────────────────────────
    {
      id: 'dramatic-editorial-serif',
      name: 'Dramatic Editorial Serif',
      tone: 'Magazine masthead elegance (Vogue / Bloomberg)',
      headlineFamily: "'DM Serif Display', Georgia, serif",
      bodyFamily: "'Source Sans 3', sans-serif",
      monoFamily: "'Source Code Pro', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Source+Code+Pro:wght@400;500&family=Source+Sans+3:wght@400;500;600&display=swap'
    },
    // ── NEW 3: Monospace Engineering ────────────────────────────────────────
    {
      id: 'monospace-engineering',
      name: 'Monospace Engineering',
      tone: 'Code-first identity for developer brands (GitHub / Terminal)',
      headlineFamily: "'JetBrains Mono', monospace",
      bodyFamily: "'IBM Plex Sans', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap'
    },
    // ── NEW 4: Scientific Rationalist ───────────────────────────────────────
    {
      id: 'scientific-rationalist',
      name: 'Scientific Rationalist',
      tone: 'Data-driven research & precision analytics (NASA / CERN)',
      headlineFamily: "'Barlow', sans-serif",
      bodyFamily: "'IBM Plex Sans', sans-serif",
      monoFamily: "'IBM Plex Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap'
    },
    // ── NEW 5: Humanist Neo-Classic ─────────────────────────────────────────
    {
      id: 'humanist-neo-classic',
      name: 'Humanist Neo-Classic',
      tone: 'Intellectual warmth meets modern readability (Stripe / Medium)',
      headlineFamily: "'Libre Baskerville', Georgia, serif",
      bodyFamily: "'Lato', sans-serif",
      monoFamily: "'Inconsolata', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600&family=Lato:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap'
    },
    // ── NEW 6: Expressive Display ───────────────────────────────────────────
    {
      id: 'expressive-display-bold',
      name: 'Expressive Display Bold',
      tone: 'High-contrast ink-trap hero typography (Wix / Awwwards)',
      headlineFamily: "'Bricolage Grotesque', sans-serif",
      bodyFamily: "'Outfit', sans-serif",
      monoFamily: "'Space Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Outfit:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap'
    },
    // ── NEW 7: Elegant Contemporary ─────────────────────────────────────────
    {
      id: 'elegant-contemporary',
      name: 'Elegant Contemporary',
      tone: 'Refined luxury meets tech clarity (Lemon Squeezy / Rauno)',
      headlineFamily: "'Manrope', sans-serif",
      bodyFamily: "'Nunito Sans', sans-serif",
      monoFamily: "'Geist Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Manrope:wght@500;600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700&display=swap'
    },
    // ── NEW 8: Space-Age Industrial ─────────────────────────────────────────
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

  let activePaletteId = localStorage.getItem(STORAGE_KEY_PALETTE) || 'nordic-titanium-frost';
  let activeFontId = localStorage.getItem(STORAGE_KEY_FONT) || 'futuristic-nordic-terminal';

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
      <span class="launcher-badge">15 × 10</span>
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
          <div class="studio-subtitle">15 Color Palettes · 10 Font Pairings · Dark & Light</div>
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
        <button class="studio-tab-btn active" data-tab="palettes">Color Palettes (15)</button>
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
      applyPalette('nordic-titanium-frost');
      applyFontPairing('futuristic-nordic-terminal');
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
