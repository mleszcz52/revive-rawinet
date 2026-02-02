import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClientPanel } from "@/components/ClientPanel";
import { SpeedTestSection } from "@/components/SpeedTestSection";
import { HelpCircle, Phone, Mail } from "lucide-react";

const faqItems = [
  {
    question: "Jak mogę sprawdzić stan mojego konta?",
    answer: "Zaloguj się do panelu klienta powyżej, używając adresu email przypisanego do Twojego konta w systemie Fakturownia.",
  },
  {
    question: "Jak zmienić pakiet internetowy?",
    answer: "Aby zmienić pakiet, skontaktuj się z naszym biurem obsługi klienta telefonicznie lub mailowo.",
  },
  {
    question: "Co zrobić w przypadku awarii?",
    answer: "W przypadku awarii skontaktuj się z nami telefonicznie pod numer 505 051 376 lub 605 934 593.",
  },
  {
    question: "Jak skonfigurować router?",
    answer: "Instrukcje konfiguracji routera znajdziesz w dokumentacji dołączonej do urządzenia. W razie problemów zadzwoń do nas.",
  },
];

const Subscriber = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                Strefa Abonenta
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Dla <span className="text-gradient">Abonenta</span>
              </h1>
              <p className="text-lg text-white/70">
                Zarządzaj swoim kontem, przeglądaj faktury i sprawdzaj płatności.
              </p>
            </div>
          </div>
        </section>

        {/* Client Panel - at the top */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <ClientPanel />
          </div>
        </section>

        {/* Speed Test Section */}
        <SpeedTestSection />

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <HelpCircle className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Często zadawane pytania
                </h2>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl border border-border p-6"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Potrzebujesz pomocy?
              </h2>
              <p className="text-muted-foreground">
                Nasz zespół jest gotowy, aby Ci pomóc. Skontaktuj się z nami.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <a
                href="tel:505051376"
                className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all"
              >
                <Phone className="w-8 h-8 text-primary mb-3" />
                <span className="font-semibold text-foreground">Biuro</span>
                <span className="text-sm text-muted-foreground">505 051 376</span>
                <span className="text-xs text-muted-foreground/70">pon-pt</span>
              </a>
              <a
                href="tel:605934593"
                className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all"
              >
                <Phone className="w-8 h-8 text-primary mb-3" />
                <span className="font-semibold text-foreground">Dział techniczny</span>
                <span className="text-sm text-muted-foreground">605 934 593</span>
              </a>
              <a
                href="mailto:biuro@rawinet.pl"
                className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all"
              >
                <Mail className="w-8 h-8 text-primary mb-3" />
                <span className="font-semibold text-foreground">Email</span>
                <span className="text-sm text-muted-foreground">biuro@rawinet.pl</span>
              </a>
              <a
                href="mailto:dtech@rawinet.pl"
                className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all"
              >
                <Mail className="w-8 h-8 text-primary mb-3" />
                <span className="font-semibold text-foreground">Dział techniczny</span>
                <span className="text-sm text-muted-foreground">dtech@rawinet.pl</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Subscriber;
