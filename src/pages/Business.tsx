import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Building2, Shield, Clock, Headphones, Zap, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const businessFeatures = [
  {
    icon: Shield,
    title: "Gwarancja parametrów",
    description: "Gwarancja zachowania określonych parametrów pasma i braku overbookingu.",
  },
  {
    icon: Zap,
    title: "Pasmo symetryczne",
    description: "Prędkość transmisji w obydwu kierunkach jest identyczna i gwarantowana.",
  },
  {
    icon: Clock,
    title: "Elastyczność",
    description: "Szybkość transmisji dostosowywana do potrzeb Klientów, od 1 Mb/s.",
  },
  {
    icon: Headphones,
    title: "Serwis 24/7/365",
    description: "Profesjonalny serwis dostępny przez całą dobę, cały rok.",
  },
];

const useCases = [
  "Dostawcy usług Internetowych (ISP)",
  "Firmy wymagające stabilnych i szybkich łączy internetowych",
  "Przedsiębiorstwa z wieloma lokalizacjami",
  "Firmy korzystające z usług chmurowych",
  "Organizacje wymagające wysokiej dostępności",
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
                Wysokiej jakości dostęp do krajowych i zagranicznych zasobów sieci Internet. 
                Oferujemy szeroki zakres przepustowości, pozwalający na dostosowanie rozwiązań do bieżącego zapotrzebowania Klienta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:505051376">
                  <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
                    <Phone className="w-5 h-5 mr-2" />
                    505 051 376 (Biuro, 8-16)
                  </Button>
                </a>
                <a href="tel:605934593">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 font-semibold">
                    <Phone className="w-5 h-5 mr-2" />
                    605 934 593 (Dział techniczny)
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Korzyści dla <span className="text-gradient">Klienta</span>
              </h2>
            </div>
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

        {/* Service Details */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Usługa <span className="text-gradient">internetowa</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Usługa internetowa to wysokiej jakości dostęp do krajowych i zagranicznych zasobów sieci Internet. 
                  Oferujemy szeroki zakres przepustowości, pozwalający na dostosowanie rozwiązań do bieżącego zapotrzebowania 
                  Klienta oraz ich modyfikację w miarę rozwoju firmy.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-muted-foreground">Gwarancja zachowania określonych parametrów pasma i braku overbookingu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-muted-foreground">Łącze dostępowe zakończone stykiem Ethernet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-muted-foreground">Szybkość transmisji dostosowywana do potrzeb - od 1 Mb/s</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-muted-foreground">Pasmo symetryczne - identyczna i gwarantowana prędkość w obu kierunkach</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                    <Building2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Zastosowanie</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  To optymalne rozwiązanie dla:
                </p>
                <ul className="space-y-3">
                  {useCases.map((useCase, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Dlaczego <span className="text-gradient">Rawi-Net?</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Bezpieczeństwo</h3>
                  <p className="text-muted-foreground text-sm">
                    Rawi-Net świadczy usługi najwyższej jakości
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Profesjonalizm</h3>
                  <p className="text-muted-foreground text-sm">
                    Serwis dostępny w systemie 24/7/365
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Optymalne rozwiązanie</h3>
                  <p className="text-muted-foreground text-sm">
                    Ofertę tworzymy indywidualnie dla Klienta
                  </p>
                </div>
              </div>
              <a href="tel:505051376">
                <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
                  <Phone className="w-5 h-5 mr-2" />
                  Zapytaj o ofertę: 505 051 376 (Biuro, 8-16)
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

export default Business;
