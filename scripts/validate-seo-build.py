import re
from pathlib import Path
from bs4 import BeautifulSoup

root = Path('dist')
xml = (root / 'sitemap.xml').read_text()
paths = [re.sub(r'^https?://[^/]+', '', x) or '/' for x in re.findall(r'<loc>(.*?)</loc>', xml)]
failures=[]
articles=0
for route in paths:
    p = root / ('index.html' if route == '/' else route.lstrip('/') + '/index.html')
    if not p.exists():
        failures.append((route,'missing-html'))
        continue
    s=BeautifulSoup(p.read_text(), 'html.parser')
    canonical=[x.get('href') for x in s.find_all('link',rel='canonical')]
    expected='https://www.euvouserdoutor.com' + ('' if route=='/' else route)
    if canonical != [expected]: failures.append((route,'canonical',canonical,expected))
    if not s.title or not s.title.get_text(strip=True): failures.append((route,'missing-title'))
    if not s.find('h1'): failures.append((route,'missing-h1'))
    if '/noticias/' in route:
        articles += 1
        if 'NewsArticle' not in ''.join(x.get_text() for x in s.find_all('script',type='application/ld+json')): failures.append((route,'missing-newsarticle'))
        if len(s.get_text(' ',strip=True)) < 1000: failures.append((route,'thin-body'))
print('ROUTES',len(paths))
print('ARTICLES',articles)
print('FAILURES',len(failures))
for x in failures[:50]: print(x)
if failures: raise SystemExit(1)
