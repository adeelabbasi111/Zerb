import io
import re

with io.open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_footer = '''
    <!-- ====================================================================
         GRAND FOOTER
         ==================================================================== -->
    <footer class="site-footer" role="contentinfo">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <p class="footer-brand-text">A software house that designs, engineers, and ships digital products. From concept to launch and beyond.</p>
                </div>
                <div class="footer-links">
                    <h3 class="footer-heading">Navigate</h3>
                    <div class="footer-links-list">
                        <a href="work.html">Work</a>
                        <a href="services.html">Services</a>
                        <a href="about.html">About</a>
                        <a href="contact.html">Contact</a>
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
        </div>
        <div class="footer-massive-text">ZERB</div>
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; 2024 — 2026 ZERB. All rights reserved.</p>
                <p>Designed & built by ZERB.</p>
            </div>
        </div>
    </footer>
'''

# Replace the existing footer
html = re.sub(r'<footer class="site-footer".*?</footer>', new_footer, html, flags=re.DOTALL)

# Add glassmorphism container class to navbar if it doesn't exist
if 'navbar glass-nav' not in html:
    html = html.replace('<nav class="navbar" id="navbar">', '<nav class="navbar glass-nav" id="navbar">')

with io.open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Replaced footer in index.html')
