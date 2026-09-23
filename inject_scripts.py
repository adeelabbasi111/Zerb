import io
import glob

files_to_fix = ['work.html', 'about.html', 'services.html', 'contact.html']

gsap_scripts = '''
    <!-- GSAP & Lenis -->
    <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    
    <!-- Core & Animations -->
    <script src="js/core.js"></script>
    <script src="js/animations.js"></script>
'''

for file in files_to_fix:
    with io.open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    if 'js/animations.js' not in html:
        # Clean up old core.js if it exists to avoid duplicates
        html = html.replace('<script src="js/core.js"></script>', '')
        html = html.replace('</body>', gsap_scripts + '\n</body>')
        
        with io.open(file, 'w', encoding='utf-8') as f:
            f.write(html)
            
print('Fixed missing scripts on root pages.')
