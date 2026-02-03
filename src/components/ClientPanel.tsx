import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  FileText, 
  CreditCard, 
  Download, 
  Loader2, 
  LogOut,
  Search,
  Wallet,
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Shield,
  KeyRound
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  post_code?: string;
  street?: string;
  tax_no?: string;
}

interface Invoice {
  id: number;
  number: string;
  issue_date: string;
  payment_to: string;
  status: string;
  price_gross: string;
  price_net: string;
  paid: string;
  currency: string;
  payment_url?: string | null;
}

interface Payment {
  id: number;
  name: string;
  price: string;
  paid_date: string;
  invoice_id?: number;
}

interface Session {
  email: string;
  clientName: string | null;
  sessionToken: string;
  expiresAt: string;
  mustChangePassword: boolean;
}

// Session management
const SESSION_KEY = 'rawinet_client_session';

const saveSession = (session: Session) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

const getSession = (): Session | null => {
  try {
    const data = sessionStorage.getItem(SESSION_KEY);
    if (!data) return null;
    
    const session = JSON.parse(data) as Session;
    
    // Check if session expired
    if (new Date(session.expiresAt) < new Date()) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
};

const clearSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
};

// Password validation
const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Minimum 8 znaków');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Co najmniej 1 wielka litera');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Co najmniej 1 cyfra');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Co najmniej 1 znak specjalny');
  }
  
  return { valid: errors.length === 0, errors };
};

