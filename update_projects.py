import re

def update_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # Replace the fake project names with real ones
    # 1. Project Dashboard -> CUST-PORTAL-2.0
    html = re.sub(r'<h3 class="work-title">Nexus Analytics</h3>', '<h3 class="work-title">CUST-PORTAL-2.0</h3>', html)
    html = re.sub(r'<span class="work-client">Nexus Corp</span>', '<span class="work-client">University Portal</span>', html)
    
    # 2. Project Game -> The-Chain-Reaction
    html = re.sub(r'<h3 class="work-title">Neon Drift</h3>', '<h3 class="work-title">The-Chain-Reaction</h3>', html)
    html = re.sub(r'<span class="work-client">Polyarc</span>', '<span class="work-client">Game Dev</span>', html)
    
    # 3. Project Branding -> mosquitobusters.pk
    html = re.sub(r'<h3 class="work-title">Aura Skincare</h3>', '<h3 class="work-title">mosquitobusters.pk</h3>', html)
    html = re.sub(r'<span class="work-client">Aura</span>', '<span class="work-client">Business Website</span>', html)
    
    # 4. Project Mobile App -> Whatsapp-Automater
    html = re.sub(r'<h3 class="work-title">Vibe Fitness</h3>', '<h3 class="work-title">Whatsapp-Automater</h3>', html)
    html = re.sub(r'<span class="work-client">Vibe</span>', '<span class="work-client">Automation Tool</span>', html)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {filepath}")

update_html('index.html')
update_html('work.html')
