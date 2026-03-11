import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClientPanel } from "@/components/ClientPanel";
import { SpeedTestSection } from "@/components/SpeedTestSection";
import { HelpCircle, Phone, Mail, Shield, Smartphone, KeyRound } from "lucide-react";
import { DarkVeil } from "@/components/DarkVeil";

const faqItems = [
  {
    question: "Jak mogę sprawdzić stan mojego konta?",
    answer: "Zaloguj się do panelu klienta powyżej, używając adresu email podanego podczas podpisywania umowy.",
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
    answer:
      "Instrukcje konfiguracji routera znajdziesz w dokumentacji dołączonej do urządzenia. W razie problemów zadzwoń do nas.",
  },
];

const Subscriber = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-20 relative overflow-hidden">
          <DarkVeil speed={0.3} resolutionScale={0.75} />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                Strefa Abonenta
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Dla <span className="text-gradient">Abonenta</span>
              </h1>
              <p className="text-lg text-white/70">Zarządzaj swoim kontem, przeglądaj faktury i sprawdzaj płatności.</p>
            </div>
          </div>
        </section>

        {/* Client Panel */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <ClientPanel />
          </div>
        </section>

        {/* Two-Step Verification Info */}
        <section className="py-12 lg:py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Dwustopniowa weryfikacja</h2>
              </div>
              <p className="text-muted-foreground mb-8">
                Twoje konto jest chronione dwustopniową weryfikacją. Oto jak działa proces logowania:
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl border border-border p-6 relative">
                  <div className="absolute -top-3 left-4 w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-glow">1</div>
                  <KeyRound className="w-8 h-8 text-primary mb-3 mt-2" />
                  <h3 className="font-semibold text-foreground mb-2">Pierwsze logowanie</h3>
                  <p className="text-sm text-muted-foreground">
                    Podaj adres e-mail z umowy. Otrzymasz automatycznie wygenerowane hasło tymczasowe na swoją skrzynkę.
                  </p>
                </div>
                <div className="bg-card rounded-xl border border-border p-6 relative">
                  <div className="absolute -top-3 left-4 w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-glow">2</div>
                  <Smartphone className="w-8 h-8 text-primary mb-3 mt-2" />
                  <h3 className="font-semibold text-foreground mb-2">Weryfikacja urządzenia</h3>
                  <p className="text-sm text-muted-foreground">
                    Przy logowaniu z nowego urządzenia otrzymasz 6-cyfrowy kod weryfikacyjny na e-mail. Wpisz go, aby potwierdzić swoją tożsamość.
                  </p>
                </div>
                <div className="bg-card rounded-xl border border-border p-6 relative">
                  <div className="absolute -top-3 left-4 w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-glow">3</div>
                  <Shield className="w-8 h-8 text-primary mb-3 mt-2" />
                  <h3 className="font-semibold text-foreground mb-2">Bezpieczny dostęp</h3>
                  <p className="text-sm text-muted-foreground">
                    Zaufane urządzenia są zapamiętywane — kolejne logowania z tego samego urządzenia nie wymagają kodu OTP.
                  </p>
                </div>
              </div>
            </div>
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
                <h2 className="text-3xl font-bold text-foreground mb-4">Często zadawane pytania</h2>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.question}</h3>
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Potrzebujesz pomocy?</h2>
              <p className="text-muted-foreground">Nasz zespół jest gotowy, aby Ci pomóc. Skontaktuj się z nami.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <a
                href="tel:505051376"
                className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all"
              >
                <Phone className="w-8 h-8 text-primary mb-3" />
                <span className="font-semibold text-foreground">Biuro</span>
                <span className="text-sm text-muted-foreground">505 051 376</span>
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Subscriber;
