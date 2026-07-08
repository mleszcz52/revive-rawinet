Zmiana ceny routera Wi-Fi 7 w `src/components/RouterOptions.tsx`:

1. W obiekcie `Router Wi-Fi 7` (linia ~88) zmienić `price: "177 zł"` → `price: "200 zł"`.

2. Dodać nowe opcjonalne pole `priceNote?: string` w interfejsie `RouterOption`, a w danych routera Wi-Fi 7:
   ```text
   priceNote: "Cena zmieniła się z uwagi na wzrost cen na rynku komponentów."
   ```

3. W komponencie `PriceLabel` (lub bezpośrednio przy renderowaniu karty pod ceną) dodać mały odnośnik/tooltip:
   - Ikona `Info` (lucide-react) obok ceny
   - Po najechaniu (Tooltip z shadcn) pokazuje treść `priceNote`
   - Pod ceną dodatkowo mały szary tekst `text-xs text-muted-foreground italic`: "Cena zaktualizowana — wzrost cen komponentów" (skrócona forma widoczna zawsze)

Efekt: cena "200 zł" z ikoną info obok, a pod spodem drobna adnotacja wyjaśniająca powód zmiany. Zmiana dotyczy tylko karty "Router Wi-Fi 7".