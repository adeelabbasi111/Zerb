import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Clean mojibake globally
text = re.sub(r'ÃƒÆ’.*?¢', '—', text)
text = re.sub(r'ÃƒÆ’.*?©', '©', text)
text = re.sub(r'ÃƒÆ’.*?·', '·', text)
text = re.sub(r'ÃƒÆ’[^\s<a-zA-Z0-9]+', '—', text)
text = re.sub(r'Ã[^\s<a-zA-Z0-9]+', '—', text)

# Clean up testimonial quotes that got mangled
text = text.replace('— ZERB didn—t', '"ZERB didn\'t')
text = text.replace('imagined. The product shipped on time and users loved it from day one.—', 'imagined. The product shipped on time and users loved it from day one."')
text = text.replace('— They rebuilt', '"They rebuilt')
text = text.replace('dropped by 60%. Exceptional technical team.—', 'dropped by 60%. Exceptional technical team."')

# Replace connector arrows completely
text = re.sub(r'<span class="process-connector" aria-hidden="true">.*?</span>', '<span class="process-connector" aria-hidden="true">—</span>', text, flags=re.DOTALL)

# 2. Add process-wrapper
if '<div class="process-wrapper">' not in text:
    text = text.replace('<div class="process-track" role="list">', '<div class="process-wrapper">\n            <div class="process-track" role="list">')
    text = text.replace('        </div>\n    </section>\n\n    <!-- ====================================================================\n         07', '        </div>\n        </div>\n    </section>\n\n    <!-- ====================================================================\n         07')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)
print('Fixed HTML')
