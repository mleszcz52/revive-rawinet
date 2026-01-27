

# Plan: Filtrowanie faktur - tylko opłacone i bieżące

## Problem
Faktury-szablony tworzone dla cyklicznych rozliczeń w Fakturownia wyswietlaja sie klientom jako nieoplacone, co jest mylace. Przyklad: faktura 271/10/2025 z terminem 2025-10-15 pokazuje sie jako "Wystawiona" mimo ze byla tylko szablonem.

## Rozwiazanie
Filtrowanie faktur po stronie frontendu, aby pokazywac:
- **Wszystkie faktury oplacone** (status = "paid") - niezaleznie od daty
- **Faktury biezace nieoplacone** - termin platnosci w przyszlosci lub nie starszy niz 60 dni

Stare nieoplacone faktury (jak szablony) zostana automatycznie ukryte.

---

## Zmiany techniczne

### Plik: `src/components/ClientPanel.tsx`

1. **Dodanie funkcji filtrującej faktury:**
```typescript
const filterRelevantInvoices = (allInvoices: Invoice[]) => {
  const today = new Date();
  const cutoffDate = new Date();
  cutoffDate.setDate(today.getDate() - 60); // 60 dni wstecz

  return allInvoices.filter((invoice) => {
    // Zawsze pokazuj oplacone
    if (invoice.status === 'paid') return true;

    // Dla nieoplaconych - sprawdz termin platnosci
    const paymentDate = new Date(invoice.payment_to);
    return paymentDate >= cutoffDate;
  });
};
```

2. **Aktualizacja stanu faktur:**
   - Przechowywanie wszystkich faktur w `allInvoices`
   - Filtrowane faktury w `displayedInvoices` do wyswietlania
   - Saldo liczone z `displayedInvoices` (tylko widoczne faktury)

3. **Dodanie informacji o ukrytych fakturach:**
   - Pokazanie liczby ukrytych historycznych faktur
   - Opcjonalny przycisk "Pokaz wszystkie" dla pelnej przejrzystosci

4. **Aktualizacja interfejsu:**
   - Licznik faktur w zakladce bedzie pokazywal tylko widoczne faktury
   - Saldo "Do zaplaty" bedzie dotyczylo tylko biezacych faktur

---

## Logika biznesowa

```text
+------------------------+
|  Wszystkie faktury     |
|  z Fakturownia API     |
+------------------------+
           |
           v
+------------------------+
|  Filtr:                |
|  - status = "paid" OR  |
|  - payment_to >= -60d  |
+------------------------+
           |
           v
+------------------------+
|  Wyswietlane faktury   |
|  + saldo               |
+------------------------+
```

**Przyklad dla klienta ze screenshota:**
- Faktura 417/01/2026 (Oplacona) - **WIDOCZNA** (status = paid)
- Faktura 271/10/2025 (Wystawiona, termin 2025-10-15) - **UKRYTA** (starsza niz 60 dni i nieoplacona)

**Rezultat:** Klient widzi tylko 1 fakture, saldo = 0 PLN

---

## Korzysci

- Klienci nie widza mylacych starych faktur-szablonow
- Saldo pokazuje rzeczywista kwote do zaplaty
- Rozwiazanie dziala automatycznie bez recznej konfiguracji
- Faktury oplacone sa zawsze widoczne dla historii

