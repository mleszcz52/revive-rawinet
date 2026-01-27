import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Wifi, Tv, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bundlePackages = [
  {
    name: "Duet Start",
    internet: "100 Mbps",
    tv: "60+ kanałów",
    price: "69",
    savings: "9 zł",
    features: ["Internet 100 Mbps", "60+ kanałów TV", "Router Wi-Fi", "Dekoder HD"],
    popular: false,
  },
  {
    name: "Duet Standard",
    internet: "300 Mbps",
    tv: "120+ kanałów",
    price: "99",
    savings: "19 zł",
    features: ["Internet 300 Mbps", "120+ kanałów TV", "Router Wi-Fi 6", "Dekoder Full HD", "Kanały sportowe"],
    popular: true,
  },
  {
    name: "Duet Premium",
    internet: "1 Gbps",
    tv: "180+ kanałów",
    price: "149",
    savings: "29 zł",
    features: ["Internet 1 Gbps", "180+ kanałów TV", "Router Wi-Fi 6", "Dekoder 4K", "HBO, Canal+", "VOD w cenie"],
    popular: false,
  },
];

const InternetTV = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                Pakiety łączone
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Internet + Telewizja <span className="text-gradient">w pakiecie</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Połącz internet z telewizją i oszczędzaj! Pakiety z rabatami do 29 zł miesięcznie.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white/80">
                  <Wifi className="w-5 h-5 text-primary" />
                  <span>Szybki internet</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Tv className="w-5 h-5 text-primary" />
                  <span>Telewizja HD/4K</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Percent className="w-5 h-5 text-primary" />
                  <span>Oszczędność w pakiecie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bundle Packages */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pakiety <span className="text-gradient">Internet + TV</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Wybierz pakiet łączony i oszczędzaj każdego miesiąca.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {bundlePackages.map((pkg, index) => (
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
                        ⭐ Najlepsza wartość
                      </span>
                    </div>
                  )}

                  <div className={cn("p-8", pkg.popular && "pt-14")}>
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-4">{pkg.name}</h3>
                      <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="flex items-center gap-1 text-primary">
                          <Wifi className="w-4 h-4" />
                          <span className="text-sm font-medium">{pkg.internet}</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                          <Tv className="w-4 h-4" />
                          <span className="text-sm font-medium">{pkg.tv}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                      <span className="text-muted-foreground"> zł/mies.</span>
                    </div>

                    <div className="text-center mb-8">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                        Oszczędzasz {pkg.savings}/mies.
                      </span>
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

                    <Button
                      className={cn(
                        "w-full font-semibold",
                        pkg.popular
                          ? "gradient-primary text-primary-foreground shadow-glow"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      Zamów teraz
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InternetTV;
