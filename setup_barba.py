import glob
import re

files = glob.glob('**/*.html', recursive=True)
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Add data-barba attributes
    if 'data-barba="wrapper"' not in html:
        html = html.replace('<body class="keyboard-nav">', '<body class="keyboard-nav" data-barba="wrapper">')
        html = html.replace('<body>', '<body data-barba="wrapper">')
        
        # We need to wrap the main content, but exclude navbar and footer so they persist.
        # But for now, let's wrap everything inside a barba container if we are just starting.
        # Actually, let's just inject the CDN link for Barba
        if 'barba.js' not in html:
            script_tag = '<script src="https://cdn.jsdelivr.net/npm/@barba/core"></script>\n</body>'
            html = html.replace('</body>', script_tag)
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Added Barba infrastructure to {file}")
