import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Shield } from "lucide-react";

interface AdminSession {
  token: string;
  expiresAt: string;
}

const Admin = () => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedSession = sessionStorage.getItem("adminSession");
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession) as AdminSession;
        if (new Date(parsed.expiresAt) > new Date()) {
          setSession(parsed);
        } else {
          sessionStorage.removeItem("adminSession");
        }
      } catch {
        sessionStorage.removeItem("adminSession");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (token: string, expiresAt: string) => {
    const newSession = { token, expiresAt };
    sessionStorage.setItem("adminSession", JSON.stringify(newSession));
    setSession(newSession);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminSession");
    setSession(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="gradient-hero py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium">
                  Panel Administracyjny
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Zarządzanie <span className="text-gradient">Klientami</span>
              </h1>
              <p className="text-lg text-white/70">
                Przeglądaj klientów, generuj hasła i zarządzaj dostępem do panelu abonenta.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {session ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <AdminLogin onLogin={handleLogin} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
