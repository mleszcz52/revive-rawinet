
# Plan: System uwierzytelniania klientów z najwyższymi standardami bezpieczeństwa

## Podsumowanie

Wdrażamy system haseł dla klientów z automatycznym generowaniem i obowiązkową zmianą przy pierwszym logowaniu. System będzie spełniał najwyższe standardy bezpieczeństwa dla danych wrażliwych.

---

## Zabezpieczenia

### 1. Bezpieczne przechowywanie haseł
- Hasła hashowane algorytmem **bcrypt** z kosztem 12 (standard bankowy)
- Hasła nigdy nie są przechowywane jako tekst jawny
- Nawet w przypadku wycieku bazy danych, odzyskanie haseł jest praktycznie niemożliwe

### 2. Ochrona bazy danych
- Tabela `client_credentials` z włączonym **Row Level Security (RLS)**
- **Brak polityk RLS** = tabela niedostępna bezpośrednio z frontend
- Dostęp tylko przez Edge Function z kluczem service role

### 3. Ochrona przed atakami brute-force
- **Maksymalnie 5 prób logowania** na 15 minut
- Po przekroczeniu limitu - blokada na 15 minut
- Tabela `login_attempts` śledzi próby logowania

### 4. Bezpieczna sesja
- Sesja przechowywana w **sessionStorage** (nie localStorage)
- Automatyczne wylogowanie po zamknięciu przeglądarki
- Token sesji z ograniczonym czasem ważności (4 godziny)

### 5. Walidacja haseł
- Minimum **8 znaków**
- Co najmniej **1 wielka litera**
- Co najmniej **1 cyfra**
- Co najmniej **1 znak specjalny**

### 6. Brak logowania wrażliwych danych
- Hasła nigdy nie są zapisywane w logach
- Tylko informacja o sukcesie/porażce logowania

---

## Zmiany techniczne

### 1. Baza danych - tabele

**Tabela `client_credentials`:**
```sql
CREATE TABLE public.client_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    client_name TEXT,
    must_change_password BOOLEAN DEFAULT true,
    failed_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.client_credentials ENABLE ROW LEVEL SECURITY;
-- Brak polityk = dostęp tylko przez service role
```

**Tabela `login_attempts` (audit log):**
```sql
CREATE TABLE public.login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    ip_address TEXT,
    attempted_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;
```

### 2. Edge Function - nowe akcje

**Weryfikacja hasła z ochroną brute-force:**
- Sprawdza czy konto nie jest zablokowane
- Weryfikuje hasło z hashem bcrypt
- Zlicza nieudane próby
- Blokuje konto po 5 nieudanych próbach
- Loguje próbę (sukces/porażka)

**Zmiana hasła:**
- Wymaga podania starego hasła
- Waliduje złożoność nowego hasła
- Hashuje nowe hasło bcrypt
- Ustawia `must_change_password = false`

**Ustawienie hasła (admin):**
- Generuje bezpieczne losowe hasło
- Hashuje i zapisuje
- Ustawia `must_change_password = true`
- Zwraca wygenerowane hasło (do przekazania klientowi)

### 3. Frontend - bezpieczny formularz

**Logowanie:**
- Pola email + hasło (typ password)
- Wyświetlanie pozostałych prób przed blokadą
- Informacja o blokadzie konta

**Po zalogowaniu z `must_change_password = true`:**
- Obowiązkowy formularz zmiany hasła
- Klient NIE może korzystać z panelu bez zmiany hasła
- Walidacja złożoności nowego hasła w czasie rzeczywistym

**Sesja:**
- Token sesji w sessionStorage
- Automatyczne wylogowanie po 4 godzinach

---

## Przepływ logowania

```text
Klient wpisuje email + hasło
            |
            v
+---------------------------+
| Sprawdź czy konto         |
| nie jest zablokowane      |
+---------------------------+
            |
    +-------+-------+
    |               |
    v               v
Zablokowane     Odblokowane
    |               |
    v               v
Pokaż czas      Weryfikuj hasło
blokady         (bcrypt.compare)
                    |
            +-------+-------+
            |               |
            v               v
        Niepoprawne     Poprawne
            |               |
            v               v
    Zwiększ licznik     Resetuj licznik
    nieudanych prób     Sprawdź must_change
            |               |
            v               +-------+-------+
    Po 5 próbach:       |               |
    zablokuj na 15 min  v               v
                    Wymaga zmiany   Normalny dostęp
                        |               |
                        v               v
                    Formularz       Panel klienta
                    zmiany hasła
```

---

## Format generowanego hasła

Automatyczne hasło: `Rawi` + losowe 8 znaków (wielkie, małe litery, cyfry, znaki specjalne)

Przykłady:
- `RawiKm7#pQ2x`
- `RawiBn4@sL9k`
- `RawiXz8!mW3q`

---

## Kolejność implementacji

1. Utworzenie tabel `client_credentials` i `login_attempts`
2. Aktualizacja Edge Function o akcje bezpieczeństwa
3. Modyfikacja formularza logowania z obsługą blokad
4. Formularz obowiązkowej zmiany hasła
5. Zarządzanie sesją w sessionStorage
6. Testowanie scenariuszy bezpieczeństwa

---

## Po wdrożeniu

Będziesz musiał:
1. Wygenerować hasła dla klientów (przez panel admina lub bezpośrednio w bazie)
2. Przekazać hasła klientom (telefonicznie dla bezpieczeństwa)
3. Klienci przy pierwszym logowaniu będą musieli zmienić hasło

---

## Czy chcesz również panel administracyjny?

Mogę dodać stronę `/admin` do zarządzania kontami klientów:
- Lista klientów z ich statusem (aktywny/zablokowany)
- Generowanie nowych haseł
- Resetowanie blokad
- Przeglądanie historii logowań
