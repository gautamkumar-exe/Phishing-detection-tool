import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def extract_features(url):
    
    features = {}

    # 1. URL Length
    features['url_length'] = len(url)

    # 2. HTTPS check
    features['has_https'] = 1 if url.startswith("https") else 0

    # 3. Count dots
    features['count_dots'] = url.count('.')

    # 4. Count hyphens
    features['count_hyphens'] = url.count('-')

    # 5. Has IP address
    features['has_ip'] = 1 if re.match(r"^\d+\.\d+\.\d+\.\d+", url) else 0

    # 6. Domain length
    domain = urlparse(url).netloc
    features['domain_length'] = len(domain)

    return features