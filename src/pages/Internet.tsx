import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RouterOptions } from "@/components/RouterOptions";
import { Check, Zap, Wifi, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const internetPlans = [
  {
    name: "Start",
    speed: "100 Mbps",
    price: "49",
    features: ["Do 100 Mbps download", "Do 20 Mbps upload", "Bez limitu danych", "Router w cenie"],
    popular: false,
  },
  {
    name: "Standard",
    speed: "300 Mbps",
    price: "69",
    features: ["Do 300 Mbps download", "Do 50 Mbps upload", "Bez limitu danych", "Router Wi-Fi 6", "Publiczny IP"],
    popular: true,
  },
  {
    name: "Premium",
    speed: "1 Gbps",
    price: "99",
    features: ["Do 1 Gbps download", "Do 300 Mbps upload", "Bez limitu danych", "Router Wi-Fi 6", "Publiczny IP", "Priorytetowe wsparcie"],
    popular: false,
  },
];

const Internet = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                Internet Światłowodowy
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Szybki internet <span className="text-gradient">bez limitów</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Wybierz pakiet dopasowany do Twoich potrzeb. Wszystkie pakiety bez limitu transferu danych.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white/80">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Do 1 Gbps</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Wifi className="w-5 h-5 text-primary" />
                  <span>Wi-Fi 6</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>Bez limitu</span>
                </div>
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
                Wszystkie ceny są cenami brutto. Umowa na 24 miesiące.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {internetPlans.map((plan, index) => (
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
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground"> zł/mies.</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
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
                        plan.popular
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

        {/* Router Options */}
        <RouterOptions />
      </main>
      <Footer />
    </div>
  );
};

export default Internet;
