import os

SERVICES = [
    {
        "id": "web-development",
        "num": "01",
        "title": "Web<br>Development",
        "desc": "We engineer high-performance platforms, immersive marketing sites, and scalable web applications that redefine digital presence.",
        "marquee": ["REACT.JS", "NEXT.JS", "NODE.JS", "TYPESCRIPT", "WEBGL", "THREE.JS"],
        "orb": "var(--accent)"
    },
    {
        "id": "app-development",
        "num": "02",
        "title": "App<br>Development",
        "desc": "Native and cross-platform mobile applications that feel fast, look sharp, and solve real problems.",
        "marquee": ["SWIFT", "KOTLIN", "REACT NATIVE", "FLUTTER", "FIREBASE", "COREML"],
        "orb": "#3B82F6"
    },
    {
        "id": "game-development",
        "num": "03",
        "title": "Game<br>Development",
        "desc": "Game concepts, mechanics, UI systems, 3D assets, and full development from prototype to launch.",
        "marquee": ["UNREAL ENGINE", "UNITY", "C++", "C#", "BLENDER", "MAYA"],
        "orb": "#10B981"
    },
    {
        "id": "graphic-design",
        "num": "04",
        "title": "Graphic<br>Design",
        "desc": "Brand identity systems, visual design, marketing assets, social media, and digital campaigns with commercial intent.",
        "marquee": ["ILLUSTRATOR", "PHOTOSHOP", "INDESIGN", "TYPOGRAPHY", "BRANDING", "PRINT"],
        "orb": "#EC4899"
    },
    {
        "id": "video-editing",
        "num": "05",
        "title": "Video<br>Editing",
        "desc": "Commercials, social content, promotional videos, motion graphics, and post-production that tells your story.",
        "marquee": ["PREMIERE PRO", "AFTER EFFECTS", "DAVINCI RESOLVE", "C4D", "COLOR GRADING", "VFX"],
        "orb": "#F59E0B"
    },
    {
        "id": "ui-ux-design",
        "num": "06",
        "title": "UI/UX<br>Design",
        "desc": "Research, information architecture, wireframes, interface design, and interactive prototypes that people actually want to use.",
        "marquee": ["FIGMA", "FRAMER", "PROTOTYPING", "USER RESEARCH", "WIREFRAMING", "DESIGN SYSTEMS"],
        "orb": "#8B5CF6"
    }
]

def generate_html(service):
    marquee_html = "".join([f'<span class="tech-marquee-item">{m}</span>' for m in service["marquee"]])
    marquee_html += marquee_html
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZERB - {service['title'].replace('<br>', ' ')}</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.css">
    
    <link rel="stylesheet" href="../css/design-system.css">
    <link rel="stylesheet" href="../css/layout.css">
    <link rel="stylesheet" href="../css/components.css">
    <link rel="stylesheet" href="../css/pages/service-detail.css">
    
    <style>
        .service-hero-orb {{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80vw;
            height: 80vw;
            max-width: 800px;
            max-height: 800px;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.8 !important;
            z-index: 0;
            pointer-events: none;
        }}
        .tech-marquee-item {{
            color: transparent !important;
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3) !important;
            font-family: 'Hanken Grotesk', sans-serif !important;
        }}
    </style>
