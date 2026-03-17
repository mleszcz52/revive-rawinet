
Cel: przygotować bezpieczny pakiet integracyjny dla aplikacji mobilnej panelu klienta. Najlepsza architektura to nie łączyć aplikacji mobilnej bezpośrednio z bazą, tylko z istniejącym backendem. Baza i prywatne klucze zostają po stronie backendu.

1. Rekomendowany model integracji
- Aplikacja mobilna ma wywoływać tylko endpoint backendu:
  - `https://cqbwkhhefnurmddwazsk.supabase.co/functions/v1/fakturownia`
- Nie podłączać aplikacji mobilnej bezpośrednio do tabel bazy.
- Nie osadzać w aplikacji mobilnej prywatnych sekretów.

2. Dane, które możesz przekazać zespołowi mobile
```json
{
  "app": {
    "name": "RAWI-NET Panel Klienta",
    "sessionTimeoutMinutes": 30,
    "rememberDevice": true,
    "otpLength": 6,
    "otpExpiryMinutes": 10,
    "maxLoginAttempts": 5,
    "lockoutMinutes": 15
  },
  "backend": {
    "mode": "existing_backend",
    "functionEndpoint": "https://cqbwkhhefnurmddwazsk.supabase.co/functions/v1/fakturownia",
    "authModel": "custom_backend_auth",
    "notes": [
      "App should call backend function only",
      "Do not connect directly to database tables from mobile client",
      "Do not store private API keys in the mobile app"
    ]
  },
  "publicConfig": {
    "projectId": "cqbwkhhefnurmddwazsk",
    "publishableKey": "available_in_current_project_but_not_required_if_app_calls_backend_only",
    "backendUrl": "available_in_current_project_but_not_required_if_app_calls_backend_only"
  }
}
```

3. Prywatne sekrety backendowe
Tych wartości nie należy wklejać do aplikacji mobilnej. Są potrzebne tylko wtedy, jeśli ktoś będzie stawiał osobną kopię backendu:
- `FAKTUROWNIA_API_TOKEN`
- `FAKTUROWNIA_DOMAIN`
- `RESEND_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Wewnętrzna zasada przekazania:
- sekretów nie wysyłać w repo ani w promptach do generatora aplikacji,
- przekazać je osobno w menedżerze sekretów / panelu CI / bezpiecznym vault.

4. Struktura bazy używana przez logowanie klienta
Aplikacja mobilna nie powinna pisać do tych tabel bezpośrednio, ale zespół mobile powinien znać model danych:

`client_credentials`
- `id: uuid`
- `email: text`
- `password_hash: text`
- `client_name: text | null`
- `must_change_password: boolean`
- `temp_password: text | null`
- `failed_attempts: integer`
- `locked_until: timestamptz | null`
- `last_login: timestamptz | null`
- `created_at: timestamptz`
- `updated_at: timestamptz`

`client_otp_codes`
- `id: uuid`
- `client_email: text`
- `code: text`
- `device_fingerprint: text | null`
- `attempts: integer`
- `used: boolean`
- `expires_at: timestamptz`
- `created_at: timestamptz`

`client_devices`
- `id: uuid`
- `client_email: text`
- `device_fingerprint: text`
- `device_name: text | null`
- `is_trusted: boolean`
- `first_seen_at: timestamptz`
- `last_seen_at: timestamptz`

`login_attempts`
- `id: uuid`
- `email: text`
- `success: boolean`
- `ip_address: text | null`
- `user_agent: text | null`
- `attempted_at: timestamptz`

5. Kontrakt API dla aplikacji mobilnej
Wszystkie requesty: `POST` na endpoint funkcji, body JSON.

Logowanie:
- `verifyPassword`
```json
{ "action": "verifyPassword", "email": "user@example.com", "password": "Haslo123!", "deviceFingerprint": "device-id", "ipAddress": "optional" }
```

Możliwe odpowiedzi:
- sukces:
```json
{ "valid": true, "mustChangePassword": false, "clientName": "Jan Kowalski", "sessionToken": "token", "expiresAt": "ISO_DATE" }
```
- pierwsze logowanie:
```json
{ "valid": false, "firstLogin": true, "emailSent": true, "message": "..." }
```
- nowe urządzenie:
```json
{ "valid": false, "requiresOtp": true, "emailSent": true, "message": "..." }
```
- blokada:
```json
{ "valid": false, "locked": true, "lockedUntil": "ISO_DATE", "message": "..." }
```

OTP:
- `verifyOtp`
```json
{ "action": "verifyOtp", "email": "user@example.com", "otpCode": "123456", "deviceFingerprint": "device-id", "deviceName": "Android/iPhone model", "trustDevice": true }
```

Ponowne wysłanie OTP:
- `resendOtp`
```json
{ "action": "resendOtp", "email": "user@example.com", "deviceFingerprint": "device-id" }
```

Reset hasła:
- `resetPassword`
```json
{ "action": "resetPassword", "email": "user@example.com" }
```

Zmiana hasła:
- `changePassword`
```json
{ "action": "changePassword", "email": "user@example.com", "password": "StareLubTymczasowe123!", "newPassword": "NoweHaslo123!", "deviceFingerprint": "device-id", "deviceName": "Android/iPhone model" }
```

Dane klienta:
- `getClientByEmail`
```json
{ "action": "getClientByEmail", "email": "user@example.com" }
```

Faktury:
- `getClientInvoices`
```json
{ "action": "getClientInvoices", "clientId": 12345 }
```
Uwaga: backend zwraca tylko faktury od roku 2026 wzwyż.

Płatności:
- `getClientPayments`
```json
{ "action": "getClientPayments", "clientId": 12345 }
```

PDF faktury:
- `getInvoicePdf`
```json
{ "action": "getInvoicePdf", "invoiceId": 98765 }
```

6. Wymagania bezpieczeństwa dla aplikacji mobilnej
- Nie przechowywać prywatnych kluczy API w aplikacji.
- Sesję przechowywać w bezpiecznym storage po stronie urządzenia.
- Wymuszać wylogowanie po `expiresAt` lub po 30 minutach.
- Fingerprint urządzenia zapisywać lokalnie i używać przy logowaniu/OTP.
- Hasła nie mogą być logowane.
- OTP i hasła tymczasowe nigdy nie mogą być cache’owane ani pokazywane w logach debug.

7. Co przekazać AI Studio / zespołowi mobile jako minimum
- endpoint backendu,
- listę akcji API,
- przykładowe payloady i odpowiedzi,
- model sesji,
- zasady OTP i trusted device,
- informację, że baza i sekrety są po stronie backendu.

8. Najważniejsze doprecyzowanie
Jeśli chcesz uruchamiać aplikację mobilną na obecnym backendzie, nie musisz przekazywać wartości prywatnych kluczy API do aplikacji mobilnej. Wystarczy endpoint i kontrakt API. Prywatne sekrety są potrzebne tylko przy stawianiu nowej, osobnej kopii backendu.

Jeśli chcesz, następny krok powinien być taki:
przygotuję Ci gotowy plik `config.json` dla zespołu mobile z pełnym kontraktem request/response dla wszystkich akcji.
