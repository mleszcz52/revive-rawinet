import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import logoRawinet from "@/assets/logo-rawinet.png";

export const Footer = () => {
  return (
    <footer id="kontakt" className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logoRawinet} 
                alt="Rawinet - Internet Telewizja" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-secondary-foreground/70 max-w-md mb-6">
              Lokalny dostawca internetu światłowodowego i telewizji. 
              Oferujemy szybkie, stabilne łącze i profesjonalne wsparcie techniczne.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Usługi</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/internet" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Internet
                </Link>
              </li>
              <li>
                <Link to="/telewizja" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Telewizja
                </Link>
              </li>
              <li>
                <Link to="/internet-telewizja" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Internet + TV
                </Link>
              </li>
              <li>
                <Link to="/biznes" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Dla Biznesu
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+48123456789" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+48 123 456 789</span>
                </a>
              </li>
              <li>
                <a href="mailto:kontakt@rawinet.pl" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>kontakt@rawinet.pl</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-secondary-foreground/70">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>ul. Przykładowa 123<br />00-000 Miasto</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-10" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/50">
          <p>© 2025 Rawi-Net. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Polityka prywatności</a>
            <a href="#" className="hover:text-primary transition-colors">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
