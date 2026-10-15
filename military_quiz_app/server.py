#!/usr/bin/env python3
"""
Military Quiz Server - Cross-platform (Windows & Android)
Uruchamia serwer HTTP dla aplikacji Quiz Militarny (BWP / BMD / BTR),
wykrywa lokalne IP dla urządzeń z Androidem i obsługuje wyszukiwanie obrazów.
"""

import http.server
import socketserver
import socket
import urllib.parse
import json
import os
import sys
import webbrowser
import requests
import time

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    """Wykrywa adres IP komputera w lokalnej sieci Wi-Fi/LAN."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Nie wysyła rzeczywistego pakietu, służy tylko do ustalenia interfejsu sieciowego
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

# Mapowanie zapytań dla wyszukiwania na żywo
VEHICLE_SEARCH_TERMS = {
    "bwp 1": "BMP-1",
    "bwp 2": "BMP-2",
    "bwp 3": "BMP-3",
    "bwp 4": "BWP_Borsuk",
    "bmd 1": "BMD-1",
    "bmd 2": "BMD-2",
    "bmd 3": "BMD-3",
    "bmd 4": "BMD-4",
    "btr 60": "BTR-60",
    "btr 70": "BTR-70",
    "btr 80": "BTR-80",
    "btr 82a": "BTR-82A",
    "btr 90": "BTR-90"
}

class QuizRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # Endpoint: Informacje o adresach sieciowych
        if parsed.path == '/api/info':
            local_ip = get_local_ip()
            info = {
                "local_url": f"http://localhost:{PORT}",
                "network_url": f"http://{local_ip}:{PORT}",
                "ip": local_ip,
                "port": PORT
            }
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(info).encode('utf-8'))
            return

        # Endpoint: Pobieranie na bieżąco z sieci dla danego hasła
        if parsed.path == '/api/search_image':
            params = urllib.parse.parse_qs(parsed.query)
            q = params.get('query', [''])[0].strip().lower()
            
            wiki_title = VEHICLE_SEARCH_TERMS.get(q, q)
            safe_name = q.replace(" ", "_")
            local_fallback = f"images/{safe_name}.jpg"
            
            image_url = None
            source_tag = "LIVE GOOGLE / WEB"

            # 1. Próba pobrania na żywo przez oficjalne Wikipedia/Wikimedia REST API
            try:
                headers = {"User-Agent": "MilitaryQuizApp/1.0 (contact: support@militaryquiz.test)"}
                r = requests.get(f"https://en.wikipedia.org/api/rest_v1/page/summary/{wiki_title}", headers=headers, timeout=2.5)
                if r.status_code == 200:
                    data = r.json()
                    img = data.get("originalimage", {}).get("source") or data.get("thumbnail", {}).get("source")
                    if img:
                        image_url = img.split("?")[0]
                        source_tag = "LIVE GOOGLE / WEB"
            except Exception:
                pass

            # Jeśli nie powiodło się, używamy lokalnego zapisanego zdjęcia
            if not image_url:
                image_url = local_fallback
                source_tag = "KATALOG LOKALNY"

            result = {
                "query": q,
                "url": image_url,
                "source": source_tag
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))
            return

        # Domyślna obsługa plików statycznych (HTML, CSS, JS, obrazy)
        return super().do_GET()

def run_server():
    local_ip = get_local_ip()
    url_local = f"http://localhost:{PORT}"
    url_network = f"http://{local_ip}:{PORT}"

    print("=" * 64)
    print("   🎖️  QUIZ MILITARNY: BWP • BMD • BTR (WINDOWS & ANDROID)")
    print("=" * 64)
    print(f" ► Windows (ten komputer):  {url_local}")
    print(f" ► Android (telefon/tablet): {url_network}")
    print("=" * 64)
    print(" Instrukcja dla Androida:")
    print(f" 1. Połącz telefon z tą samą siecią Wi-Fi.")
    print(f" 2. Otwórz w przeglądarce: {url_network}")
    print(f" 3. W Chrome kliknij 'Dodaj do ekranu głównego', aby zainstalować.")
    print("=" * 64)
    print(" Aplikacja działa w nieskończoność.")
    print(" Naciśnij Ctrl + C w tym oknie, aby zakończyć działanie programu.")
    print("=" * 64)

    # Otwórz w domyślnej przeglądarce na Windowsie
    try:
        webbrowser.open(url_local)
    except Exception:
        pass

    # Uruchom serwer wielowątkowy / TCP
    class ReusableTCPServer(socketserver.ThreadingTCPServer):
        allow_reuse_address = True

    with ReusableTCPServer(("", PORT), QuizRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nZatrzymano serwer Quizu Militarnego. Do widzenia!")
            sys.exit(0)

if __name__ == '__main__':
    run_server()
