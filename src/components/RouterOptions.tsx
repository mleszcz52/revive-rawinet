import { Check, X, Wifi, Router, Box, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import routerWifi5Image from "@/assets/router-wifi5-basic.jpg";
import routerWifi7Image from "@/assets/router-wifi7.jpg";
interface RouterOption {
  id: number;
  title: string;
  price: string;
  priceType: "free" | "once" | "monthly";
  icon: typeof Router;
  image: string;
  recommended?: boolean;
  ontNote?: string;
  pros: string[];
  cons: string[];
}

const routerOptions: RouterOption[] = [
  {
    id: 1,
    title: "Własny Router",
    price: "0 zł",
    priceType: "free",
    icon: Router,
    image: "https://rawinet.pl/wp-content/uploads/2025/05/routernoname-1-683x1024.webp",
    ontNote: "Światłowód zakończony ONT",
    pros: [
      "Brak dodatkowych opłat",
      "Pełna kontrola nad urządzeniem",
      "Możliwość korzystania ze sprawdzonego sprzętu",
    ],
    cons: [
      "Samodzielna konfiguracja",
      "Brak gwarancji kompatybilności",
      "Starszy sprzęt może ograniczać wydajność",
    ],
  },
  {
    id: 2,
    title: "Router Wi-Fi 7",
    price: "177 zł",
    priceType: "once",
    icon: Wifi,
    image: routerWifi7Image,
    recommended: true,
    ontNote: "Światłowód zakończony ONT",
    pros: [
      "Jednorazowy zakup na własność",
      "Wi-Fi 7 do 5760 Mbps",
      "4 anteny z beamformingiem",
      "Idealny do mieszkań 2-3 pokojowych",
      "Możliwość dokupienia routerów i połączenia w sieć Mesh",
    ],
    cons: [
      "Wyższy koszt początkowy",
      "Zasięg może być niewystarczający w większych domach",
    ],
  },
  {
    id: 3,
    title: "Podstawowy Router",
    price: "10 zł",
    priceType: "monthly",
    icon: Box,
    image: routerWifi5Image,
    pros: [
      "Niski miesięczny koszt",
      "Wi-Fi 5 AC1200",
      "Pełna kompatybilność z siecią",
      "Wsparcie i zdalna diagnostyka",
    ],
    cons: [
      "Opłata cykliczna",
      "Urządzenie pozostaje własnością Rawi-Net",
    ],
  },
];

const PriceLabel = ({ price, type }: { price: string; type: RouterOption["priceType"] }) => {
  const labels = {
    free: "",
    once: "jednorazowo",
    monthly: "brutto/mies.",
  };

  return (
    <div className="text-center">
      <span className="text-3xl lg:text-4xl font-bold text-foreground">{price}</span>
      {type !== "free" && (
        <span className="block text-sm text-muted-foreground mt-1">{labels[type]}</span>
      )}
    </div>
  );
};

export const RouterOptions = () => {
  return (
    <section id="internet" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Opcje sprzętu
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Masz do wyboru <span className="text-gradient">trzy opcje</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Wybierz rozwiązanie, które najlepiej odpowiada Twoim potrzebom i budżetowi.
          </p>
        </div>

        {/* Router Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {routerOptions.map((option, index) => (
            <div
              key={option.id}
              className={cn(
                "relative bg-card rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-card-hover group",
                option.recommended 
                  ? "border-primary shadow-glow lg:scale-105" 
                  : "border-border shadow-card hover:border-primary/50"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Recommended Badge */}
              {option.recommended && (
                <div className="absolute top-0 left-0 right-0 gradient-primary py-2 text-center">
                  <span className="text-sm font-semibold text-primary-foreground">
                    ⭐ Rekomendowane
                  </span>
                </div>
              )}

              <div className={cn("p-6 lg:p-8", option.recommended && "pt-14")}>
              {/* Router Image */}
                <div className="relative h-40 mb-6 flex items-center justify-center bg-white rounded-xl p-4">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Title & Price */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">{option.title}</h3>
                  <PriceLabel price={option.price} type={option.priceType} />
                </div>

                {/* ONT Note */}
                {option.ontNote && (
                  <div className="flex items-center gap-2 justify-center mb-6 px-3 py-2 bg-primary/10 rounded-lg">
                    <Box className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-medium text-primary">{option.ontNote}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-border mb-6" />

                {/* Pros */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Zalety</span>
                  {option.pros.map((pro, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">{pro}</span>
                    </div>
                  ))}
                </div>

                {/* Cons */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Wady</span>
                  {option.cons.map((con, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-destructive" />
                      </div>
                      <span className="text-sm text-muted-foreground">{con}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Single CTA Button */}
        <div className="text-center mt-12">
          <a href="tel:505051376">
            <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
              <Phone className="w-5 h-5 mr-2" />
              Zapytaj o router: 505 051 376
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
