import io

with io.open('work.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add data-filters to buttons
html = html.replace('<button class="filter-btn t-label active">All</button>', '<button class="filter-btn t-label active" data-filter="all">All</button>')
html = html.replace('<button class="filter-btn t-label">Web</button>', '<button class="filter-btn t-label" data-filter="web">Web</button>')
html = html.replace('<button class="filter-btn t-label">Mobile</button>', '<button class="filter-btn t-label" data-filter="mobile">Mobile</button>')
html = html.replace('<button class="filter-btn t-label">Game</button>', '<button class="filter-btn t-label" data-filter="game">Game</button>')
html = html.replace('<button class="filter-btn t-label">Design</button>', '<button class="filter-btn t-label" data-filter="design">Design</button>')

# Add data-category to projects
html = html.replace('<!-- Project 1 -->\n                    <a href="#" class="project-card work-card">', '<!-- Project 1 -->\n                    <a href="#" class="project-card work-card" data-category="web">')
html = html.replace('<!-- Project 2 -->\n                    <a href="#" class="project-card work-card offset-card">', '<!-- Project 2 -->\n                    <a href="#" class="project-card work-card offset-card" data-category="mobile">')
html = html.replace('<!-- Project 3 -->\n                    <a href="#" class="project-card work-card">', '<!-- Project 3 -->\n                    <a href="#" class="project-card work-card" data-category="game">')
html = html.replace('<!-- Project 4 -->\n                    <a href="#" class="project-card work-card offset-card">', '<!-- Project 4 -->\n                    <a href="#" class="project-card work-card offset-card" data-category="design">')

with io.open('work.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated work.html attributes')
