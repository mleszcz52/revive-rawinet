import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JamboxChannels } from "@/components/JamboxChannels";
import { Check, Tv, Film, Monitor, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tvPackages = [
  {
    name: "Podstawowy",
    channels: "78",
    hdChannels: "68",
    price: "Zapytaj",
    features: ["78 kanałów telewizyjnych", "68 kanałów w jakości HD", "Telewizja JAMBOX", "Możliwość rozszerzenia o pakiety tematyczne"],
    popular: false,
    link: "/telewizja/podstawowy",
  },
  {
    name: "Korzystny",
    channels: "136",
    hdChannels: "119",
    price: "Zapytaj",
    features: ["136 kanałów telewizyjnych", "119 kanałów w jakości HD", "Telewizja JAMBOX", "Kanały sportowe i filmowe", "Możliwość rozszerzenia o pakiety premium"],
    popular: true,
    link: "/telewizja/korzystny",
  },
  {
    name: "Bogaty",
    channels: "179",
    hdChannels: "152",
    price: "Zapytaj",
    features: ["179 kanałów telewizyjnych", "152 kanały w jakości HD", "Telewizja JAMBOX", "Pełna oferta kanałów", "Pakiety tematyczne i premium"],
    popular: false,
    link: "/telewizja/bogaty",
  },
];


const Television = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                Telewizja JAMBOX
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Telewizja <span className="text-gradient">dla każdego</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Do 179 kanałów w najwyższej jakości HD. Wybierz pakiet dopasowany do Twoich potrzeb.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <Tv className="w-5 h-5 text-primary" />
                  <span>Do 179 kanałów</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Monitor className="w-5 h-5 text-primary" />
                  <span>Do 152 kanałów HD</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Film className="w-5 h-5 text-primary" />
                  <span>Pakiety premium</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:505051376">
                  <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
                    <Phone className="w-5 h-5 mr-2" />
                    505 051 376
                  </Button>
                </a>
                <a href="tel:605934593">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 font-semibold">
                    <Phone className="w-5 h-5 mr-2" />
                    605 934 593
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TV Packages */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pakiety <span className="text-gradient">telewizyjne</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Masz możliwość rozszerzenia swojego pakietu o wybrane pakiety tematyczne oraz premium.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tvPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={cn(
                    "relative bg-card rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-card-hover",
                    pkg.popular
                      ? "border-primary shadow-glow lg:scale-105"
                      : "border-border shadow-card"
                  )}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-0 right-0 gradient-primary py-2 text-center">
                      <span className="text-sm font-semibold text-primary-foreground">
                        ⭐ Polecany
                      </span>
                    </div>
                  )}

                  <div className={cn("p-8", pkg.popular && "pt-14")}>
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
                      <p className="text-3xl font-bold text-primary mb-1">{pkg.channels} kanałów</p>
                      <p className="text-sm text-muted-foreground">w tym {pkg.hdChannels} w jakości HD</p>
                    </div>

                    <div className="text-center mb-8">
                      <span className="text-2xl font-bold text-foreground">{pkg.price}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-500" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a href="tel:505051376">
                      <Button
                        className={cn(
                          "w-full font-semibold",
                          pkg.popular
                            ? "gradient-primary text-primary-foreground shadow-glow"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        Zadzwoń i zamów
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JAMBOX Channel List Widget */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Lista <span className="text-gradient">kanałów</span>
              </h2>
              <p className="text-muted-foreground">
                Wybierz pakiet, aby zobaczyć pełną listę dostępnych kanałów.
              </p>
            </div>
            <JamboxChannels />
          </div>
        </section>

        {/* Smart TV Info */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Smart TV - Oglądaj gdzie chcesz
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Dzięki usłudze Smart TV możesz oglądać telewizję na smartfonie, tablecie lub komputerze. 
                Telewizja dostępna również przez aplikację JAMBOX GO.
              </p>
              <a href="tel:505051376">
                <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
                  Zapytaj o szczegóły
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Television;
