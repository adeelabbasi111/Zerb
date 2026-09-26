import urllib.request
url = 'https://github.com/adeelabbasi111'
try:
    html = urllib.request.urlopen(url).read().decode('utf-8')
    import re
    title = re.search(r'<title>(.*?)</title>', html)
    print("Title:", title.group(1) if title else "No title")
    print("Repos:", re.findall(r'<span class="repo" title="([^"]+)">', html))
except Exception as e:
    print("Error:", e)
