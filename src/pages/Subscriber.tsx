import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { User, FileText, CreditCard, Settings, HelpCircle, Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const subscriberOptions = [
  {
    icon: User,
    title: "Moje Konto",
    description: "Zarządzaj swoimi danymi osobowymi i preferencjami.",
    action: "Zaloguj się",
  },
  {
    icon: FileText,
    title: "Faktury",
    description: "Przeglądaj i pobieraj swoje faktury.",
    action: "Zobacz faktury",
  },
  {
    icon: CreditCard,
    title: "Płatności",
    description: "Sprawdź saldo i historię płatności.",
    action: "Sprawdź płatności",
  },
  {
    icon: Settings,
    title: "Ustawienia usług",
    description: "Zmień pakiet lub dodaj dodatkowe usługi.",
    action: "Zarządzaj usługami",
  },
];

const faqItems = [
  {
    question: "Jak mogę sprawdzić stan mojego konta?",
    answer: "Zaloguj się do panelu abonenta, gdzie znajdziesz wszystkie informacje o swoim koncie, fakturach i płatnościach.",
  },
  {
    question: "Jak zmienić pakiet internetowy?",
    answer: "Możesz zmienić pakiet przez panel abonenta lub kontaktując się z naszym biurem obsługi klienta.",
  },
  {
    question: "Co zrobić w przypadku awarii?",
    answer: "W przypadku awarii skontaktuj się z nami telefonicznie pod numer +48 123 456 789 lub zgłoś problem przez panel abonenta.",
  },
  {
    question: "Jak skonfigurować router?",
    answer: "Instrukcje konfiguracji routera znajdziesz w dokumentacji dołączonej do urządzenia lub na naszej stronie w sekcji pomocy.",
  },
];

const Subscriber = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
                Strefa Abonenta
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Dla <span className="text-gradient">Abonenta</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Zarządzaj swoim kontem, przeglądaj faktury i uzyskaj pomoc techniczną.
              </p>
              <Button size="lg" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
                Zaloguj się do panelu
              </Button>
            </div>
          </div>
        </section>

        {/* Subscriber Options */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {subscriberOptions.map((option) => (
                <div
                  key={option.title}
                  className="group p-6 bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform">
                    <option.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{option.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                    {option.action} →
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                href="tel:+48123456789"
                className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all"
              >
                <Phone className="w-8 h-8 text-primary mb-3" />
                <span className="font-semibold text-foreground">Telefon</span>
                <span className="text-sm text-muted-foreground">+48 123 456 789</span>
              </a>
              <a
                href="mailto:pomoc@rawinet.pl"
                className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all"
              >
                <Mail className="w-8 h-8 text-primary mb-3" />
                <span className="font-semibold text-foreground">Email</span>
                <span className="text-sm text-muted-foreground">pomoc@rawinet.pl</span>
              </a>
              <div className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all cursor-pointer">
                <MessageSquare className="w-8 h-8 text-primary mb-3" />
                <span className="font-semibold text-foreground">Czat</span>
                <span className="text-sm text-muted-foreground">Napisz do nas</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Subscriber;
