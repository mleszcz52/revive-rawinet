import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JamboxChannels } from "@/components/JamboxChannels";
import { Check, Tv, Film, Monitor, Phone, Plus, Users, Info, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import tvSmartDecoder from "@/assets/tv-smart-decoder.jpg";

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

const thematicPackages = [
  {
    name: "Więcej Sportu PLUS",
    price: "24,99",
    channels: ["Eurosport 2 HD", "Polsat Sport 2 HD", "Eleven Sports 2 HD", "Extreme Channel HD", "Polsat Sport 3 HD", "Fightklub HD"],
    icon: "🏆",
  },
  {
    name: "Więcej Erotyki",
    price: "24,99",
    channels: ["Adult Channel", "Blue Hustler", "Brazzers TV Europe HD", "Dorcel XXX HD", "Hustler TV", "Private TV HD"],
    icon: "🔞",
  },
];

const premiumPackages = [
  {
    name: "Pakiet Eleven",
    price: "24,99",
    channels: ["Eleven Sports 1 4K", "Eleven Sports 1 HD", "Eleven Sports 2 HD", "Eleven Sports 3 HD", "Eleven Sports 4 HD"],
    icon: "⚽",
  },
  {
    name: "Pakiet HBO + Max",
    price: "29,99",
    channels: ["HBO HD", "HBO2 HD", "HBO3 HD"],
    icon: "🎬",
  },
  {
    name: "Pakiet Cinemax",
    price: "14,99",
    channels: ["Cinemax HD", "Cinemax 2 HD"],
    icon: "🎥",
  },
  {
    name: "Pakiet Filmbox",
    price: "14,99",
    channels: ["FilmBox Extra HD", "FilmBox Premium HD", "FilmBox Family", "FilmBox Action", "Filmbox Arthouse"],
    icon: "📽️",
  },
  {
    name: "CANAL+ Select",
    price: "62,99",
    channels: ["CANAL+ 360 HD", "CANAL+ Premium HD", "CANAL+ 1 HD", "CANAL+ Film HD", "CANAL+ Seriale HD", "CANAL+ Dokument HD"],
    icon: "📺",
  },
  {
    name: "CANAL+ Prestige",
    price: "68,99",
    channels: ["CANAL+ 360 HD", "CANAL+ Premium HD", "CANAL+ Sport HD", "CANAL+ Sport 2-4 HD", "CANAL+ 4K Ultra HD", "+ więcej"],
    icon: "👑",
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

        {/* TV Smart Banner */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Image */}
              <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl blur-2xl"></div>
                  <img 
                    src={tvSmartDecoder} 
                    alt="TV Smart - dekoder 4K z Android TV" 
                    className="relative w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              
              {/* Right - Content */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <span className="text-3xl lg:text-4xl font-bold text-white">tv</span>
                  <span className="text-3xl lg:text-4xl font-bold text-primary">smart</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Dekoder 4K z Android TV
                </h3>
                <p className="text-lg text-white/70 mb-6 max-w-lg mx-auto lg:mx-0">
                  Łączy tradycyjną telewizję z dostępem do Netflix, HBO Max, Disney+, YouTube i innych serwisów streamingowych. Wszystko w jednym urządzeniu!
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">Android TV</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">4K Ultra HD</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">VOD</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">Streaming</span>
                </div>
                <div className="flex justify-center lg:justify-start">
                  <a href="https://www.jambox.pl/tvsmart" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-white/50 bg-white/10 text-white hover:bg-white/20 font-semibold">
                      Więcej informacji o TV Smart
                    </Button>
                  </a>
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

                    <ul className="space-y-3">
                      {pkg.features.map((feature, i) => (
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
          </div>
        </section>

        {/* Thematic Packages */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Plus className="w-4 h-4 inline mr-1" />
                Rozszerz swój pakiet
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pakiety <span className="text-gradient">tematyczne</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Domów dodatkowe kanały w każdej chwili – szybko i łatwo!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {thematicPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-card-hover transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pkg.icon}</span>
                      <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-primary">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground"> zł/mies.</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.channels.map((channel, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Packages */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Pakiety <span className="text-gradient">Premium</span>
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {premiumPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-card-hover hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{pkg.icon}</span>
                    <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground"> zł brutto/mies.</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.channels.map((channel, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                        {channel}
                      </span>
                    ))}
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

        {/* Pricing Info Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border shadow-card">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Ważne informacje o cenach</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Ceny pakietów telewizyjnych dotyczą dostępu do TV dla <strong className="text-foreground">jednego odbiornika</strong>. 
                    Dla każdego następnego odbiornika TV należy doliczyć opłatę miesięczną za dzierżawę dekodera i multiroom.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Dzierżawa dekodera + TV SMART</p>
                      <p className="text-lg font-bold text-primary">15 zł<span className="text-sm font-normal text-muted-foreground">/mies.</span></p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Multiroom (za odbiornik)</p>
                      <p className="text-lg font-bold text-primary">10 zł<span className="text-sm font-normal text-muted-foreground">/mies.</span></p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Okres umowy</p>
                      <p className="text-lg font-bold text-foreground">Czas nieokreślony</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multiroom Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Users className="w-4 h-4 inline mr-1" />
                  Dla całej rodziny
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  <span className="text-gradient">Multiroom</span> - telewizja w każdym pokoju
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Jeden abonament, a każdy domownik ogląda co chce - niezależnie i bez zakłóceń.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left - Features */}
                <div className="space-y-6">
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-card-hover transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Niezależne oglądanie</h3>
                        <p className="text-muted-foreground text-sm">
                          Każdy domownik może oglądać co chce - Ty serial, a ktoś inny mecz, bez żadnych zakłóceń.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-card-hover transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Ten sam pakiet wszędzie</h3>
                        <p className="text-muted-foreground text-sm">
                          Na każdym dekoderze masz dokładnie ten sam wybrany pakiet telewizji w pełnej jakości.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - CTA Card */}
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Cennik Multiroom
                    </h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                      <span className="text-muted-foreground">Dzierżawa dekodera + TV SMART</span>
                      <span className="font-bold text-primary">15 zł/mies.</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                      <span className="text-muted-foreground">Opłata Multiroom</span>
                      <span className="font-bold text-primary">10 zł/mies.</span>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground mb-6 p-3 bg-muted/30 rounded-lg">
                    <strong className="text-foreground">Razem za dodatkowy odbiornik:</strong><br/>
                    25 zł brutto/mies.
                  </div>

                  <a href="tel:505051376" className="block">
                    <Button size="lg" className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow">
                      <Phone className="w-5 h-5 mr-2" />
                      Zamów Multiroom
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart TV Info */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Smart TV - Oglądaj gdzie chcesz
              </h2>
              <p className="text-lg text-muted-foreground">
                Dzięki usłudze Smart TV możesz oglądać telewizję na smartfonie, tablecie lub komputerze. 
                Telewizja dostępna również przez aplikację JAMBOX GO.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Television;
