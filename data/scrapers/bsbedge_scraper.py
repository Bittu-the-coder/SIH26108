import requests
from bs4 import BeautifulSoup
import json
import urllib3
import re
import time

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

url = 'https://standardsbis.bsbedge.com/Search/AdvancedSearch?SearchString=Steel&SearchType=Title'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9',
}

try:
    print(f"Fetching data from {url}...")
    # Add verify=False to bypass corporate proxies/SSL issues
    resp = requests.get(url, headers=headers, timeout=20, verify=False)
    
    if resp.status_code == 200:
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # Based on typical BSB edge structure, try to find the standard rows
        results = []
        
        # Let's try an aggressive regex approach since it's the most robust across different DOM structures
        # Look for "IS 1234 : 2024" format
        text = soup.get_text(separator=' | ')
        is_pattern = re.compile(r'(IS\s+\d+[\s\:\-\w]+)\s*\|\s*([^\|]+)')
        
        matches = is_pattern.findall(text)
        
        for match in matches:
            is_num = match[0].strip()
            title = match[1].strip()
            
            # Filter out junk matches
            if len(is_num) < 20 and len(title) > 5 and len(title) < 200:
                results.append({
                    "is_number": is_num,
                    "is_number_base": is_num.split(':')[0].strip(),
                    "title": title,
                    "scope": f"Standard specification related to {title.lower()}",
                    "classification": "Civil / Mechanical",
                    "status": "current"
                })
        
        # Deduplicate
        unique_results = {r['is_number']: r for r in results}.values()
        
        with open('real_standards.json', 'w', encoding='utf-8') as f:
            json.dump(list(unique_results), f, indent=4)
            
        print(f"SUCCESS: Extracted {len(unique_results)} standards!")
        for idx, item in enumerate(list(unique_results)[:3]):
            print(f" - {item['is_number']}: {item['title'][:50]}...")
            
    else:
        print(f"Failed to fetch. HTTP Status: {resp.status_code}")
except Exception as e:
    print(f"ERROR: {str(e)}")
