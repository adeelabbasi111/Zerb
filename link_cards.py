import io
import re

with io.open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

links = {
    1: 'services/app-development.html',
    2: 'services/game-development.html',
    3: 'services/graphic-design.html',
    4: 'services/video-editing.html',
    5: 'services/ui-ux-design.html'
}

for idx, url in links.items():
    old_div = f'<div class="cap-card" data-index="{idx}">'
    new_div = f'<div class="cap-card" data-index="{idx}" style="cursor: pointer;" onclick="window.location.href=\'{url}\'">'
    html = html.replace(old_div, new_div)

with io.open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Linked cards in index.html')
