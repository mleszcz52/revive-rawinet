import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Wifi, Tv, Phone } from "lucide-react";
import { DarkVeil } from "@/components/DarkVeil";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bundleCategories = [
  {
    name: "Komfort TV",
    internet: "Internet 300",
    packages: [
      { tvName: "Podstawowy", channels: "78", hdChannels: "68", price: "99" },
      { tvName: "Korzystny", channels: "136", hdChannels: "119", price: "115" },
      { tvName: "Bogaty", channels: "179", hdChannels: "152", price: "125" },
    ],
  },
  {
    name: "Premium TV",
    internet: "Internet 700",
    packages: [
      { tvName: "Podstawowy", channels: "78", hdChannels: "68", price: "109" },
      { tvName: "Korzystny", channels: "136", hdChannels: "119", price: "125" },
      { tvName: "Bogaty", channels: "179", hdChannels: "152", price: "135" },
    ],
  },
  {
    name: "Biznes TV",
    internet: "Internet 1000",
    packages: [
      { tvName: "Podstawowy", channels: "78", hdChannels: "68", price: "140" },
      { tvName: "Korzystny", channels: "136", hdChannels: "119", price: "155" },
      { tvName: "Bogaty", channels: "179", hdChannels: "152", price: "165" },
    ],
  },
];

const InternetTV = () => {
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
                Pakiety łączone
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Internet + Telewizja <span className="text-gradient">w pakiecie</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Połącz internet światłowodowy z telewizją JAMBOX i korzystaj z atrakcyjnych cen pakietowych.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <Wifi className="w-5 h-5 text-primary" />
                  <span>Internet do 1000 Mbps</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Tv className="w-5 h-5 text-primary" />
                  <span>Do 179 kanałów HD</span>
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

        {/* Bundle Categories */}
        {bundleCategories.map((category, categoryIndex) => (
          <section 
            key={category.name} 
            className={cn(
              "py-16 lg:py-24",
              categoryIndex % 2 === 1 && "bg-muted/30"
            )}
          >
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {category.name}
                </h2>
                <p className="text-xl text-primary font-semibold">
                  {category.internet}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {category.packages.map((pkg, index) => (
                  <div
                    key={pkg.tvName}
                    className={cn(
                      "relative bg-card rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-card-hover",
                      index === 1
                        ? "border-primary shadow-glow lg:scale-105"
                        : "border-border shadow-card"
                    )}
                  >
                    {index === 1 && (
                      <div className="absolute top-0 left-0 right-0 gradient-primary py-2 text-center">
                        <span className="text-sm font-semibold text-primary-foreground">
                          ⭐ Polecany
                        </span>
                      </div>
                    )}

                    <div className={cn("p-8", index === 1 && "pt-14")}>
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-4">{pkg.tvName}</h3>
                        <div className="flex items-center justify-center gap-4 mb-2">
                          <div className="flex items-center gap-1 text-primary">
                            <Tv className="w-4 h-4" />
                            <span className="text-sm font-medium">{pkg.channels} kanałów</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">w tym {pkg.hdChannels} w jakości HD</p>
                      </div>

                      <div className="text-center mb-8">
                        <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                        <span className="text-muted-foreground"> zł brutto</span>
                      </div>

                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-500" />
                          </div>
                          <span className="text-muted-foreground">{category.internet}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-500" />
                          </div>
                          <span className="text-muted-foreground">Telewizja {pkg.tvName}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-500" />
                          </div>
                          <span className="text-muted-foreground">{pkg.channels} kanałów TV</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-500" />
                          </div>
                          <span className="text-muted-foreground">Telewizja JAMBOX</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Single CTA at bottom */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-muted-foreground mb-6">
              Masz pytania? Zadzwoń i zamów pakiet dopasowany do Twoich potrzeb.
            </p>
            <a href="tel:505051376">
              <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
                <Phone className="w-5 h-5 mr-2" />
                Zamów pakiet: 505 051 376
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InternetTV;