export const ClientPanel = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  
  // Password change state
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Client data
  const [client, setClient] = useState<Client | null>(null);
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState<"info" | "invoices" | "payments">("info");
  const [showAllInvoices, setShowAllInvoices] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const savedSession = getSession();
    if (savedSession) {
      setSession(savedSession);
      setMustChangePassword(savedSession.mustChangePassword);
      // Load client data if session exists and password was changed
      if (!savedSession.mustChangePassword) {
        loadClientDataByEmail(savedSession.email);
      }
    }
  }, []);

  // Filter invoices: show all paid + current unpaid (payment_to within last 60 days)
  const filterRelevantInvoices = (invoicesList: Invoice[]): Invoice[] => {
    const today = new Date();
    const cutoffDate = new Date();
    cutoffDate.setDate(today.getDate() - 60); // 60 dni wstecz

    return invoicesList.filter((invoice) => {
      // Zawsze pokazuj opłacone
      if (invoice.status === 'paid') return true;

      // Dla nieopłaconych - sprawdź termin płatności
      const paymentDate = new Date(invoice.payment_to);
      return paymentDate >= cutoffDate;
    });
  };

  // Get displayed invoices based on filter toggle
  const displayedInvoices = showAllInvoices ? allInvoices : filterRelevantInvoices(allInvoices);
  const hiddenCount = allInvoices.length - filterRelevantInvoices(allInvoices).length;

  // Calculate balance from displayed invoices only
  const calculateBalance = () => {
    let totalDue = 0;
    let totalPaid = 0;
    let unpaidCount = 0;

    displayedInvoices.forEach((invoice) => {
      const gross = parseFloat(invoice.price_gross) || 0;
      const paid = parseFloat(invoice.paid) || 0;
      
      totalPaid += paid;
      
      if (invoice.status !== 'paid') {
        totalDue += gross - paid;
        unpaidCount++;
      }
    });

    return { totalDue, totalPaid, unpaidCount };
  };

  const balance = calculateBalance();

  const loadClientDataByEmail = async (clientEmail: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('fakturownia', {
        body: { action: 'getClientByEmail', email: clientEmail }
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setClient(data[0]);
        await loadInvoices(data[0].id);
        await loadPayments(data[0].id);
      }
    } catch (error) {
      console.error('Error loading client data:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Błąd",
        description: "Wprowadź adres email i hasło",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('fakturownia', {
        body: { 
          action: 'verifyPassword', 
          email,
          password
        }
      });

      if (error) throw error;

      if (data.locked) {
        toast({
          title: "Konto zablokowane",
          description: data.message,
          variant: "destructive",
        });
        return;
      }

      if (!data.valid) {
        toast({
          title: "Błąd logowania",
          description: data.message,
          variant: "destructive",
        });
        return;
      }

      // Login successful
      const newSession: Session = {
        email: email.toLowerCase().trim(),
        clientName: data.clientName,
        sessionToken: data.sessionToken,
        expiresAt: data.expiresAt,
        mustChangePassword: data.mustChangePassword
      };

      saveSession(newSession);
      setSession(newSession);
      setMustChangePassword(data.mustChangePassword);
      setCurrentPassword(password); // Save for password change form

      if (!data.mustChangePassword) {
        // Load client data
        await loadClientDataByEmail(email);
        toast({
          title: "Zalogowano",
          description: "Witamy w panelu klienta",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas logowania. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setPassword(""); // Clear password from memory
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Błąd",
        description: "Wypełnij wszystkie pola",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Błąd",
        description: "Hasła nie są identyczne",
        variant: "destructive",
      });
      return;
    }

    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      toast({
        title: "Hasło nie spełnia wymagań",
        description: validation.errors.join(', '),
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      const { data, error } = await supabase.functions.invoke('fakturownia', {
        body: { 
          action: 'changePassword', 
          email: session?.email,
          password: currentPassword,
          newPassword
        }
      });

      if (error) throw error;

      if (!data.success) {
        toast({
          title: "Błąd",
          description: data.message,
          variant: "destructive",
        });
        return;
      }

      // Update session
      const updatedSession = { ...session!, mustChangePassword: false };
      saveSession(updatedSession);
      setSession(updatedSession);
      setMustChangePassword(false);

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast({
        title: "Hasło zmienione",
        description: "Twoje hasło zostało pomyślnie zmienione",
      });

      // Load client data
      await loadClientDataByEmail(session!.email);
    } catch (error) {
      console.error('Password change error:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas zmiany hasła",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const loadInvoices = async (clientId: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('fakturownia', {
        body: { action: 'getClientInvoices', clientId }
      });

      if (error) throw error;
      setAllInvoices(data || []);
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
  };

  const loadPayments = async (clientId: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('fakturownia', {
        body: { action: 'getClientPayments', clientId }
      });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error loading payments:', error);
    }
  };

  const downloadInvoice = async (invoiceId: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('fakturownia', {
        body: { action: 'getInvoicePdf', invoiceId }
      });

      if (error) throw error;

      if (data?.pdfUrl) {
        window.open(data.pdfUrl, '_blank');
      }
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać faktury",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    clearSession();
    setSession(null);
    setClient(null);
    setAllInvoices([]);
    setPayments([]);
    setEmail("");
    setPassword("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setActiveTab("info");
    setShowAllInvoices(false);
    setMustChangePassword(false);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      paid: { label: "Opłacona", className: "bg-green-500/10 text-green-600" },
      issued: { label: "Wystawiona", className: "bg-yellow-500/10 text-yellow-600" },
      sent: { label: "Wysłana", className: "bg-blue-500/10 text-blue-600" },
      partial: { label: "Częściowo", className: "bg-orange-500/10 text-orange-600" },
    };
    const { label, className } = statusMap[status] || { label: status, className: "bg-muted text-muted-foreground" };
    return <span className={cn("px-2 py-1 rounded-full text-xs font-medium", className)}>{label}</span>;
  };

  const passwordValidation = validatePassword(newPassword);

  // Password change form (shown after first login with generated password)
  if (session && mustChangePassword) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Zmień hasło</h2>
            <p className="text-muted-foreground mt-2">
              Dla bezpieczeństwa Twoich danych, zmień tymczasowe hasło na własne
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div className="text-sm text-amber-700">
                <p className="font-medium">Wymagana zmiana hasła</p>
                <p className="text-amber-600 mt-1">
                  Musisz zmienić hasło aby uzyskać dostęp do panelu klienta.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="newPassword">Nowe hasło</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Wprowadź nowe hasło"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password requirements */}
              <div className="mt-2 space-y-1">
                {['Minimum 8 znaków', 'Co najmniej 1 wielka litera', 'Co najmniej 1 cyfra', 'Co najmniej 1 znak specjalny'].map((req, i) => {
                  const checks = [
                    newPassword.length >= 8,
                    /[A-Z]/.test(newPassword),
                    /[0-9]/.test(newPassword),
                    /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                  ];
                  const met = checks[i];
                  return (
                    <div key={req} className={cn("flex items-center gap-2 text-xs", met ? "text-green-600" : "text-muted-foreground")}>
                      <CheckCircle className={cn("w-3 h-3", met ? "opacity-100" : "opacity-30")} />
                      {req}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Powtórz nowe hasło"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Hasła nie są identyczne</p>
              )}
            </div>

            <Button 
              onClick={handlePasswordChange} 
              disabled={isChangingPassword || !passwordValidation.valid || newPassword !== confirmPassword}
              className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow"
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Zmieniam hasło...
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 mr-2" />
                  Zmień hasło
                </>
              )}
            </Button>

            <Button 
              variant="ghost" 
              onClick={logout}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Wyloguj
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Login form
  if (!session) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Panel Klienta</h2>
            <p className="text-muted-foreground mt-2">
              Wprowadź swój adres email i hasło, aby uzyskać dostęp do konta
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Adres email</Label>
              <Input
                id="email"
                type="email"
                placeholder="twoj@email.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && document.getElementById('password')?.focus()}
              />
            </div>

            <div>
              <Label htmlFor="password">Hasło</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Wprowadź hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              onClick={handleLogin} 
              disabled={isLoading}
              className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logowanie...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Zaloguj się
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 justify-center mt-6 text-xs text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Połączenie szyfrowane SSL</span>
          </div>
        </div>
      </div>
    );
  }

  // Client panel
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{client?.name || session.clientName || 'Klient'}</h2>
          <p className="text-muted-foreground">{client?.email || session.email}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Wyloguj
        </Button>
      </div>

      {/* Balance Summary Card */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className={cn(
          "p-5 rounded-xl border",
          balance.totalDue > 0 
            ? "bg-red-500/10 border-red-500/30" 
            : "bg-green-500/10 border-green-500/30"
        )}>
          <div className="flex items-center gap-3 mb-2">
            {balance.totalDue > 0 ? (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <span className="text-sm font-medium text-muted-foreground">Do zapłaty</span>
          </div>
          <p className={cn(
            "text-2xl font-bold",
            balance.totalDue > 0 ? "text-red-600" : "text-green-600"
          )}>
            {balance.totalDue.toFixed(2)} PLN
          </p>
          {balance.unpaidCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {balance.unpaidCount} {balance.unpaidCount === 1 ? 'nieopłacona faktura' : 'nieopłacone faktury'}
            </p>
          )}
        </div>

        <div className="p-5 rounded-xl border bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Suma opłacona</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {balance.totalPaid.toFixed(2)} PLN
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Z {displayedInvoices.length} {displayedInvoices.length === 1 ? 'faktury' : 'faktur'}
          </p>
        </div>

        <div className="p-5 rounded-xl border bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Faktury</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {displayedInvoices.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {displayedInvoices.filter(i => i.status === 'paid').length} opłaconych
            {hiddenCount > 0 && !showAllInvoices && ` • ${hiddenCount} ukrytych`}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === "info" ? "default" : "outline"}
          onClick={() => setActiveTab("info")}
          className={activeTab === "info" ? "gradient-primary text-primary-foreground" : ""}
        >
          <User className="w-4 h-4 mr-2" />
          Dane konta
        </Button>
        <Button
          variant={activeTab === "invoices" ? "default" : "outline"}
          onClick={() => setActiveTab("invoices")}
          className={activeTab === "invoices" ? "gradient-primary text-primary-foreground" : ""}
        >
          <FileText className="w-4 h-4 mr-2" />
          Faktury ({displayedInvoices.length})
        </Button>
        <Button
          variant={activeTab === "payments" ? "default" : "outline"}
          onClick={() => setActiveTab("payments")}
          className={activeTab === "payments" ? "gradient-primary text-primary-foreground" : ""}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Płatności ({payments.length})
        </Button>
      </div>

      {/* Tab Content */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        {activeTab === "info" && client && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-muted-foreground">Nazwa / Imię i nazwisko</Label>
              <p className="text-lg font-medium text-foreground">{client.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="text-lg font-medium text-foreground">{client.email}</p>
            </div>
            {client.phone && (
              <div>
                <Label className="text-muted-foreground">Telefon</Label>
                <p className="text-lg font-medium text-foreground">{client.phone}</p>
              </div>
            )}
            {client.tax_no && (
              <div>
                <Label className="text-muted-foreground">NIP</Label>
                <p className="text-lg font-medium text-foreground">{client.tax_no}</p>
              </div>
            )}
            {(client.street || client.city) && (
              <div className="md:col-span-2">
                <Label className="text-muted-foreground">Adres</Label>
                <p className="text-lg font-medium text-foreground">
                  {client.street}{client.street && client.city && ", "}
                  {client.post_code} {client.city}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "info" && !client && (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-muted-foreground mt-2">Ładowanie danych...</p>
          </div>
        )}

        {activeTab === "invoices" && (
          <div>
            {displayedInvoices.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Brak faktur</p>
            ) : (
              <div className="space-y-4">
                {displayedInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="p-4 bg-muted/30 rounded-xl border border-border/50"
                  >
                    {/* Mobile-first: stack vertically, then row on larger screens */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Invoice info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{invoice.number}</span>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="block sm:inline">Wystawiona: {invoice.issue_date}</span>
                          <span className="hidden sm:inline"> • </span>
                          <span className="block sm:inline">Termin: {invoice.payment_to}</span>
                        </div>
                      </div>

                      {/* Price and actions row on mobile */}
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-foreground">{invoice.price_gross} {invoice.currency}</p>
                          <p className="text-sm text-muted-foreground">netto: {invoice.price_net} {invoice.currency}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {invoice.status !== 'paid' && invoice.payment_url && (
                            <Button
                              size="sm"
                              className="gradient-primary text-primary-foreground"
                              onClick={() => window.open(invoice.payment_url!, '_blank')}
                            >
                              <CreditCard className="w-4 h-4 sm:mr-1" />
                              <span className="hidden sm:inline">Zapłać</span>
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadInvoice(invoice.id)}
                          >
                            <Download className="w-4 h-4 sm:mr-1" />
                            <span className="hidden sm:inline">PDF</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Toggle to show/hide old invoices */}
                {hiddenCount > 0 && (
                  <div className="text-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllInvoices(!showAllInvoices)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {showAllInvoices 
                        ? "Ukryj stare faktury" 
                        : `Pokaż ${hiddenCount} ukrytych faktur historycznych`
                      }
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            {payments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Brak płatności</p>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{payment.name}</p>
                      <p className="text-sm text-muted-foreground">Data: {payment.paid_date}</p>
                    </div>
                    <p className="font-bold text-green-600">+{payment.price} PLN</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
