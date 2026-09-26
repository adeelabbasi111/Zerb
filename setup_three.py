import glob

files = glob.glob('**/*.html', recursive=True)
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
        
    if 'three.min.js' not in html:
        three_tags = '''
    <!-- Three.js for WebGL Effects -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
'''
        # We'll put it right before the closing body tag or near lenis
        html = html.replace('</head>', three_tags + '</head>')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Added Three.js to {file}")
