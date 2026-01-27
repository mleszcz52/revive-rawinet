import { Zap, Shield, Headphones, Globe, Tv, Gauge } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Szybki Internet",
    description: "Światłowód do 1 Gbps dla płynnego streamingu, gamingu i pracy zdalnej.",
  },
  {
    icon: Shield,
    title: "Stabilne Łącze",
    description: "Technologia światłowodowa gwarantuje stałą prędkość bez spadków.",
  },
  {
    icon: Headphones,
    title: "Wsparcie 24/7",
    description: "Nasz zespół techniczny jest dostępny przez całą dobę.",
  },
  {
    icon: Globe,
    title: "Bez Limitu",
    description: "Korzystaj z internetu bez ograniczeń transferu danych.",
  },
  {
    icon: Tv,
    title: "Telewizja",
    description: "Pakiety TV z setkami kanałów w jakości HD i 4K.",
  },
  {
    icon: Gauge,
    title: "Niskie Opóźnienia",
    description: "Idealne dla graczy - ping poniżej 10ms.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Dlaczego my?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Internet, który <span className="text-gradient">działa</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Lokalny dostawca z najwyższą jakością usług i wsparciem technicznym.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 lg:p-8 bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
