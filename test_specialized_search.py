# -*- coding: utf-8 -*-
import requests

test_items = [
    ("9S52M POLYANA-D4M", "Polyana-D4"),
    ("9S932 BARNAULT-T", "Barnaul-T"),
    ("PU-12-M6", "PU-12"),
    ("34L6 SENEZH-M1E", "Senezh"),
    ("1L219 ZOOPARK-1", "Zoopark-1"),
    ("KASTA 2E1 (39N6)", "Kasta 2E1"),
    ("Ka-52 ALIGATOR (HOKUM-B)", "Kamov Ka-52"),
    ("SU-34 (FULLBACK)", "Sukhoi Su-34"),
    ("2S35 KOALICJA-SW", "2S35 Koalitsiya-SV"),
    ("T-14 AMATA", "T-14 Armata")
]

headers = {'User-Agent': 'QuizAppTester/1.0 (contact: info@quiz.test)'}

for name, query in test_items:
    # 1. Commons search
    url1 = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={query}&srnamespace=6&srlimit=5&format=json&origin=*"
    try:
        r1 = requests.get(url1, headers=headers, timeout=5).json()
        items1 = [x['title'] for x in r1.get('query', {}).get('search', []) if any(x['title'].lower().endswith(ext) for ext in ['.jpg', '.png'])]
        print(f"[{name}] Commons search found {len(items1)} items")
        if len(items1) > 0:
            print("  sample title:", items1[0])
            continue
    except Exception as e:
        pass
    
    # 2. REST summary
    for lang in ['en', 'pl', 'ru']:
        url2 = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{query}"
        try:
            r2 = requests.get(url2, headers=headers, timeout=5).json()
            thumb = r2.get('thumbnail', {}).get('source')
            if thumb:
                print(f"[{name}] REST summary ({lang}) found thumbnail: {thumb[:60]}...")
                break
        except Exception:
            pass
    else:
        print(f"[{name}] NOT FOUND in primary sources!")
