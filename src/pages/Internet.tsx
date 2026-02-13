import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RouterOptions } from "@/components/RouterOptions";
import { Check, Zap, Wifi, Globe, Phone } from "lucide-react";
import { DarkVeil } from "@/components/DarkVeil";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const internetPlans = [
  {
    name: "Komfort",
    speed: "300 Mbps",
    price: "Zapytaj",
    features: ["Prędkość pobierania do 300 Mbps", "Bez limitu danych", "Umowa na czas nieokreślony", "ONT w zestawie"],
    popular: false,
  },
  {
    name: "Premium",
    speed: "700 Mbps",
    price: "Zapytaj",
    features: ["Prędkość pobierania do 700 Mbps", "Bez limitu danych", "Umowa na czas nieokreślony", "ONT w zestawie", "Idealne do streamingu 4K"],
    popular: true,
  },
  {
    name: "Biznes",
    speed: "1000 Mbps",
    price: "Zapytaj",
    features: ["Prędkość pobierania do 1000 Mbps", "Bez limitu danych", "Umowa na czas nieokreślony", "ONT w zestawie", "Maksymalna wydajność"],
    popular: false,
  },
];

const Internet = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24 relative overflow-hidden">
          <DarkVeil speed={0.3} resolutionScale={0.75} />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                Internet Światłowodowy GPON
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Szybki internet <span className="text-gradient">bez limitów</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Wybierz pakiet dopasowany do Twoich potrzeb. Sieć światłowodowa GPON na terenie powiatu rawickiego.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Do 1 Gbps</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Wifi className="w-5 h-5 text-primary" />
                  <span>Światłowód GPON</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>Bez limitu</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a href="tel:505051376">
                  <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
                    <Phone className="w-5 h-5 mr-2" />
                    505 051 376 (Biuro)
                  </Button>
                </a>
                <a href="tel:605934593" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">605 934 593 (Dział techniczny)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Wybierz swój <span className="text-gradient">pakiet</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Umowa na czas nieokreślony. Opłata jednorazowa – 249zł + opłata instalacyjna – wycena indywidualna.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {internetPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative bg-card rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-card-hover",
                    plan.popular
                      ? "border-primary shadow-glow lg:scale-105"
                      : "border-border shadow-card"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 gradient-primary py-2 text-center">
                      <span className="text-sm font-semibold text-primary-foreground">
                        ⭐ Najpopularniejszy
                      </span>
                    </div>
                  )}

                  <div className={cn("p-8", plan.popular && "pt-14")}>
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                      <p className="text-3xl font-bold text-primary mb-1">{plan.speed}</p>
                    </div>

                    <div className="text-center mb-8">
                      <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-500" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Single CTA */}
            <div className="text-center mt-12">
              <a href="tel:505051376">
                <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
                  <Phone className="w-5 h-5 mr-2" />
                  Zamów internet: 505 051 376
                </Button>
              </a>
            </div>

            {/* Info Box */}
            <div className="mt-12 max-w-4xl mx-auto bg-muted/50 rounded-2xl p-6 lg:p-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Ważne informacje</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Urządzeniem końcowym dostarczanym przez operatora jest konwerter sieci światłowodowej na Ethernet (tzw. ONT).</li>
                <li>• Klient może podłączyć własny router WiFi lub zakupić rekomendowany przez RawiNet Router Wi-Fi 7 lub wydzierżawić Podstawowy Router za 10zł brutto miesięcznie.</li>
                <li>• Powyższa oferta dotyczy klientów uruchamianych na terenie powiatu rawickiego w sieci światłowodowej GPON.</li>
                <li>• Deklarowane prędkości pobierania i wysyłania danych (download/upload) są prędkościami maksymalnymi lub przewidywanymi dla danego pakietu usług.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Router Options */}
        <RouterOptions />
      </main>
      <Footer />
    </div>
  );
};

export default Internet;
