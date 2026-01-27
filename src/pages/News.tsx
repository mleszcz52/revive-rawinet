import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "Wolność wyboru – Ty decydujesz, jak chcesz korzystać z internetu!",
    excerpt: "Od teraz to Ty decydujesz, z jakiego urządzenia chcesz korzystać, dopasowując rozwiązanie idealnie do swoich potrzeb i możliwości.",
    date: "2025-05-15",
    image: "https://rawinet.pl/wp-content/uploads/2025/05/ax12.jpg",
    category: "Nowości",
  },
  {
    id: 2,
    title: "Nowe pakiety telewizyjne już dostępne",
    excerpt: "Wprowadziliśmy nowe pakiety telewizyjne z jeszcze większą liczbą kanałów HD i 4K. Sprawdź naszą ofertę!",
    date: "2025-04-20",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
    category: "Telewizja",
  },
  {
    id: 3,
    title: "Rozbudowa sieci światłowodowej",
    excerpt: "Kontynuujemy rozbudowę naszej sieci światłowodowej. Nowe lokalizacje już wkrótce!",
    date: "2025-03-10",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
    category: "Infrastruktura",
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                Aktualności
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Nowości <span className="text-gradient">Rawi-Net</span>
              </h1>
              <p className="text-lg text-white/70">
                Bądź na bieżąco z najnowszymi informacjami o naszych usługach i promocjach.
              </p>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item, index) => (
                <article
                  key={item.id}
                  className="group bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.date).toLocaleDateString("pl-PL")}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group/btn">
                      Czytaj więcej
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
