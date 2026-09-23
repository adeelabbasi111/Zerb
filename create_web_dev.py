import io
with io.open('about.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract head, nav, footer
head_match = html.split('</head>')[0] + '</head>\n'
nav_match = html.split('</nav>')[0] + '</nav>\n'
# Mobile menu
mobile_menu = html.split('<!-- ====================================================================\n         HERO SECTION')[0].split('</nav>')[1]

footer_match = '<footer class="site-footer" role="contentinfo">' + html.split('<footer class="site-footer" role="contentinfo">')[1]

new_html = head_match.replace('pages/about.css', 'pages/service-detail.css').replace('href="css/', 'href="../css/').replace('href="assets/', 'href="../assets/').replace('ZERB — About', 'ZERB — Web Development')

# Adjust links in nav for subdirectory
nav_html = nav_match.replace('href="index.html', 'href="../index.html').replace('href="work.html', 'href="../work.html').replace('href="services.html', 'href="../services.html').replace('href="about.html', 'href="../about.html').replace('href="contact.html', 'href="../contact.html')
nav_html = nav_html.replace('src="assets/', 'src="../assets/')

mobile_html = mobile_menu.replace('href="index.html', 'href="../index.html').replace('href="work.html', 'href="../work.html').replace('href="services.html', 'href="../services.html').replace('href="about.html', 'href="../about.html').replace('href="contact.html', 'href="../contact.html')

footer_html = footer_match.replace('href="index.html', 'href="../index.html').replace('href="work.html', 'href="../work.html').replace('href="services.html', 'href="../services.html').replace('href="about.html', 'href="../about.html').replace('href="contact.html', 'href="../contact.html').replace('src="js/', 'src="../js/')

# Custom Cursor HTML
cursor_html = '''
    <!-- Custom Cursor -->
    <div class="custom-cursor"></div>
    <div class="custom-cursor-follower"></div>
    <div class="noise-overlay"></div>
'''

content_html = '''
    <!-- ====================================================================
         SERVICE HERO
         ==================================================================== -->
    <header class="service-detail-hero section">
        <div class="service-hero-orb"></div>
        <div class="container">
            <span class="t-mono t-label" style="display: block; margin-bottom: var(--space-4); color: var(--accent);">Capability // 01</span>
            <h1 class="service-hero-title">Web<br>Development</h1>
            <p class="service-hero-desc">We engineer high-performance platforms, immersive marketing sites, and scalable web applications that redefine digital presence.</p>
        </div>
    </header>

    <!-- ====================================================================
         TECH MARQUEE
         ==================================================================== -->
    <div class="tech-marquee-wrapper">
        <div class="tech-marquee">
            <span class="tech-marquee-item">REACT.JS</span>
            <span class="tech-marquee-item">NEXT.JS</span>
            <span class="tech-marquee-item">NODE.JS</span>
            <span class="tech-marquee-item">TYPESCRIPT</span>
            <span class="tech-marquee-item">WEBGL</span>
            <span class="tech-marquee-item">THREE.JS</span>
            <!-- Duplicate for infinite effect -->
            <span class="tech-marquee-item">REACT.JS</span>
            <span class="tech-marquee-item">NEXT.JS</span>
            <span class="tech-marquee-item">NODE.JS</span>
            <span class="tech-marquee-item">TYPESCRIPT</span>
            <span class="tech-marquee-item">WEBGL</span>
            <span class="tech-marquee-item">THREE.JS</span>
        </div>
    </div>

    <!-- ====================================================================
         APPROACH
         ==================================================================== -->
    <section class="section">
        <div class="container">
            <h2 class="t-h2">Our Approach</h2>
            <div class="approach-grid">
                <div class="approach-step">
                    <span class="approach-step-num">01</span>
                    <h3 class="t-h3 approach-title">Architecture First</h3>
                    <p class="approach-desc">We don't just start coding. We design the data models, system architecture, and component trees to ensure the application scales effortlessly as your user base grows.</p>
                </div>
                <div class="approach-step">
                    <span class="approach-step-num">02</span>
                    <h3 class="t-h3 approach-title">Performance Obsession</h3>
                    <p class="approach-desc">Sub-second load times aren't a luxury, they're a requirement. We optimize asset delivery, utilize edge caching, and minimize main-thread execution.</p>
                </div>
                <div class="approach-step">
                    <span class="approach-step-num">03</span>
                    <h3 class="t-h3 approach-title">Fluid Interactions</h3>
                    <p class="approach-desc">A web app should feel alive. We integrate physics-based animations, smooth page transitions, and micro-interactions that delight users.</p>
                </div>
                <div class="approach-step">
                    <span class="approach-step-num">04</span>
                    <h3 class="t-h3 approach-title">Bulletproof Deployment</h3>
                    <p class="approach-desc">Automated testing, continuous integration, and zero-downtime deployments. We build infrastructure that lets you ship with confidence.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ====================================================================
         CTA
         ==================================================================== -->
    <section class="section cta-section">
        <div class="container text-center">
            <h2 class="t-h2" style="margin-bottom: var(--space-4);">Ready to build your platform?</h2>
            <a href="../contact.html" class="btn btn-primary btn-lg">Start a project →</a>
        </div>
    </section>
'''

final_page = new_html + '<body>\n' + cursor_html + nav_html + mobile_html + content_html + footer_html

with io.open('services/web-development.html', 'w', encoding='utf-8') as f:
    f.write(final_page)
print('Created web-development.html')
