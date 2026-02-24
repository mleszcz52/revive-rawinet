import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Regulations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Regulamin świadczenia usług telekomunikacyjnych
          </h1>
          <p className="text-muted-foreground mb-10">
            Rawi-Net Sp. z o.o. — obowiązuje od: <span className="text-foreground font-medium">[DATA DO UZUPEŁNIENIA]</span>
          </p>

          <div className="prose prose-lg max-w-none space-y-10 text-foreground/90">
            {/* §1 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §1. Postanowienia ogólne
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Niniejszy Regulamin określa zakres i warunki świadczenia usług telekomunikacyjnych przez Rawi-Net Sp. z o.o. z siedzibą w Rawiczu, ul. Mikołajewicza 8B/1, 63-900 Rawicz, NIP: 699-194-79-84, REGON: 301729188 (dalej „Operator").</li>
                <li>Regulamin został wydany na podstawie art. 384 Kodeksu cywilnego oraz ustawy z dnia 12 grudnia 2024 r. – Prawo komunikacji elektronicznej.</li>
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — dodatkowe postanowienia ogólne specyficzne dla Rawi-Net]</span></li>
              </ol>
            </section>

            {/* §2 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §2. Definicje
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Abonent</strong> — osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, która jest stroną umowy o świadczenie usług telekomunikacyjnych.</li>
                <li><strong>Usługa</strong> — usługa dostępu do internetu lub usługa telewizji świadczona przez Operatora.</li>
                <li><strong>Umowa</strong> — umowa o świadczenie usług telekomunikacyjnych zawarta pomiędzy Operatorem a Abonentem.</li>
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — dodatkowe definicje]</span></li>
              </ol>
            </section>

            {/* §3 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §3. Zakres świadczonych usług
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Operator świadczy usługi dostępu do sieci Internet za pomocą łączy światłowodowych.</li>
                <li>Operator świadczy usługi telewizji (IPTV / DVB-C).</li>
                <li>Szczegóły oferty, w tym prędkości i parametry usług, określa aktualny cennik dostępny na stronie internetowej Operatora.</li>
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — szczegółowy zakres usług]</span></li>
              </ol>
            </section>

            {/* §4 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §4. Zawarcie, zmiana i rozwiązanie umowy
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Umowa zostaje zawarta w formie pisemnej lub elektronicznej.</li>
                <li>Umowa może być zawarta na czas określony lub nieokreślony.</li>
                <li>Abonent może wypowiedzieć umowę zawartą na czas nieokreślony z zachowaniem jednomiesięcznego okresu wypowiedzenia ze skutkiem na koniec okresu rozliczeniowego.</li>
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — szczegółowe warunki zawierania, zmiany i rozwiązywania umów]</span></li>
              </ol>
            </section>

            {/* §5 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §5. Minimalna jakość usług
              </h2>
              <p className="text-muted-foreground mb-4">
                Zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2015/2120, Operator informuje o parametrach jakości usługi dostępu do internetu:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border px-4 py-2 text-left text-foreground">Pakiet</th>
                      <th className="border border-border px-4 py-2 text-left text-foreground">Prędkość maksymalna</th>
                      <th className="border border-border px-4 py-2 text-left text-foreground">Prędkość zwykle dostępna</th>
                      <th className="border border-border px-4 py-2 text-left text-foreground">Prędkość minimalna</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">Komfort 300</td>
                      <td className="border border-border px-4 py-2">[DO UZUPEŁNIENIA]</td>
                      <td className="border border-border px-4 py-2">[DO UZUPEŁNIENIA]</td>
                      <td className="border border-border px-4 py-2">[DO UZUPEŁNIENIA]</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">Premium 700</td>
                      <td className="border border-border px-4 py-2">[DO UZUPEŁNIENIA]</td>
                      <td className="border border-border px-4 py-2">[DO UZUPEŁNIENIA]</td>
                      <td className="border border-border px-4 py-2">[DO UZUPEŁNIENIA]</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2 font-medium">Biznes 1000</td>
                      <td className="border border-border px-4 py-2">[DO UZUPEŁNIENIA]</td>
                      <td className="border border-border px-4 py-2">[DO UZUPEŁNIENIA]</td>
                      <td className="border border-border px-4 py-2">[DO UZUPEŁNIENIA]</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* §6 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §6. Odpowiedzialność Operatora
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Operator odpowiada za niewykonanie lub nienależyte wykonanie usługi telekomunikacyjnej.</li>
                <li>Operator nie ponosi odpowiedzialności za przerwy w świadczeniu usług spowodowane siłą wyższą, działaniami osób trzecich lub przyczynami leżącymi po stronie Abonenta.</li>
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — szczegółowe zasady odpowiedzialności]</span></li>
              </ol>
            </section>

            {/* §7 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §7. Postępowanie reklamacyjne
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Abonent ma prawo złożyć reklamację w przypadku niewykonania lub nienależytego wykonania usługi.</li>
                <li>
                  Reklamację można złożyć:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>pisemnie — na adres siedziby Operatora: ul. Mikołajewicza 8B/1, 63-900 Rawicz</li>
                    <li>elektronicznie — na adres e-mail: biuro@rawinet.pl</li>
                    <li>telefonicznie — pod numerem: 505 051 376</li>
                  </ul>
                </li>
                <li>Reklamacja powinna zawierać: imię i nazwisko Abonenta, adres, numer umowy (jeśli posiada), opis problemu oraz oczekiwany sposób rozpatrzenia.</li>
                <li>Operator rozpatruje reklamację w terminie <strong>30 dni</strong> od dnia jej złożenia. W przypadku braku odpowiedzi w tym terminie, reklamację uważa się za uwzględnioną.</li>
                <li>W przypadku nieuwzględnienia reklamacji, Abonent ma prawo:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>zwrócić się do Prezesa Urzędu Komunikacji Elektronicznej (UKE) z wnioskiem o rozstrzygnięcie sporu</li>
                    <li>skorzystać z mediacji lub sądu polubownego przy Prezesie UKE</li>
                    <li>dochodzić roszczeń na drodze sądowej</li>
                  </ul>
                </li>
              </ol>
            </section>

            {/* §8 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §8. Prawo odstąpienia od umowy zawartej na odległość
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Abonent będący konsumentem, który zawarł umowę na odległość lub poza lokalem przedsiębiorstwa, ma prawo odstąpić od umowy bez podania przyczyny w terminie <strong>14 dni</strong> od dnia zawarcia umowy.</li>
                <li>
                  Oświadczenie o odstąpieniu można złożyć:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>pisemnie — na adres siedziby Operatora</li>
                    <li>elektronicznie — na adres e-mail: biuro@rawinet.pl</li>
                  </ul>
                </li>
                <li>Wzór formularza odstąpienia od umowy stanowi załącznik do niniejszego Regulaminu.</li>
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — wzór formularza odstąpienia od umowy]</span></li>
              </ol>
            </section>

            {/* §9 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §9. Ograniczenia w korzystaniu z usług
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Abonent zobowiązuje się do korzystania z usług zgodnie z obowiązującym prawem i postanowieniami niniejszego Regulaminu.</li>
                <li><span className="text-primary font-medium">[DO UZUPEŁNIENIA — szczegółowe ograniczenia]</span></li>
              </ol>
            </section>

            {/* §10 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §10. Ochrona danych osobowych
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Administratorem danych osobowych Abonentów jest Rawi-Net Sp. z o.o.</li>
                <li>Szczegółowe informacje dotyczące przetwarzania danych osobowych zawiera <a href="/polityka-prywatnosci" className="text-primary hover:underline">Polityka Prywatności</a>.</li>
              </ol>
            </section>

            {/* §11 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">
                §11. Postanowienia końcowe
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Regulamin wchodzi w życie z dniem <span className="text-primary font-medium">[DATA DO UZUPEŁNIENIA]</span>.</li>
                <li>Operator zastrzega sobie prawo do zmiany Regulaminu z zachowaniem procedury przewidzianej w ustawie – Prawo komunikacji elektronicznej.</li>
                <li>W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.</li>
              </ol>
            </section>

            {/* Info box */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-12">
              <p className="text-sm text-foreground font-semibold mb-2">⚠️ Uwaga</p>
              <p className="text-sm text-muted-foreground">
                Niniejszy dokument stanowi szablon regulaminu. Wszystkie miejsca oznaczone jako <span className="text-primary font-medium">[DO UZUPEŁNIENIA]</span> powinny zostać uzupełnione o dane i warunki specyficzne dla działalności Rawi-Net Sp. z o.o. Zaleca się konsultację z prawnikiem przed publikacją ostatecznej wersji.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Regulations;
