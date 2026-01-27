import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoRawinet from "@/assets/logo-rawinet.png";

const navItems = [
  { label: "Nowości", href: "/nowosci" },
  { label: "Internet", href: "/internet" },
  { label: "Telewizja", href: "/telewizja" },
  { label: "Internet+Telewizja", href: "/internet-telewizja" },
  { label: "Internet Biznes", href: "/biznes" },
  { label: "Dla Abonenta", href: "/dla-abonenta" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logoRawinet} 
              alt="Rawinet - Internet Telewizja" 
              className="h-14 lg:h-16 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/dla-abonenta">
              <Button variant="outline" className="font-medium">
                Strefa Abonenta
              </Button>
            </Link>
            <Link to="/internet">
              <Button className="gradient-primary text-primary-foreground font-semibold shadow-glow hover:shadow-card-hover transition-all duration-300 hover:scale-105">
                Zamów Internet
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "px-4 py-3 rounded-lg transition-colors font-medium",
                    location.pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-muted"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                <Link to="/dla-abonenta" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full font-medium">
                    Strefa Abonenta
                  </Button>
                </Link>
                <Link to="/internet" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full gradient-primary text-primary-foreground font-semibold">
                    Zamów Internet
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
