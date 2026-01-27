import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Building2, Shield, Clock, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const businessPlans = [
  {
    name: "Biznes Start",
    speed: "300 Mbps",
    price: "99",
    features: [
      "Symetryczne 300/300 Mbps",
      "Stały adres IP",
      "SLA 99%",
      "Wsparcie w godzinach pracy",
      "Router biznesowy",
    ],
    popular: false,
  },
  {
    name: "Biznes Pro",
    speed: "1 Gbps",
    price: "199",
    features: [
      "Symetryczne 1/1 Gbps",
      "Stały adres IP",
      "SLA 99.5%",
      "Wsparcie 24/7",
      "Router enterprise",
      "Priorytetowa obsługa",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    speed: "10 Gbps",
    price: "Indywidualnie",
    features: [
      "Do 10 Gbps symetrycznie",
      "Pula adresów IP",
      "SLA 99.9%",
      "Dedykowany opiekun",
      "Redundancja łącza",
      "Rozwiązania VPN",
    ],
    popular: false,
  },
];

const businessFeatures = [
  {
    icon: Building2,
    title: "Dla firm każdej wielkości",
    description: "Od małych firm po duże przedsiębiorstwa - mamy rozwiązanie dla Ciebie.",
  },
  {
    icon: Shield,
    title: "Gwarancja SLA",
    description: "Gwarantowana dostępność usługi z jasno określonymi warunkami.",
  },
  {
    icon: Clock,
    title: "Szybka reakcja",
    description: "Krótki czas reakcji na zgłoszenia i priorytetowa obsługa.",
  },
  {
    icon: Headphones,
    title: "Dedykowane wsparcie",
    description: "Dedykowany opiekun klienta i wsparcie techniczne 24/7.",
  },
];

const Business = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                Internet dla Biznesu
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Rozwiązania <span className="text-gradient">dla firm</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Profesjonalne łącza światłowodowe z gwarancją SLA dla Twojego biznesu.
              </p>
              <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
                Zapytaj o ofertę
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {businessFeatures.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Plans */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pakiety <span className="text-gradient">biznesowe</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Wybierz pakiet dopasowany do potrzeb Twojej firmy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {businessPlans.map((plan) => (
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
                        ⭐ Polecany
                      </span>
                    </div>
                  )}

                  <div className={cn("p-8", plan.popular && "pt-14")}>
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                      <p className="text-3xl font-bold text-primary mb-1">{plan.speed}</p>
                    </div>

                    <div className="text-center mb-8">
                      {plan.price === "Indywidualnie" ? (
                        <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                          <span className="text-muted-foreground"> zł netto/mies.</span>
                        </>
                      )}
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
                      {plan.price === "Indywidualnie" ? "Zapytaj o ofertę" : "Zamów teraz"}
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

export default Business;
