import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Polityka prywatności
            </h1>

            <section className="mb-10 space-y-6 text-muted-foreground">
              <p>
                Administratorem danych osobowych jest <strong className="text-foreground">RAWI-NET SP z o.o.</strong> z siedzibą 
                w Rawiczu, ul Mikołajewicza 8b/1, <a href="mailto:rodo@rawinet.pl" className="text-primary hover:underline">rodo@rawinet.pl</a>
              </p>

              <p>
                Administrator wyznaczył Inspektora Ochrony Danych, z którym można się skontaktować w sprawach 
                związanych z ochroną danych osobowych pod adresem e-mail:{" "}
                <a href="mailto:rodo@rawinet.pl" className="text-primary hover:underline">rodo@rawinet.pl</a>{" "}
                lub pisemnie na adres siedziby Administratora.
              </p>

              <p>
                Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo 
                przetwarzanych danych osobowych adekwatne do zidentyfikowanych zagrożeń oraz kategorii danych 
                objętych ochroną, tak aby Twoje dane osobowe były zabezpieczone przed nieuprawnionym dostępem, 
                ujawnieniem, utratą lub zniszczeniem.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Cele przetwarzania danych osobowych
              </h2>
              <p className="text-muted-foreground mb-4">
                Dane osobowe przetwarzane są w celu:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                <li>
                  wykonania umowy lub podjęcia działań przez jej zawarciem w związku z art. 6 ust. 1 lit. b RODO
                </li>
                <li>
                  obsługi formularza kontaktowego oraz dochodzenia i obrony ew. roszczeń – w związku z art. 6 ust. 1 lit. f RODO
                </li>
                <li>
                  przesyłania informacji marketingowych w związku na podstawie wyrażonej zgody – w związku z art. 6 ust. 1 lit. a RODO
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Okres przetwarzania danych
              </h2>
              <p className="text-muted-foreground">
                Dane osobowe będą przetwarzane nie dłużej, niż jest to konieczne do zrealizowania powyższych 
                celów (czas trwania umowy/obowiązywania zgody) a po tym czasie mogą być przetwarzane przez 
                okres przedawnienia ewentualnych roszczeń przez okres przewidziany przepisami prawa.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Podanie danych
              </h2>
              <p className="text-muted-foreground">
                Podanie danych jest dobrowolne, ale niezbędne, by nawiązać kontakt.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Prawa osoby, której dane dotyczą
              </h2>
              <p className="text-muted-foreground mb-4">
                Osoba, której dane dotyczą ma prawo żądać:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                <li>
                  dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania a także 
                  do wniesienia sprzeciwu wobec przetwarzania danych, w tym na marketing usług własnych 
                  Administratora oraz do przenoszenia danych.
                </li>
                <li>
                  cofnięcia wyrażonej zgody na przetwarzanie danych w każdym czasie, a także do wniesienia 
                  skargi w związku z przetwarzaniem danych do organu nadzorczego – Prezesa Urzędu Ochrony 
                  Danych Osobowych.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Pliki cookies
              </h2>
              <p className="text-muted-foreground">
                Pliki cookie niezbędne do funkcjonowania strony możemy przechowywać na Twoim urządzeniu 
                bez Twojej zgody na podstawie art. 399 ustawy Prawo komunikacji elektronicznej. Na wszystkie 
                inne rodzaje plików cookie potrzebujemy Twojego zezwolenia zgodnie z art. 6 ust. 1 lit. a RODO 
                (zgoda użytkownika).
              </p>
            </section>

            <section className="mb-10">
              <p className="text-muted-foreground">
                Polityka prywatności będzie aktualizowana w związku ze zmianami w przepisach prawach lub 
                funkcjonalności witryny. O wszelkich istotnych zmianach poinformujemy na naszej stronie internetowej.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
