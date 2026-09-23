import io
import glob

# HTML to inject just after <body>
overlay_html = '''
    <!-- Page Transition Overlay -->
    <div class="page-transition-overlay">
        <div class="page-transition-logo">ZERB</div>
    </div>
'''

for file in glob.glob('**/*.html', recursive=True):
    with io.open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<div class="page-transition-overlay">' not in content:
        content = content.replace('<body class="keyboard-nav">', '<body class="keyboard-nav">\n' + overlay_html)
        content = content.replace('<body>', '<body>\n' + overlay_html)
        
        with io.open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            
print('Injected Page Transition HTML into all files')
