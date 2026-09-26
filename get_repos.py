import urllib.request
import re
url = 'https://github.com/adeelabbasi111?tab=repositories'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'itemprop="name codeRepository">\s*(.*?)\s*</a>', html)
    print("Repos:", matches)
except Exception as e:
    print("Error:", e)
