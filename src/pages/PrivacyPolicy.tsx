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
              Polityka Prywatności, Bezpieczeństwa i Plików Cookies Serwisu RAWI-NET
            </h1>
            <p className="text-muted-foreground mb-8">
              <strong>Administrator Danych:</strong> Rawi-Net Sp. z o.o.
            </p>

            {/* Section I */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                I. Preambuła i Tożsamość Administratora
              </h2>
              <p className="text-muted-foreground mb-4">
                Szanując Państwa prawo do prywatności oraz dbając o bezpieczeństwo danych cyfrowych, 
                spółka RAWI-NET Sp. z o.o. wdraża niniejszą Politykę, której celem jest transparentne 
                przedstawienie zasad przetwarzania informacji o Użytkownikach serwisu internetowego 
                oraz Abonentach usług telekomunikacyjnych.
              </p>
              <p className="text-muted-foreground mb-4">
                Administratorem Państwa danych osobowych jest <strong>RAWI-NET Spółka z ograniczoną 
                odpowiedzialnością</strong> z siedzibą w Rawiczu.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Adres rejestrowy i korespondencyjny:</strong> ul. Stanisława Mikołajewicza 8B/1, 63-900 Rawicz.</li>
                <li><strong>Wpis do KRS:</strong> Sąd Rejonowy Poznań - Nowe Miasto i Wilda w Poznaniu, IX Wydział Gospodarczy KRS, pod numerem 0000384649.</li>
                <li><strong>NIP:</strong> 6991947984 | <strong>REGON:</strong> 301729188.</li>
                <li><strong>Dane kontaktowe:</strong> tel. 505 051 376, 605 934 593; e-mail: biuro@rawinet.pl.</li>
              </ul>
            </section>

            {/* Section II */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                II. Cele, Podstawy Prawne i Zakres Przetwarzania Danych
              </h2>
              <p className="text-muted-foreground mb-6">
                Administrator przetwarza dane w ściśle zdefiniowanych celach, wynikających z charakteru 
                świadczonych usług telekomunikacyjnych (Internet, Telewizja) oraz funkcjonalności serwisu internetowego.
              </p>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    1. Zawarcie i Realizacja Umowy Abonenckiej (Świadczenie Usług)
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Jest to główny cel przetwarzania, niezbędny do dostarczenia Państwu usług Internetu 
                    światłowodowego lub Telewizji Cyfrowej.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Zakres danych:</strong> Imię i nazwisko, numer PESEL (niezbędny do weryfikacji 
                    tożsamości na podstawie Prawa telekomunikacyjnego), numer dowodu osobistego, adres zamieszkania, 
                    adres instalacji łącza, numer telefonu, adres e-mail.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy) 
                    oraz Art. 6 ust. 1 lit. c RODO (obowiązki prawne operatora).
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    2. Obsługa Techniczna, Diagnostyka Sieci i Usuwanie Awarii
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Jako dostawca infrastruktury krytycznej, Rawi-Net prowadzi ciągły monitoring parametrów sieci.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Zakres danych:</strong> Adres IP przypisany do urządzenia, adres MAC routera/karty sieciowej, 
                    logi systemowe routera (np. ONT HALNY), lokalizacja zakończenia sieci, parametry sygnału 
                    (tłumienie, moc).
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Specyfika przetwarzania:</strong> Operator wykorzystuje zdalne protokoły zarządzania 
                    (np. TR-069) do konfiguracji urządzeń abonenckich.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. b RODO (zapewnienie jakości usługi zgodnej z umową) 
                    oraz Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes polegający na utrzymaniu stabilności sieci).
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    3. Realizacja Obowiązku Retencji Danych (Prawo Telekomunikacyjne)
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Rawi-Net Sp. z o.o., jako wpisany do rejestru przedsiębiorców telekomunikacyjnych, 
                    ma ustawowy obowiązek przechowywania tzw. danych retencyjnych.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Zakres danych:</strong> Dane niezbędne do ustalenia zakończenia sieci, 
                    telekomunikacyjnego urządzenia końcowego, użytkownika końcowego inicjującego połączenie, 
                    daty i godziny połączenia oraz czasu jego trwania.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Cel:</strong> Zapewnienie możliwości udostępnienia danych uprawnionym organom 
                    (Sąd, Prokuratura, Policja, służby specjalne) na potrzeby prowadzonych postępowań.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Podstawa prawna:</strong> Art. 180a Ustawy Prawo telekomunikacyjne w zw. z Art. 6 ust. 1 lit. c RODO.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    4. Komunikacja z Użytkownikiem i Marketing
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>Zakres danych:</strong> Adres e-mail, numer telefonu, historia korespondencji.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Działanie:</strong> Odpowiedzi na zapytania z formularzy kontaktowych na stronie internetowej, 
                    przesyłanie informacji o nowościach w ofercie (pod warunkiem wyrażenia zgody).
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes – obsługa zapytań) 
                    oraz Art. 6 ust. 1 lit. a RODO (zgoda na marketing elektroniczny).
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    5. Windykacja Należności i Dochodzenie Roszczeń
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    W sytuacji braku terminowych płatności, dane Abonenta mogą być przetwarzane w celu dochodzenia należności.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Kontekst:</strong> Weryfikacja wiarygodności płatniczej w biurach informacji gospodarczej.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora).
                  </p>
                </div>
              </div>
            </section>

            {/* Section III */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                III. Okres Przechowywania Danych (Retencja)
              </h2>
              <p className="text-muted-foreground mb-6">
                Administrator stosuje zróżnicowane okresy retencji, ściśle dopasowane do kategorii danych:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-card rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-4 font-semibold text-foreground border-b border-border">Kategoria Danych</th>
                      <th className="text-left p-4 font-semibold text-foreground border-b border-border">Okres Przechowywania</th>
                      <th className="text-left p-4 font-semibold text-foreground border-b border-border">Uzasadnienie</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="p-4">Dane Umowne</td>
                      <td className="p-4">Przez okres trwania umowy + okres przedawnienia roszczeń (6 lat).</td>
                      <td className="p-4">Kodeks Cywilny, zabezpieczenie roszczeń.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Dokumentacja Podatkowa (Faktury)</td>
                      <td className="p-4">5 lat licząc od końca roku kalendarzowego.</td>
                      <td className="p-4">Art. 74 Ustawy o rachunkowości.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Dane Transmisyjne (Logi połączeń)</td>
                      <td className="p-4">Ściśle 12 miesięcy.</td>
                      <td className="p-4">Art. 180a Prawa telekomunikacyjnego. Po tym okresie dane są nieodwracalnie niszczone.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Dane z Monitoringu Sieci (Diagnostyka)</td>
                      <td className="p-4">Okres bieżący + archiwum techniczne do 3 miesięcy.</td>
                      <td className="p-4">Potrzeba analizy trendów awaryjności sieci.</td>
                    </tr>
                    <tr>
                      <td className="p-4">Dane Marketingowe</td>
                      <td className="p-4">Do momentu wycofania zgody lub wniesienia sprzeciwu.</td>
                      <td className="p-4">Zasada dobrowolności marketingu.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section IV */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                IV. Odbiorcy Danych i Partnerzy Technologiczni
              </h2>
              <p className="text-muted-foreground mb-6">
                W celu zapewnienia najwyższej jakości usług, Rawi-Net współpracuje ze starannie wyselekcjonowanymi partnerami. 
                Państwa dane mogą być powierzane:
              </p>

              <ul className="space-y-4 text-muted-foreground">
                <li className="bg-card border border-border rounded-xl p-4">
                  <strong className="text-foreground">Dostawcy Platform Telewizyjnych:</strong> Podmioty dostarczające sygnał IPTV 
                  oraz treści VOD (w ramach pakietów Smart TV). Dekodery komunikują się z serwerami licencjodawców treści 
                  w celu autoryzacji uprawnień.
                </li>
                <li className="bg-card border border-border rounded-xl p-4">
                  <strong className="text-foreground">Podmioty Obsługujące Płatności:</strong> Banki oraz operatorzy płatności 
                  elektronicznych obsługujący e-faktury.
                </li>
                <li className="bg-card border border-border rounded-xl p-4">
                  <strong className="text-foreground">Dostawcy Oprogramowania i Hostingu:</strong> Firmy zapewniające utrzymanie 
                  serwerów (AS206442), systemy bilingowe (LMS/CRM) oraz hosting strony WWW.
                </li>
                <li className="bg-card border border-border rounded-xl p-4">
                  <strong className="text-foreground">Służby Państwowe:</strong> Na pisemny wniosek sądu, prokuratury lub innych 
                  uprawnionych służb, Operator jest zobowiązany udostępnić dane retencyjne.
                </li>
              </ul>
            </section>

            {/* Section V */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                V. Pliki Cookies, Analityka i Piksele Śledzące
              </h2>
              <p className="text-muted-foreground mb-6">
                Strona internetowa wykorzystuje technologie śledzące w celu analizy ruchu i optymalizacji oferty.
              </p>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    1. Mechanizm Cookies (Ciasteczka)
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu Użytkownika. Dzielimy je na:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>
                      <strong className="text-foreground">Techniczne (Niezbędne):</strong> Umożliwiające działanie strony, 
                      np. utrzymanie sesji po zalogowaniu do Panelu Abonenta ("Dla Abonenta"). Tych plików nie można wyłączyć.
                    </li>
                    <li>
                      <strong className="text-foreground">Analityczne (Google Analytics):</strong> Pozwalają Administratorowi 
                      zrozumieć, w jaki sposób Użytkownicy korzystają z witryny (np. które podstrony są najczęściej odwiedzane: 
                      "Cennik", "Kontakt"). Dane te są zanonimizowane (maskowanie adresu IP).
                    </li>
                    <li>
                      <strong className="text-foreground">Marketingowe (Facebook Pixel):</strong> Serwis może wykorzystywać 
                      Piksel Facebooka w celu kierowania spersonalizowanych reklam do użytkowników portalu Facebook, 
                      którzy odwiedzili witrynę Rawi-Net. Piksel ten łączy zachowanie na stronie z profilem użytkownika 
                      w serwisie społecznościowym Meta.
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    2. Zarządzanie Zgodami (Cookie Consent)
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Zgodnie z wymogami prawa, przy pierwszej wizycie na stronie wyświetlany jest baner umożliwiający:
                  </p>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Akceptację wszystkich cookies.</li>
                    <li>Odrzucenie cookies nieserwisowych.</li>
                    <li>Szczegółową konfigurację (włączenie analityki, wyłączenie marketingu).</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Domyślnie, pliki marketingowe i analityczne są wyłączone do momentu wyrażenia aktywnej zgody 
                    (kliknięcie "Akceptuję").
                  </p>
                </div>
              </div>
            </section>

            {/* Section VI */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                VI. Prawa Użytkownika i Procedura Kontrolna
              </h2>
              <p className="text-muted-foreground mb-6">
                Przysługuje Państwu pełen katalog praw wynikających z RODO:
              </p>

              <ul className="space-y-3 text-muted-foreground">
                <li className="bg-card border border-border rounded-xl p-4">
                  <strong className="text-foreground">Prawo dostępu:</strong> Możliwość uzyskania kopii danych 
                  (np. historii wpłat, kopii umowy).
                </li>
                <li className="bg-card border border-border rounded-xl p-4">
                  <strong className="text-foreground">Prawo do sprostowania:</strong> Aktualizacja danych adresowych czy kontaktowych.
                </li>
                <li className="bg-card border border-border rounded-xl p-4">
                  <strong className="text-foreground">Prawo do usunięcia danych:</strong> Dotyczy danych przetwarzanych 
                  na podstawie zgody lub gdy ustał cel przetwarzania. <em>Uwaga:</em> Nie dotyczy to danych, które Operator 
                  musi przechowywać na mocy ustawy (retencja, podatki).
                </li>
                <li className="bg-card border border-border rounded-xl p-4">
                  <strong className="text-foreground">Prawo do sprzeciwu:</strong> Wobec marketingu bezpośredniego.
                </li>
                <li className="bg-card border border-border rounded-xl p-4">
                  <strong className="text-foreground">Prawo do przenoszenia danych:</strong> Otrzymanie historii transakcji 
                  w formacie CSV/XML.
                </li>
              </ul>

              <p className="text-muted-foreground mt-6">
                Wnioski prosimy kierować na adres: <a href="mailto:biuro@rawinet.pl" className="text-primary hover:underline">biuro@rawinet.pl</a> lub 
                pisemnie na adres siedziby w Rawiczu. Administrator udziela odpowiedzi w terminie 30 dni.
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
