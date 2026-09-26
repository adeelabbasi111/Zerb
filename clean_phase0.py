import os
import re
import glob

def fix_mojibake(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    replacements = {
        'â€”': '—',
        'â†’': '→',
        'â€¢': '•',
        'Â©': '©',
        'Ã¢â‚¬â€': '—',
        'Ã¢â€žÂ¢': '™',
        '': '',
        '?"': '—'
    }
    
    original_content = content
    for bad, good in replacements.items():
        content = content.replace(bad, good)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed mojibake in {filepath}")

def add_meta_tags(filepath):
    if not filepath.endswith('.html'): return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add favicon and meta tags if missing
    if 'favicon.ico' not in content:
        meta_tags = '''
    <meta name="theme-color" content="#0C0A09">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <meta property="og:title" content="ZERB — Premium Software House">
    <meta property="og:description" content="We engineer digital products that move industries.">
    <meta property="og:image" content="/og-image.jpg">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
'''
        content = content.replace('</head>', meta_tags + '</head>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added meta tags to {filepath}")

# Find all files
files = glob.glob('**/*.html', recursive=True) + glob.glob('**/*.css', recursive=True) + glob.glob('**/*.js', recursive=True)

for file in files:
    fix_mojibake(file)
    add_meta_tags(file)

print("Phase 0 Cleanup Complete.")
