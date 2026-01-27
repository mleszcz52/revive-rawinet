import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Tv, Film, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tvPackages = [
  {
    name: "Podstawowy",
    channels: "60+",
    price: "29",
    features: ["Ponad 60 kanałów", "Kanały HD", "TVP, Polsat, TVN", "Kanały dziecięce"],
    popular: false,
  },
  {
    name: "Rozszerzony",
    channels: "120+",
    price: "49",
    features: ["Ponad 120 kanałów", "Kanały HD i Full HD", "Kanały sportowe", "Kanały filmowe", "Kanały dokumentalne"],
    popular: true,
  },
  {
    name: "Premium",
    channels: "180+",
    price: "79",
    features: ["Ponad 180 kanałów", "Kanały 4K", "HBO, Canal+", "Wszystkie kanały sportowe", "VOD w cenie", "Nagrywarka DVR"],
    popular: false,
  },
];

const channelLogos = [
  "TVP1", "TVP2", "Polsat", "TVN", "TV4", "TV Puls", "TVN24", "Polsat News",
  "Eurosport", "Canal+ Sport", "HBO", "Canal+", "Discovery", "National Geographic"
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
                Telewizja Cyfrowa
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Telewizja <span className="text-gradient">dla każdego</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Setki kanałów w jakości HD i 4K. Wybierz pakiet dopasowany do Twoich potrzeb.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white/80">
                  <Tv className="w-5 h-5 text-primary" />
                  <span>Do 180+ kanałów</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Monitor className="w-5 h-5 text-primary" />
                  <span>Jakość 4K</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Film className="w-5 h-5 text-primary" />
                  <span>VOD w cenie</span>
                </div>
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
                Wybierz pakiet i ciesz się ulubionymi programami w najlepszej jakości.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tvPackages.map((pkg, index) => (
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
                    </div>

                    <div className="text-center mb-8">
                      <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                      <span className="text-muted-foreground"> zł/mies.</span>
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

        {/* Channel List */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Wybrane kanały
              </h2>
              <p className="text-muted-foreground">
                Oto niektóre z kanałów dostępnych w naszych pakietach.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {channelLogos.map((channel) => (
                <div
                  key={channel}
                  className="px-6 py-3 bg-card rounded-lg border border-border text-muted-foreground font-medium"
                >
                  {channel}
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

export default Television;
