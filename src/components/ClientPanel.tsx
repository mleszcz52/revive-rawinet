import { useState } from "react";
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
  ExternalLink,
  Wallet,
  AlertTriangle,
  CheckCircle
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
}

interface Payment {
  id: number;
  name: string;
  price: string;
  paid_date: string;
  invoice_id?: number;
}

export const ClientPanel = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState<"info" | "invoices" | "payments">("info");

  // Calculate balance from invoices
  const calculateBalance = () => {
    let totalDue = 0;
    let totalPaid = 0;
    let unpaidCount = 0;

    invoices.forEach((invoice) => {
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

  const searchClient = async () => {
    if (!email) {
      toast({
        title: "Błąd",
        description: "Wprowadź adres email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('fakturownia', {
        body: { action: 'getClientByEmail', email }
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setClient(data[0]);
        toast({
          title: "Sukces",
          description: "Znaleziono konto klienta",
        });
        // Load invoices automatically
        await loadInvoices(data[0].id);
        await loadPayments(data[0].id);
      } else {
        toast({
          title: "Nie znaleziono",
          description: "Nie znaleziono klienta o podanym adresie email",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error searching client:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadInvoices = async (clientId: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('fakturownia', {
        body: { action: 'getClientInvoices', clientId }
      });

      if (error) throw error;
      setInvoices(data || []);
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
    setClient(null);
    setInvoices([]);
    setPayments([]);
    setEmail("");
    setActiveTab("info");
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

  // Login form
  if (!client) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Panel Klienta</h2>
            <p className="text-muted-foreground mt-2">
              Wprowadź swój adres email, aby uzyskać dostęp do konta
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
                onKeyDown={(e) => e.key === "Enter" && searchClient()}
              />
            </div>

            <Button 
              onClick={searchClient} 
              disabled={isLoading}
              className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Wyszukiwanie...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Zaloguj się
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Dane pobierane są z systemu Fakturownia
          </p>
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
          <h2 className="text-2xl font-bold text-foreground">{client.name}</h2>
          <p className="text-muted-foreground">{client.email}</p>
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
            Z {invoices.length} {invoices.length === 1 ? 'faktury' : 'faktur'}
          </p>
        </div>

        <div className="p-5 rounded-xl border bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Faktury</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {invoices.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {invoices.filter(i => i.status === 'paid').length} opłaconych
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
          Faktury ({invoices.length})
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
        {activeTab === "info" && (
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

        {activeTab === "invoices" && (
          <div>
            {invoices.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Brak faktur</p>
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-foreground">{invoice.number}</span>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Wystawiona: {invoice.issue_date} • Termin: {invoice.payment_to}
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <p className="font-bold text-foreground">{invoice.price_gross} {invoice.currency}</p>
                      <p className="text-sm text-muted-foreground">netto: {invoice.price_net} {invoice.currency}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadInvoice(invoice.id)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                ))}
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
