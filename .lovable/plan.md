
## Plan: Redukcja przycisków i dodanie informacji o cookies

### Analiza obecnego stanu

Po przejrzeniu wszystkich stron serwisu zauważylem nastepujace problemy z nadmiarem przyciskow:

**Strony z wieloma przyciskami:**
- **Hero (strona glowna):** 2 przyciski ("Sprawdz dostepnosc", "Zobacz oferte")
- **Sekcja routerow:** 3 przyciski "Wybierz opcje" (po jednym na kazda karte)
- **Internet:** 2 przyciski telefoniczne w hero + 3 przyciski "Zadzwon i zamow" w pakietach
- **Telewizja:** 2 przyciski w hero + 3 w pakietach TV + 1 w TV Smart + 1 pod pakietami tematycznymi + 1 w Multiroom + 1 w Smart TV = 9 przyciskow
- **Internet+TV:** 2 przyciski w hero + 9 przyciskow w kartach pakietow = 11 przyciskow
- **Biznes:** 2 przyciski w hero + 1 na koncu = 3 przyciski

---

## Czesc 1: Redukcja przyciskow

### 1.1 Strona glowna (Index)

**Hero - pozostawiam:**
- "Sprawdz dostepnosc" - glowne CTA (zostawic)
- "Zobacz oferte" - drugie CTA (zostawic)

**RouterOptions - zmiana:**
- Usunac 3 przyciski "Wybierz opcje" z kart routerow (brak konkretnego dzialania)
- Dodac JEDEN wspolny przycisk kontaktowy pod wszystkimi kartami

### 1.2 Strona Internet

**Hero:**
- Zostaw tylko 1 glowny przycisk telefoniczny (Biuro: 505 051 376)
- Drugi numer (Dzial techniczny) zamienic na tekst/link bez stylu przycisku

**Pakiety internetowe:**
- Usunac 3 przyciski "Zadzwon i zamow" z kart
- Dodac 1 wspolny przycisk kontaktowy pod wszystkimi pakietami

### 1.3 Strona Telewizja

**Hero:**
- Jeden glowny przycisk (Biuro), drugi numer jako link tekstowy

**TV Smart sekcja:**
- Zostawic tylko 1 przycisk "Wiecej informacji" (link zewnetrzny do JAMBOX)
- Usunac "Zamow teraz" (redundantny)

**Pakiety TV:**
- Usunac 3 przyciski z kart pakietow
- Jeden wspolny CTA pod sekcja

**Pod pakietami tematycznymi/premium:**
- Usunac przycisk "Zamow pakiet dodatkowy"

**Multiroom:**
- Zostawic przycisk "Zamow Multiroom"

**Smart TV na dole:**
- Usunac "Zapytaj o szczegoly" (informacje juz sa widoczne)

### 1.4 Strona Internet+TV

**Hero:**
- Jeden przycisk (Biuro), drugi jako link tekstowy

**Pakiety bundlowe (9 kart x 3 kategorie):**
- Usunac wszystkie przyciski z kart
- Dodac 1 wspolny CTA na samym dole strony

### 1.5 Strona Biznes

**Hero:**
- Jeden przycisk, drugi jako link tekstowy

**CTA na koncu:**
- Zostawic (jedyny pozostaly)

---

## Czesc 2: Cookie Banner

### 2.1 Nowy komponent: CookieConsent

Utworze nowy komponent wyswietlajacy baner cookies na dole strony:
- Informacja o uzywaniu plikow cookies
- Przycisk "Akceptuje"
- Link do polityki prywatnosci
- Zapisanie zgody w localStorage

### 2.2 Wyglad

- Pozycja: fixed na dole ekranu
- Tlo: bg-card z cieniem
- Responsywny - zawijanie na mobile
- Animacja pojawienia sie

### 2.3 Integracja

Dodam komponent do glownego layoutu (App.tsx) tak aby byl widoczny na wszystkich stronach.

---

## Podsumowanie zmian

| Strona | Przed | Po |
|--------|-------|-----|
| Index (Hero) | 2 | 2 |
| Index (Routery) | 3 | 1 |
| Internet | 5 | 2 |
| Telewizja | 9 | 3 |
| Internet+TV | 11 | 2 |
| Biznes | 3 | 2 |
| **RAZEM** | **33** | **12** |

---

## Szczegoly techniczne

### Pliki do modyfikacji:
1. `src/components/RouterOptions.tsx` - usunac przyciski z kart, dodac jeden wspolny
2. `src/pages/Internet.tsx` - redukcja przyciskow w hero i pakietach
3. `src/pages/Television.tsx` - usuniecie redundantnych przyciskow
4. `src/pages/InternetTV.tsx` - usuniecie przyciskow z kart, jeden wspolny CTA
5. `src/pages/Business.tsx` - zmiana drugiego numeru na link tekstowy

### Nowe pliki:
1. `src/components/CookieConsent.tsx` - baner cookies

### Plik do aktualizacji dla cookies:
1. `src/App.tsx` - dodanie komponentu CookieConsent
