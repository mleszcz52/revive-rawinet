import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "rawinet-cookie-consent";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing the banner for smoother UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "dismissed");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-2xl shadow-card-hover p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">
                Ta strona używa plików cookies
              </h4>
              <p className="text-sm text-muted-foreground">
                Używamy plików cookies, aby zapewnić najlepszą jakość korzystania z naszej strony. 
                Kontynuując przeglądanie, wyrażasz zgodę na ich użycie.{" "}
                <a 
                  href="/polityka-prywatnosci" 
                  className="text-primary hover:underline"
                >
                  Dowiedz się więcej
                </a>
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button 
                onClick={handleAccept}
                className="gradient-primary text-primary-foreground font-semibold flex-1 sm:flex-none"
              >
                Akceptuję
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
