# 🎖️ Quiz Militarny: BWP • BMD • BTR (Windows & Android)

Nowoczesna aplikacja quizowa typu **PWA (Progressive Web App)** działająca zarówno na systemie **Windows**, jak i **Android**.

Aplikacja działa w **pętli w nieskończoność** (nowe pytania generowane są bez przerwy, dopóki użytkownik nie zdecyduje o zakończeniu).

---

## 📋 Główne funkcjonalności

1. **Pętla w nieskończoność**: Quiz generuje losowe pytania bez końca. Zapisuje serię trafień (streak), rekord punktów i celność (%).
2. **Zdjęcia na środku ekranu pobierane na bieżąco**: Aplikacja pobiera na bieżąco z sieci/Google oryginalne zdjęcia wozów bojowych, z automatycznym buforem lokalnym (odporność na brak internetu czy limity API).
3. **Cztery odpowiedzi pod spodem**: Każde pytanie losuje 1 poprawną odpowiedź oraz 3 inne losowe z puli 13 haseł.
4. **Natychmiastowy feedback w czasie rzeczywistym**:
   - Wybrany przycisk podświetla się na **zielono** (poprawna) lub **czerwono** (błędna z animacją shake).
   - W przypadku błędu poprawna odpowiedź zostaje natychmiast wskazana na zielono, aby gracz od razu zapamiętał właściwy pojazd.
   - Pasek informacyjny z nazwą i charakterystyką pojazdu (uzbrojenie, przeznaczenie).
   - Dźwięki (synteza Web Audio API – działa bez pobierania zewnętrznych plików audio).
5. **Pula 13 haseł**:
   - `bwp 1`, `bwp 2`, `bwp 3`, `bwp 4 (Borsuk)`
   - `bmd 1`, `bmd 2`, `bmd 3`, `bmd 4`
   - `btr 60`, `btr 70`, `btr 80`, `btr 82a`, `btr 90`

---

## 🚀 Jak uruchomić na Windowsie

### Sposób 1: Jeden klik (Zalecany)
Dwukrotnie kliknij plik:
```bat
start.bat
```
Skrypt uruchomi lokalny serwer i automatycznie otworzy quiz w Twojej domyślnej przeglądarce.

### Sposób 2: Z poziomu konsoli
```powershell
python server.py
```
Aplikacja uruchomi się pod adresem: `http://localhost:8000`.

### Sposób 3: Bezpośrednie otwarcie
Możesz również po prostu otworzyć plik `index.html` w dowolnej przeglądarce (Chrome, Edge, Firefox).

---

## 📱 Jak uruchomić na telefonie z Androidem

1. Uruchom serwer na komputerze (`start.bat` lub `python server.py`).
2. W oknie konsoli lub w samej aplikacji kliknij przycisk **„📱 Graj na Androidzie”**.
3. Zeskanuj aparatem w telefonie wyświetlony **kod QR** lub wpisz w przeglądarce Chrome na telefonie adres lokalny (np. `http://192.168.0.96:8000`).
4. **Instalacja jako aplikacja natywna (PWA)**:
   - W Chrome na Androidzie kliknij menu (trzy kropki w prawym górnym rogu).
   - Wybierz **„Zainstaluj aplikację”** lub **„Dodaj do ekranu głównego”**.
   - Na pulpicie telefonu pojawi się ikona aplikacji, a po jej otwarciu quiz działa w trybie pełnoekranowym bez pasków przeglądarki!

---

## 🎮 Sterowanie (Klawiatura na Windowsie)

- Klawisze `1`, `2`, `3`, `4` lub `A`, `B`, `C`, `D` – wybór odpowiedzi
- `Enter` lub `Spacja` – przejście do następnego pytania
- Przełącznik **Auto-przejście (1.8s)** – automatyczne przełączanie po udzieleniu odpowiedzi
