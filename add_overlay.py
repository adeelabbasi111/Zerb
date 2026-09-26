import glob

files = glob.glob('**/*.html', recursive=True)
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
        
    if 'id="mobile-overlay"' not in html:
        html = html.replace('<div class="mobile-menu"', '<div class="mobile-overlay" id="mobile-overlay"></div>\n    <div class="mobile-menu"')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Added mobile overlay to {file}")
