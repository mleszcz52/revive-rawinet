import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const DataProtection = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
            Ochrona danych osobowych
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Obowiązek informacyjny wobec abonentów i ich pełnomocników
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              W związku z wprowadzeniem do stosowania przepisów obowiązujące w firmie RAWI-NET sp z o.o. wynikające z Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 roku w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (dalej: RODO), informujemy:
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Kto przetwarza Twoje dane?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Administratorem Państwa Danych jest RAWI-NET sp z o.o.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              W celu szczegółowych informacji o przetwarzaniu przez nas Twoich danych osobowych skieruj zapytanie do wyznaczonego przez nas Inspektora Ochrony Danych Osobowych tj. adres e-mail:{" "}
              <a href="mailto:rodo@rawinet.pl" className="text-primary hover:underline">
                rodo@rawinet.pl
              </a>{" "}
              lub adres pocztowy:
            </p>
            <address className="text-muted-foreground not-italic leading-relaxed bg-muted/50 rounded-lg p-4">
              RAWI-NET sp z o.o.<br />
              63-900 Rawicz, ul. Mikołajewicza 8b/1
            </address>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Jakie dane przetwarzamy?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Imię, nazwisko, adres, adres e-mail, numer telefonu, numer IP, numer PESEL, nr i seria dokumentu tożsamości, numer NIP.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Kiedy możemy przetwarzać Twoje dane?
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>wyrazisz zgodę – na podstawie art.6 ust.1 lit.a) RODO lub art.9 ust.2 lit.a) RODO</li>
              <li>jest to niezbędne do wykonania umowy lub do podjęcia działań na Twoje żądanie przed zawarciem umowy – art.6 ust.1 lit.b) RODO</li>
              <li>jest to niezbędne do wypełnienia obowiązku prawnego ciążącego na RAWI-NET sp z o.o. – art.6 ust.1 lit.c) RODO</li>
              <li>jest to niezbędne do celów wynikających z prawnie uzasadnionych interesów realizowanych przez RAWI-NET sp z o.o. lub przez stronę trzecią – art.6 ust.1 lit.f) RODO</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Zgodnie z ustawą z dnia 16.07.2004 r. Prawo telekomunikacyjne, Klient ma obowiązek podania imienia, nazwiska, PESEL lub nazwy, serii i numeru dokumentu potwierdzającego tożsamość.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Podanie w/w danych jest warunkiem zawarcia umowy. Odmowa podania danych Abonenta uniemożliwia zawarcie umowy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Od kogo otrzymaliśmy Twoje dane?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Twoje dane pozyskaliśmy od Ciebie.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Jeśli jesteś pełnomocnikiem, Twoje dane otrzymaliśmy od Twojego mocodawcy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Kim mogą być odbiorcy Twoich danych?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Administrator przewiduje możliwość udostępnienia Twoich danych osobowych następującym kategoriom odbiorców (jeśli będziemy mieć ku temu podstawę prawną):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>upoważnionym pracownikom lub współpracownikom administratora świadczącym usługi na podstawie umów cywilnoprawnych</li>
              <li>Organom Państwowym tj. Policji, Prokuraturze, Sądowi, Komornikom, Generalnemu Inspektorowi Ochrony Danych Osobowych, Prezesowi Urzędu Komunikacji Elektronicznej, itp.</li>
              <li>podmiotom świadczącym usługi pocztowe i kurierskie</li>
              <li>kancelariom prawnym świadczące usługi prawne</li>
              <li>podmiotom świadczącym usługi wsparcia informatycznego</li>
              <li>podmiotom świadczące usługi sprzedażowe</li>
              <li>podmiotom świadczące usługi windykacyjne</li>
              <li>biurom informacji gospodarczej</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Dane osobowe nie będą przekazywane do państw (lub organizacji) poza Europejski Obszar Gospodarczy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Jak długo możemy przechowywać Twoje dane?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Konieczne jest przechowywanie danych przez cały okres realizacji umowy o świadczenie usług telekomunikacyjnych.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Działania marketingowe – do odwołania zgody lub wniesienia sprzeciwu.</li>
              <li>Dane księgowe, faktury, rachunki, rozliczenia – 5 lat od zakończenia okresu podatkowego.</li>
              <li>Ustalenie, obrona, dochodzenie roszczeń – do 3 lat.</li>
              <li>Archiwizacja dokumentów – 3 lat.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Twoje prawa wynikające z RODO
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Gwarancja spełnienia przez RAWI-NET sp. z o.o. wszystkich Twoich praw wynikających z rozporządzenia o ochronie danych:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Prawo cofnięcia zgody</strong> – prawo cofnięcia zgody na przetwarzanie danych osobowych w dowolnym momencie.
              </li>
              <li>
                <strong className="text-foreground">Prawo dostępu (art. 15 RODO)</strong> – możesz sprawdzić jakie Twoje dane są przetwarzane.
              </li>
              <li>
                <strong className="text-foreground">Prawo sprostowania (art. 16 RODO)</strong> – jeśli Twoje dane ulegną zmianie, masz prawo je zaktualizować, jeśli Twoje dane są niekompletne i nieprawidłowe, masz prawo do ich sprostowania.
              </li>
              <li>
                <strong className="text-foreground">Prawo usunięcia (art. 17 RODO)</strong> – masz prawo do bycia zapomnianym, pamiętaj jednak, że wykonywanie umowy nie będzie możliwe bez Twojej zgody. Nie będziemy mogli o Tobie zapomnieć jeśli będzie od nas wymagać tego prawo bądź nasz uzasadniony interes (ochrona przed roszczeniami).
              </li>
              <li>
                <strong className="text-foreground">Prawo ograniczenia przetwarzania (art. 18 RODO)</strong> – jeśli uważasz że Twoje dane nie są nam potrzebne do realizacji umowy ale RAWI-NET sp z o.o. potrzebuje ich dla celów windykacyjnych itp. Możemy ograniczyć przetwarzanie Twoich danych jeśli wniesiesz sprzeciw lub wniosek o ich usunięcie do czasu ustalenia przez RAWI-NET sp z o.o. czy Twoje żądanie jest uzasadnione.
              </li>
              <li>
                <strong className="text-foreground">Prawo sprzeciwu (art. 21 RODO)</strong> – masz prawo wnieść sprzeciw przetwarzania Twoich danych osobowych z przyczyn związanych z Twoją szczególną sytuacją jeżeli przetwarzanie odbywa się na podstawie naszego prawnie uzasadnionego interesu. Wówczas nie będziemy przetwarzać tych danych osobowych chyba że wykażemy istnienie ważnych prawnie uzasadnionych podstaw do przetwarzania tych danych nadrzędnych wobec Twoich interesów praw i wolności lub podstaw do ustalenia, dochodzenia lub obrony roszczeń.
              </li>
              <li>
                <strong className="text-foreground">Prawo przenoszenia danych (art. 20 RODO)</strong> – w Twoim imieniu przeniesiemy przetwarzane dane do innego Administratora.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Cofnięcie zgody na przetwarzanie danych osobowych może odbyć się w dowolnym momencie, co nie będzie miało jednak wpływu na zgodność z prawem przetwarzania Twoich danych na podstawie zgody przed jej cofnięciem.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Skarga do organu nadzorczego
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Masz możliwość wniesienia skargi w związku z nieprawidłowym przetwarzaniem przez RAWI-NET sp z o.o. do organu nadzorczego jakim jest Prezes Urzędu Ochrony Danych Osobowych z siedzibą: ul. Stawki 2, 00-193 Warszawa, tel. 22 531-03-00, email:{" "}
              <a href="mailto:kancelaria@uodo.gov.pl" className="text-primary hover:underline">
                kancelaria@uodo.gov.pl
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataProtection;
