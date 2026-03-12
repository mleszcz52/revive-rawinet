import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Polityka Plików Cookies
              </h1>
              <p className="text-muted-foreground mb-8">
                Ostatnia aktualizacja: 12 marca 2026 r.
              </p>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  1. Czym są pliki cookies?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Pliki cookies (ciasteczka) to niewielkie pliki tekstowe zapisywane na urządzeniu użytkownika 
                  (komputerze, telefonie, tablecie) podczas korzystania ze strony internetowej. Służą do 
                  zapamiętywania preferencji użytkownika, utrzymywania sesji logowania oraz zapewnienia 
                  prawidłowego działania serwisu.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  2. Administrator danych
                </h2>
                <p className="text-muted-foreground mb-4">
                  Administratorem danych jest <strong>Rawi-Net Sp. z o.o.</strong>, ul. Mikołajewicza 8B/1, 
                  63-900 Rawicz. Kontakt: <a href="mailto:biuro@rawinet.pl" className="text-primary hover:underline">biuro@rawinet.pl</a>, 
                  tel. <a href="tel:505051376" className="text-primary hover:underline">505 051 376</a>.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  3. Rodzaje wykorzystywanych cookies
                </h2>
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Cookies niezbędne (sesyjne)
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Są konieczne do prawidłowego działania serwisu. Obejmują:
                    </p>
                    <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                      <li><strong>Sesja logowania</strong> — przechowywana w <code className="bg-muted px-1.5 py-0.5 rounded text-sm">sessionStorage</code>, 
                        wygasa po zamknięciu przeglądarki (max. 4 godziny)</li>
                      <li><strong>Identyfikator urządzenia</strong> — przechowywany w <code className="bg-muted px-1.5 py-0.5 rounded text-sm">localStorage</code>, 
                        służy do rozpoznawania zaufanych urządzeń w ramach weryfikacji dwuetapowej (2FA)</li>
                      <li><strong>Zgoda na cookies</strong> — przechowywana w <code className="bg-muted px-1.5 py-0.5 rounded text-sm">localStorage</code>, 
                        zapamiętuje decyzję użytkownika o akceptacji plików cookies</li>
                    </ul>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Cookies funkcjonalne
                    </h3>
                    <p className="text-muted-foreground">
                      Pozwalają zapamiętać preferencje użytkownika (np. stan panelu bocznego). 
                      Nie zbierają danych osobowych i nie są udostępniane podmiotom trzecim.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  4. Cele przetwarzania
                </h2>
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  <li>Utrzymanie sesji logowania w Panelu Klienta</li>
                  <li>Weryfikacja tożsamości przy logowaniu z nowych urządzeń (2FA)</li>
                  <li>Zapamiętanie zaufanych urządzeń użytkownika</li>
                  <li>Zapamiętanie zgody na pliki cookies</li>
                  <li>Zapewnienie bezpieczeństwa konta (ochrona przed nieautoryzowanym dostępem)</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  5. Okres przechowywania
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Nazwa</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Typ</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Czas życia</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Sesja logowania</td>
                        <td className="py-3 px-4">sessionStorage</td>
                        <td className="py-3 px-4">Do zamknięcia przeglądarki (max. 4h)</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Identyfikator urządzenia</td>
                        <td className="py-3 px-4">localStorage</td>
                        <td className="py-3 px-4">Bezterminowo (do ręcznego usunięcia)</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Zgoda na cookies</td>
                        <td className="py-3 px-4">localStorage</td>
                        <td className="py-3 px-4">Bezterminowo (do ręcznego usunięcia)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  6. Zarządzanie cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  Użytkownik może w dowolnym momencie zmienić ustawienia dotyczące plików cookies w swojej 
                  przeglądarce internetowej, w tym zablokować lub usunąć pliki cookies. Instrukcje zarządzania 
                  cookies znajdziesz w ustawieniach Twojej przeglądarki.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>Uwaga:</strong> Zablokowanie cookies niezbędnych może uniemożliwić logowanie do 
                  Panelu Klienta oraz korzystanie z weryfikacji dwuetapowej.
                </p>
                <p className="text-muted-foreground">
                  Aby usunąć dane związane z logowaniem, wyczyść dane witryny w ustawieniach przeglądarki 
                  lub użyj trybu prywatnego/incognito.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  7. Cookies podmiotów trzecich
                </h2>
                <p className="text-muted-foreground">
                  Serwis RAWI-NET nie wykorzystuje cookies podmiotów trzecich w celach reklamowych 
                  ani analitycznych. Wszystkie dane przechowywane lokalnie służą wyłącznie prawidłowemu 
                  działaniu serwisu i bezpieczeństwu konta użytkownika.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  8. Podstawa prawna
                </h2>
                <p className="text-muted-foreground">
                  Przetwarzanie danych za pośrednictwem plików cookies odbywa się na podstawie art. 6 ust. 1 
                  lit. f RODO (prawnie uzasadniony interes administratora — zapewnienie bezpieczeństwa i 
                  prawidłowego działania serwisu) oraz art. 6 ust. 1 lit. a RODO (zgoda użytkownika wyrażona 
                  poprzez akceptację baneru cookies).
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  9. Kontakt
                </h2>
                <p className="text-muted-foreground">
                  W sprawach dotyczących plików cookies i ochrony danych osobowych prosimy o kontakt: 
                  e-mail: <a href="mailto:biuro@rawinet.pl" className="text-primary hover:underline">biuro@rawinet.pl</a>, 
                  tel. <a href="tel:505051376" className="text-primary hover:underline">505 051 376</a>.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
