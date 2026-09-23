import io
import re

files_to_fix = ['work.html', 'about.html', 'services.html', 'contact.html']

for file in files_to_fix:
    with io.open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Remove the first instance of GSAP and Lenis if they are duplicated
    html = re.sub(r'<script src="https://cdn\.jsdelivr\.net/npm/lenis@1\.1\.18/dist/lenis\.min\.js"></script>\s*<script src="https://cdnjs\.cloudflare\.com/ajax/libs/gsap/3\.12\.5/gsap\.min\.js"></script>\s*<script src="https://cdnjs\.cloudflare\.com/ajax/libs/gsap/3\.12\.5/ScrollTrigger\.min\.js"></script>\s*', '', html, count=1)
    
    with io.open(file, 'w', encoding='utf-8') as f:
        f.write(html)
        
print('Deduplicated scripts on root pages.')
