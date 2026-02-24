

## Analiza wymagań prawnych dla strony ISP w Polsce

### Co juz macie
- Polityka prywatności (rozbudowana, zgodna z RODO) -- `/polityka-prywatnosci`
- Baner cookie consent
- Dane firmy w stopce (NIP, REGON, adres, kontakt)
- Link "Regulamin" w stopce -- **ale prowadzi donikąd (`href="#"`)**

### Czego brakuje

Zgodnie z polskim prawem (Prawo komunikacji elektronicznej z 2024 r., RODO, Kodeks cywilny, Europejski Akt o Dostepnosci) na stronie ISP powinny znajdowac sie:

**1. Regulamin swiadczenia uslug telekomunikacyjnych (KRYTYCZNE)**
Wymagany przez Prawo komunikacji elektronicznej (dawniej Prawo telekomunikacyjne). Powinien zawierac:
- Zakres i warunki swiadczenia uslug
- Dane operatora
- Zasady zawierania, zmiany i rozwiazywania umow
- Tryb postepowania reklamacyjnego (terminy, forma, sposob rozpatrzenia)
- Zakres odpowiedzialnosci operatora
- Informacje o minimalnej jakosci uslug (predkosci minimalne/maksymalne/zwykle dostepne)
- Informacje o ograniczeniach w korzystaniu z uslug

**2. Procedura reklamacyjna (KRYTYCZNE)**
Moze byc czescia regulaminu lub oddzielna podstrona. Musi zawierac:
- Sposob skladania reklamacji (formularz, e-mail, pismo)
- Terminy rozpatrzenia (30 dni)
- Informacje o prawie odwolania do UKE / sadu polubownego

**3. Informacja o prawie odstapienia od umowy zawartej na odleglosc**
Jesli umowy sa zawierane online/telefonicznie -- 14-dniowe prawo odstapienia + wzor formularza.

**4. Deklaracja dostepnosci cyfrowej (od 28.06.2025)**
Europejski Akt o Dostepnosci (ustawa z 26.04.2024) wymaga deklaracji dostepnosci na stronie. Dotyczy uslug swiadczonych konsumentom droga elektroniczna.

**5. Wzorzec umowy / OWU (Ogolne Warunki Umowy)**
Dokument publiczny, dostepny przed zawarciem umowy.

### Plan implementacji

Proponuje dodac nastepujace podstrony:

| Strona | Sciezka | Priorytet |
|--------|---------|-----------|
| Regulamin swiadczenia uslug | `/regulamin` | Krytyczny |
| Procedura reklamacyjna | w ramach regulaminu | Krytyczny |
| Prawo odstapienia od umowy | w ramach regulaminu lub osobna | Wysoki |
| Deklaracja dostepnosci | `/deklaracja-dostepnosci` | Wysoki |

**Wazne:** Tresci regulaminu i OWU powinny byc dostarczone przez Ciebie (lub prawnika), bo sa specyficzne dla Waszej dzialalnosci -- nie moge ich wygenerowac, poniewaz musza odpowiadac faktycznym warunkom swiadczenia uslug Rawi-Net.

Moge natomiast:
1. **Stworzyc szablony stron** (`/regulamin`, `/deklaracja-dostepnosci`) z odpowiednia struktura i nawigacja
2. **Naprawic link "Regulamin"** w stopce, zeby prowadzil do wlasciwej podstrony
3. **Dodac brakujace linki** w stopce (deklaracja dostepnosci, procedura reklamacyjna)
4. **Stworzyc szablon deklaracji dostepnosci** zgodny z wymogami ustawy

