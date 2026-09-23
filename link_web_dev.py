import io

with io.open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<h3 class="cap-title">Web Development</h3>', '<h3 class="cap-title"><a href="services/web-development.html" style="color: inherit; text-decoration: none; position: static;">Web Development</a></h3>')
html = html.replace('<div class="cap-card" data-index="0">', '<div class="cap-card" data-index="0" style="cursor: pointer;" onclick="window.location.href=\'services/web-development.html\'">')

with io.open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
