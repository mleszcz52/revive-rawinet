import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, X, Clock, Calculator, Cpu, FileText, Shield, Heart, MapPin } from "lucide-react";
const WhyUs = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Dlaczego My?
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Rawi-Net: Internet bez{" "}
                <span className="text-gradient">"cyrografu"</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Prawdziwa wolność wyboru.
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Wybór dostawcy internetu to często wybór mniejszego zła. Wielkie korporacje kuszą reklamami "za grosze", 
                  by potem wiązać klientów skomplikowanymi umowami na lata. My w Rawi-Net działamy inaczej. 
                  Sprawdziliśmy, jak nasza oferta (300 Mb/s) wypada na tle rynkowych gigantów w 2025 roku.
                </p>
                <p className="text-xl font-semibold text-primary mt-6">
                  Oto fakty, o których nie usłyszysz w reklamach telewizyjnych.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Umowa */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <Clock className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground shrink-0" />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                  1. Umowa: Twoja wolność vs. Ich kajdanki
                </h2>
              </div>
              
              <p className="text-lg text-primary font-semibold mb-8">
                To nasza największa przewaga, której boją się duzi gracze.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Giganci */}
                <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <X className="w-6 h-6 text-destructive" />
                    <h3 className="text-xl font-bold text-destructive">U gigantów</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Niewolnictwo terminowe</p>
                  <p className="text-muted-foreground">
                    Standardem rynkowym jest umowa na <strong>24 miesiące</strong>. Jeśli po roku będziesz musiał się przeprowadzić 
                    lub stracisz pracę i będziesz chciał zrezygnować – zapłacisz karę umowną (tzw. zwrot ulgi), 
                    często wynoszącą kilkaset złotych. <strong>Jesteś uwiązany.</strong>
                  </p>
                </div>

                {/* Rawi-Net */}
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-primary">W Rawi-Net</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Czas nieokreślony</p>
                  <p className="text-muted-foreground">
                    U nas podpisujesz umowę na <strong>czas nieokreślony</strong>. Jesteśmy tak pewni jakości naszych usług, 
                    że nie musimy Cię trzymać siłą. <strong>Zostajesz z nami, bo chcesz, a nie dlatego, że musisz.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Matematyka */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <Calculator className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground shrink-0" />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                  2. Matematyka nie kłamie: Ile zapłacisz przez 2 lata?
                </h2>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                Porównaliśmy całkowity koszt internetu o prędkości ok. 300 Mb/s w domu jednorodzinnym przez okres 24 miesięcy.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Duży operator */}
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="text-xl font-bold text-destructive mb-4 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Scenariusz rynkowy (Duży Operator)
                  </h3>
                  <ul className="space-y-3 text-muted-foreground text-sm md:text-base">
                    <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span>Abonament (pierwsze 6 mies.):</span>
                      <span className="font-semibold text-foreground">60 zł</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span>Abonament po podwyżce (18 mies.):</span>
                      <span className="font-semibold text-foreground">90 zł</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span>Opłata za "domek":</span>
                      <span className="font-semibold text-foreground">+20 zł/mies.</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span>Aktywacja:</span>
                      <span className="font-semibold text-foreground">1 zł</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="font-bold text-foreground">RAZEM po 2 latach:</span>
                      <span className="text-xl md:text-2xl font-bold text-destructive">ok. 2460 zł</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">(i nadal wiąże Cię umowa!)</p>
                  </div>
                </div>

                {/* Rawi-Net */}
                <div className="p-6 bg-primary/5 border border-primary/30 rounded-2xl">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Scenariusz Rawi-Net (Pakiet KOMFORT)
                  </h3>
                  <ul className="space-y-3 text-muted-foreground text-sm md:text-base">
                    <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span>Abonament (stała cena):</span>
                      <span className="font-semibold text-foreground">59,99 zł</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span>Opłata za "domek":</span>
                      <span className="font-semibold text-primary">0 zł</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span>Opłata aktywacyjna (jednorazowo):</span>
                      <span className="font-semibold text-foreground">249 zł</span>
                    </li>
                    <li className="text-xs md:text-sm italic">(uczciwa opłata na start, opłata instalacyjna wyliczana indywidualnie)</li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-primary/20">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="font-bold text-foreground">RAZEM po 2 latach:</span>
                      <span className="text-xl md:text-2xl font-bold text-primary">ok. 1688 zł</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wniosek */}
              <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-2xl">
                <p className="text-lg md:text-xl font-semibold text-foreground text-center">
                  👉 <strong>Wniosek:</strong> Wybierając Rawi-Net, w ciągu dwóch lat oszczędzasz w kieszeni{" "}
                  <span className="text-primary font-bold">prawie 800 zł</span>, mimo opłaty startowej!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Sprzęt */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <Cpu className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground shrink-0" />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                  3. Sprzęt: Twój wybór, a nie przymus
                </h2>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                Większość operatorów narzuca swój sprzęt i pobiera za niego miesięczną opłatę "dzierżawną", 
                która nigdy się nie kończy. W Rawi-Net szanujemy Twoją własność.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-6">Dajemy Ci 3 opcje:</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="p-6 bg-card border border-border rounded-2xl text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Masz swój router?</h4>
                  <p className="text-muted-foreground text-sm">Świetnie, używasz go za</p>
                  <p className="text-2xl font-bold text-primary mt-2">0 zł</p>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Chcesz kupić?</h4>
                  <p className="text-muted-foreground text-sm">Router Wi-Fi 7 na własność</p>
                  <p className="text-2xl font-bold text-primary mt-2">200 zł</p>
                  <p className="text-xs text-muted-foreground">jednorazowo</p>
                  <p className="text-xs text-muted-foreground italic mt-1">Cena zaktualizowana — wzrost cen komponentów</p>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Wolisz wynajem?</h4>
                  <p className="text-muted-foreground text-sm">Dzierżawa sprzętu</p>
                  <p className="text-2xl font-bold text-primary mt-2">10 zł/mies.</p>
                </div>
              </div>

              <p className="text-center text-lg font-semibold text-primary">
                To Ty decydujesz, co Ci się opłaca.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Przejrzystość */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <FileText className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground shrink-0" />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                  4. Przejrzystość: 3 strony vs. Tomy regulaminów
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* U gigantów */}
                <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <X className="w-6 h-6 text-destructive" />
                    <h3 className="text-xl font-bold text-destructive">U gigantów</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Umowy są tak skonstruowane, by ukryć klauzule inflacyjne (prawo do podnoszenia ceny w trakcie umowy) 
                    i automatyczne przedłużenia. Regulaminy mają po <strong>kilkadziesiąt stron</strong> drobnym drukiem.
                  </p>
                </div>

                {/* Rawi-Net */}
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-primary">W Rawi-Net</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Nasza umowa ma <strong>3 strony</strong>. Jest napisana po polsku, a nie "prawniczemu". 
                    Nie mamy ukrytych gwiazdek, bo budujemy relacje na zaufaniu, a nie na haczykach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Podsumowanie */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Podsumowanie
              </h2>

              <p className="text-lg text-muted-foreground mb-8">
                Wybierając Rawi-Net, wybierasz:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <Shield className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Wolność</h3>
                  <p className="text-muted-foreground text-sm">
                    Umowa na czas nieokreślony
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <Calculator className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Oszczędność</h3>
                  <p className="text-muted-foreground text-sm">
                    Prawie 800 zł mniej w skali 2 lat w porównaniu do ofert "promocyjnych"
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <MapPin className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Lokalne wsparcie</h3>
                  <p className="text-muted-foreground text-sm">
                    Serwis na miejscu w Rawiczu, a nie infolinia w Warszawie
                  </p>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-primary to-primary/80 rounded-2xl text-primary-foreground">
                <p className="text-xl md:text-2xl font-bold mb-4">
                  Nie daj się złapać w sieć korporacji.
                </p>
                <p className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2">
                  <Heart className="w-8 h-8" />
                  Podłącz się do sieci lokalnej.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default WhyUs;