</head>
<body class="keyboard-nav">

    <!-- Page Transition Overlay -->
    <div class="page-transition-overlay">
        <div class="page-transition-logo">ZERB</div>
    </div>

    <!-- Disabled Custom Cursor for service pages to avoid headless browser artifacts -->
    <div class="custom-cursor" style="display: none !important;"></div>
    <div class="custom-cursor-follower" style="display: none !important;"></div>
    <div class="noise-overlay"></div>

    <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
        <div class="container nav-inner">
            <a href="../index.html" class="brand-logo">ZERB</a>
            
            <div class="nav-links-desktop">
                <a href="../work.html" class="nav-link">Work</a>
                <a href="../services.html" class="nav-link" aria-current="page">Services</a>
                <a href="../about.html" class="nav-link">About</a>
                <a href="../contact.html" class="btn btn-primary btn-contact-nav">Start a project <span class="arrow">&rarr;</span></a>
            </div>
            
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
                <span class="nav-toggle-line"></span>
                <span class="nav-toggle-line"></span>
            </button>
        </div>
    </nav>

    <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu-inner">
            <a href="../work.html" class="mobile-link">Work</a>
            <a href="../services.html" class="mobile-link">Services</a>
            <a href="../about.html" class="mobile-link">About</a>
            <a href="../contact.html" class="mobile-link">Contact</a>
        </div>
    </div>

    <header class="service-detail-hero section">
        <div class="service-hero-orb" style="background-color: {service['orb']};"></div>
        <div class="container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
            <span class="t-mono t-label" style="display: block; margin-bottom: var(--space-4); color: var(--accent);">Capability // {service['num']}</span>
            <h1 class="service-hero-title t-display">{service['title']}</h1>
            <p class="service-hero-desc">{service['desc']}</p>
        </div>
    </header>

    <div class="tech-marquee-wrapper">
        <div class="tech-marquee">
            {marquee_html}
        </div>
    </div>

    <section class="section">
        <div class="container">
            <h2 class="t-h2">Our Approach</h2>
            <div class="approach-grid">
                <div class="approach-step">
                    <span class="approach-step-num">01</span>
                    <h3 class="approach-title" style="font-family: 'Hanken Grotesk', sans-serif;">Architecture First</h3>
                    <p class="approach-desc">We don't just start building. We design the models, architecture, and systems to ensure the product scales effortlessly as your user base grows.</p>
                </div>
                <div class="approach-step">
                    <span class="approach-step-num">02</span>
                    <h3 class="approach-title" style="font-family: 'Hanken Grotesk', sans-serif;">Performance Obsession</h3>
                    <p class="approach-desc">Sub-second load times aren't a luxury, they're a requirement. We optimize delivery, utilize best practices, and minimize main-thread execution.</p>
                </div>
                <div class="approach-step">
                    <span class="approach-step-num">03</span>
                    <h3 class="approach-title" style="font-family: 'Hanken Grotesk', sans-serif;">Fluid Interactions</h3>
                    <p class="approach-desc">A product should feel alive. We integrate physics-based animations, smooth page transitions, and micro-interactions that delight users.</p>
                </div>
                <div class="approach-step">
                    <span class="approach-step-num">04</span>
                    <h3 class="approach-title" style="font-family: 'Hanken Grotesk', sans-serif;">Bulletproof Deployment</h3>
                    <p class="approach-desc">Automated testing, continuous integration, and rigorous QA. We build infrastructure that lets you ship with confidence.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section cta-section">
        <div class="container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <h2 class="t-h2" style="margin-bottom: var(--space-4);">Ready to build your platform?</h2>
            <a href="../contact.html" class="btn btn-primary btn-lg">Start a project &rarr;</a>
        </div>
    </section>

    <footer class="site-footer" role="contentinfo">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="../index.html" class="brand-logo footer-logo">ZERB</a>
                    <p class="footer-brand-text">A software house that designs, engineers, and ships digital products. From concept to launch and beyond.</p>
                </div>
                <div class="footer-links">
                    <h3 class="footer-heading">Navigate</h3>
                    <div class="footer-links-list">
                        <a href="../work.html">Work</a>
                        <a href="../services.html">Services</a>
                        <a href="../about.html">About</a>
                        <a href="../contact.html">Contact</a>
                    </div>
                </div>
                <div class="footer-links">
                    <h3 class="footer-heading">Connect</h3>
                    <div class="footer-links-list">
                        <a href="#" target="_blank">LinkedIn</a>
                        <a href="#" target="_blank">Instagram</a>
                        <a href="#" target="_blank">Dribbble</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 - 2026 ZERB. All rights reserved.</p>
                <p>Designed & built by ZERB.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    
    <script src="../js/core.js"></script>
    <script src="../js/animations.js"></script>
</body>
</html>'''
    with open(f"services/{service['id']}.html", "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Generated {service['id']}.html")

for s in SERVICES:
    generate_html(s)




