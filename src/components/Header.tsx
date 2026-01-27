import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo Icon - stylized fiber/signal lines */}
            <div className="relative">
              <svg 
                width="48" 
                height="32" 
                viewBox="0 0 48 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:scale-105"
              >
                {/* Three curved lines representing fiber/signal */}
                <path 
                  d="M4 28C4 28 8 8 24 8C40 8 44 28 44 28" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  fill="none"
                />
                <path 
                  d="M10 28C10 28 14 12 24 12C34 12 38 28 38 28" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  fill="none"
                />
                <path 
                  d="M16 28C16 28 18 16 24 16C30 16 32 28 32 28" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="logoGradient" x1="4" y1="8" x2="44" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="hsl(195, 85%, 45%)" />
                    <stop offset="1" stopColor="hsl(180, 70%, 45%)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-bold text-foreground tracking-tight leading-none">
                RAWI<span className="text-gradient">NET</span>
              </span>
              <span className="text-[9px] lg:text-[10px] text-primary tracking-[0.2em] uppercase font-medium">
                Internet Telewizja
              </span>
            </div>
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
