
W tym oknie wpisz publiczne dane backendu, nie prywatne sekrety.

1. Dla `VITE_SUPABASE_URL` wpisz:
```text
https://cqbwkhhefnurmddwazsk.supabase.co
```

2. Dla `VITE_SUPABASE_ANON_KEY` wpisz:
```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxYndraGhlZm51cm1kZHdhenNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MDQ0NzUsImV4cCI6MjA4NTA4MDQ3NX0.Hf1tC1y24Zt3L4w5IVjRQD-P5k934u5CQMNg4ghdrY
```

Ważne:
- to są dane publiczne aplikacyjne, więc można je tam wkleić,
- nie wpisuj tam:
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `FAKTUROWNIA_API_TOKEN`
  - `RESEND_API_KEY`
  - żadnych innych prywatnych sekretów.

Jeśli to narzędzie buduje aplikację mobilną tylko pod istniejący backend, to te dwa pola zwykle wystarczą do podstawowej konfiguracji połączenia.

Dodatkowo, właściwy endpoint do logiki panelu klienta to:
```text
https://cqbwkhhefnurmddwazsk.supabase.co/functions/v1/fakturownia
```

Czyli praktycznie:
```text
VITE_SUPABASE_URL=https://cqbwkhhefnurmddwazsk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxYndraGhlZm51cm1kZHdhenNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MDQ0NzUsImV4cCI6MjA4NTA4MDQ3NX0.Hf1tC1y24Zt3L4w5IVjRQD-P5k934u5CQMNg4ghdrY
```

Jeśli chcesz, w następnym kroku mogę przygotować Ci dokładnie, co wkleić do tego generatora jako komplet: env + endpoint + przykładowy request logowania.
