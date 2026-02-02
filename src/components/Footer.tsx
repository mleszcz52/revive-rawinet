import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import logoRawinet from "@/assets/logo-rawinet.png";
export const Footer = () => {
  return <footer id="kontakt" className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={logoRawinet} alt="Rawinet - Internet Telewizja" className="h-12 w-auto" />
            </Link>
            <p className="text-secondary-foreground/70 max-w-md mb-6">
              Lokalny dostawca internetu światłowodowego i telewizji. 
              Oferujemy szybkie, stabilne łącze i profesjonalne wsparcie techniczne.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/p/Rawi-Net-niezawodny-światłowód-100077080039545/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
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
            <p className="text-sm text-secondary-foreground/60 mb-4 bg-white/5 rounded-lg px-3 py-2">
              📅 pon-pt 8:00 - 16:00
            </p>
            <ul className="space-y-4">
              <li>
              <a href="tel:+48505051376" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>505 051 376 <span className="text-secondary-foreground/50">(Biuro)</span></span>
                </a>
              </li>
              <li>
                <a href="tel:+48605934593" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>605 934 593 <span className="text-secondary-foreground/50">(Dział techniczny)</span></span>
                </a>
              </li>
              <li>
                <a href="mailto:biuro@rawinet.pl" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>biuro@rawinet.pl</span>
                </a>
              </li>
              <li>
                <a href="mailto:dtech@rawinet.pl" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>dtech@rawinet.pl <span className="text-secondary-foreground/50">(Dział techniczny)</span></span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-secondary-foreground/70">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>ul. Mikołajewicza 8B/1<br />63-900 Rawicz</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-10" />

        {/* Company Info & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/50">
          <div className="text-center md:text-left">
            <p className="font-medium text-secondary-foreground/70">Rawi-Net Sp. z o.o.</p>
            <p>NIP: 699-194-79-84 | REGON: 301729188</p>
            <p className="mt-1">© 2026 Rawi-Net. Wszelkie prawa zastrzeżone.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Polityka prywatności</a>
            <a href="#" className="hover:text-primary transition-colors">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>;
};