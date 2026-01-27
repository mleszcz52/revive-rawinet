import { useState } from "react";
import { Menu, X, Wifi, Tv, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Internet", href: "#internet", icon: Wifi },
  { label: "Telewizja", href: "#telewizja", icon: Tv },
  { label: "Dla Abonenta", href: "#abonent", icon: Users },
  { label: "Kontakt", href: "#kontakt", icon: Phone },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Wifi className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground tracking-tight">
                RAWI<span className="text-gradient">NET</span>
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase -mt-1">
                Internet & Telewizja
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button className="gradient-primary text-primary-foreground font-semibold px-6 shadow-glow hover:shadow-card-hover transition-all duration-300 hover:scale-105">
              Zamów Internet
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  {item.label}
                </a>
              ))}
              <Button className="mt-4 gradient-primary text-primary-foreground font-semibold">
                Zamów Internet
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
