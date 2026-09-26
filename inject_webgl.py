import re
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

if 'webgl-hero.js' not in html:
    html = html.replace('<script src="js/animations.js"></script>', '<script src="js/webgl-hero.js"></script>\n    <script src="js/animations.js"></script>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Added webgl-hero.js to index.html")
