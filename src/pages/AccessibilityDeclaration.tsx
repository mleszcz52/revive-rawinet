import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const AccessibilityDeclaration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Deklaracja dostępności
          </h1>
          <p className="text-muted-foreground mb-10">
            Rawi-Net Sp. z o.o. zobowiązuje się zapewnić dostępność swojej strony internetowej zgodnie z ustawą z dnia 26 kwietnia 2024 r. o zapewnianiu spełniania wymagań dostępności niektórych produktów i usług przez podmioty gospodarcze (Dz.U. 2024 poz. 731).
          </p>

          <div className="space-y-10 text-foreground/90">
            {/* Status */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                Status pod względem zgodności
              </h2>
              <p className="text-muted-foreground">
                Strona internetowa <strong>rawinet.pl</strong> jest <span className="text-primary font-medium">[częściowo zgodna / w pełni zgodna / niezgodna]</span> z ustawą o dostępności cyfrowej ze względu na niezgodności lub wyłączenia wymienione poniżej.
              </p>
            </section>

            {/* Treści niedostępne */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                Treści niedostępne
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — lista treści niedostępnych, np. brak opisów alternatywnych dla niektórych obrazów]</span></li>
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — powód niedostępności]</span></li>
              </ul>
            </section>

            {/* Przygotowanie deklaracji */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                Przygotowanie deklaracji
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Deklarację sporządzono dnia:</strong> <span className="text-primary font-medium">[DATA DO UZUPEŁNIENIA]</span></li>
                <li><strong>Deklarację ostatnio aktualizowano:</strong> <span className="text-primary font-medium">[DATA DO UZUPEŁNIENIA]</span></li>
                <li><strong>Deklarację sporządzono na podstawie:</strong> samooceny przeprowadzonej przez Rawi-Net Sp. z o.o.</li>
              </ul>
            </section>

            {/* Skróty klawiaturowe */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                Skróty klawiaturowe
              </h2>
              <p className="text-muted-foreground">
                Na stronie internetowej można używać standardowych skrótów klawiaturowych przeglądarki. Strona nie posiada dodatkowych, niestandardowych skrótów klawiaturowych.
              </p>
            </section>

            {/* Informacje zwrotne i dane kontaktowe */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                Informacje zwrotne i dane kontaktowe
              </h2>
              <p className="text-muted-foreground mb-4">
                W przypadku problemów z dostępnością strony internetowej prosimy o kontakt:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>E-mail:</strong> <a href="mailto:biuro@rawinet.pl" className="text-primary hover:underline">biuro@rawinet.pl</a></li>
                <li><strong>Telefon:</strong> <a href="tel:+48505051376" className="text-primary hover:underline">505 051 376</a></li>
                <li><strong>Adres:</strong> ul. Mikołajewicza 8B/1, 63-900 Rawicz</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Tą samą drogą można składać wnioski o udostępnienie informacji niedostępnej oraz składać skargi na brak zapewnienia dostępności.
              </p>
            </section>

            {/* Procedura odwoławcza */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                Procedura odwoławcza
              </h2>
              <p className="text-muted-foreground mb-4">
                Każdy ma prawo do wystąpienia z żądaniem zapewnienia dostępności cyfrowej strony internetowej lub jej elementu. Można także zażądać udostępnienia informacji za pomocą alternatywnego sposobu dostępu.
              </p>
              <p className="text-muted-foreground mb-4">
                Żądanie powinno zawierać dane osoby zgłaszającej, wskazanie strony lub elementu, którego dotyczy żądanie, oraz sposób kontaktu. Podmiot powinien zrealizować żądanie niezwłocznie, nie później niż w ciągu 7 dni roboczych. Jeżeli dotrzymanie tego terminu nie jest możliwe, niezwłocznie informuje o tym wnoszącego żądanie i wskazuje termin realizacji, nie dłuższy niż 2 miesiące.
              </p>
              <p className="text-muted-foreground">
                W przypadku odmowy, skargi można kierować do <strong>Prezesa Zarządu PFRON</strong> (Państwowy Fundusz Rehabilitacji Osób Niepełnosprawnych).
              </p>
            </section>

            {/* Dostępność architektoniczna */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                Dostępność architektoniczna
              </h2>
              <p className="text-muted-foreground mb-2">
                <strong>Siedziba:</strong> Rawi-Net Sp. z o.o., ul. Mikołajewicza 8B/1, 63-900 Rawicz
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — opis dostępności budynku, np. podjazd dla wózków, winda, dostępne toalety, parking]</span></li>
              </ul>
            </section>

            {/* Info box */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-12">
              <p className="text-sm text-foreground font-semibold mb-2">⚠️ Uwaga</p>
              <p className="text-sm text-muted-foreground">
                Niniejsza deklaracja stanowi szablon. Wszystkie miejsca oznaczone jako <span className="text-primary font-medium">[DO UZUPEŁNIENIA]</span> powinny zostać uzupełnione o dane faktyczne. Deklaracja powinna być aktualizowana co najmniej raz w roku.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccessibilityDeclaration;
