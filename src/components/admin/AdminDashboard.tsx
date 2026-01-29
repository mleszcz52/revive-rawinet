import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Key,
  History,
  LogOut,
  Search,
  RefreshCw,
  Copy,
  Unlock,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Eye,
  FileText,
  Download,
  EyeOff,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminDashboardProps {
  onLogout: () => void;
}

interface FakturowniaClient {
  id: number;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  hasCredentials: boolean;
  credentialStatus?: {
    must_change_password: boolean;
    failed_attempts: number;
    locked_until: string | null;
    last_login: string | null;
  } | null;
}

interface ClientCredential {
  id: string;
  email: string;
  client_name: string | null;
  must_change_password: boolean;
  failed_attempts: number;
  locked_until: string | null;
  last_login: string | null;
  created_at: string;
  temp_password?: string | null;
}

interface LoginAttempt {
  id: string;
  email: string;
  success: boolean;
  ip_address: string | null;
  user_agent: string | null;
  attempted_at: string;
}

interface Invoice {
  id: number;
  number: string;
  issue_date: string;
  payment_to: string;
  price_gross: string;
  status: string;
  paid: string;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [clients, setClients] = useState<FakturowniaClient[]>([]);
  const [credentials, setCredentials] = useState<ClientCredential[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginAttempt[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [generatingPassword, setGeneratingPassword] = useState<string | null>(null);
  const [unlockingAccount, setUnlockingAccount] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<FakturowniaClient | null>(null);
  const [clientInvoices, setClientInvoices] = useState<Invoice[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordClient, setPasswordClient] = useState<{ email: string; name: string } | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [loadingTempPassword, setLoadingTempPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [clientsRes, credentialsRes, historyRes] = await Promise.all([
        supabase.functions.invoke("fakturownia", {
          body: { action: "getAllClients" },
        }),
        supabase.functions.invoke("fakturownia", {
          body: { action: "getClientCredentialsList" },
        }),
        supabase.functions.invoke("fakturownia", {
          body: { action: "getLoginHistory" },
        }),
      ]);

      if (clientsRes.data) setClients(clientsRes.data);
      if (credentialsRes.data) setCredentials(credentialsRes.data);
      if (historyRes.data) setLoginHistory(historyRes.data);
    } catch (err) {
      console.error("Error loading data:", err);
      toast.error("Błąd podczas ładowania danych");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePassword = async (email: string, clientName: string) => {
    setGeneratingPassword(email);
    try {
      const { data, error } = await supabase.functions.invoke("fakturownia", {
        body: {
          action: "setClientPassword",
          email,
          clientName,
        },
      });

      if (error) throw error;

      if (data.success) {
        toast.success(
          <div className="space-y-2">
            <p className="font-semibold">Hasło wygenerowane!</p>
            <div className="flex items-center gap-2 bg-muted p-2 rounded">
              <code className="text-sm font-mono">{data.generatedPassword}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(data.generatedPassword);
                  toast.success("Skopiowano do schowka");
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Przekaż to hasło klientowi bezpiecznie (telefonicznie)
            </p>
          </div>,
          { duration: 30000 }
        );
        loadData();
      }
    } catch (err) {
      console.error("Error generating password:", err);
      toast.error("Błąd podczas generowania hasła");
    } finally {
      setGeneratingPassword(null);
    }
  };

  const viewClientDetails = async (client: FakturowniaClient) => {
    setSelectedClient(client);
    setLoadingInvoices(true);
    try {
      const { data, error } = await supabase.functions.invoke("fakturownia", {
        body: {
          action: "getClientInvoicesAdmin",
          email: client.email,
        },
      });

      if (error) throw error;
      setClientInvoices(data?.invoices || []);
    } catch (err) {
      console.error("Error loading invoices:", err);
      toast.error("Błąd podczas ładowania faktur");
    } finally {
      setLoadingInvoices(false);
    }
  };

  const viewTempPassword = async (email: string, name: string) => {
    setPasswordClient({ email, name });
    setShowPasswordDialog(true);
    setLoadingTempPassword(true);
    setTempPassword(null);
    setShowPassword(false);

    try {
      const { data, error } = await supabase.functions.invoke("fakturownia", {
        body: {
          action: "getClientTempPassword",
          email,
        },
      });

      if (error) throw error;
      setTempPassword(data?.tempPassword || null);
    } catch (err) {
      console.error("Error loading temp password:", err);
      toast.error("Błąd podczas ładowania hasła");
    } finally {
      setLoadingTempPassword(false);
    }
  };

  const unlockAccount = async (email: string) => {
    setUnlockingAccount(email);
    try {
      const { data, error } = await supabase.functions.invoke("fakturownia", {
        body: {
          action: "unlockAccount",
          email,
        },
      });

      if (error) throw error;

      if (data.success) {
        toast.success("Konto odblokowane");
        loadData();
      }
    } catch (err) {
      console.error("Error unlocking account:", err);
      toast.error("Błąd podczas odblokowywania konta");
    } finally {
      setUnlockingAccount(null);
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCredentials = credentials.filter(
    (c) =>
      c.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHistory = loginHistory.filter((h) =>
    h.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("pl-PL");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Szukaj klienta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Odśwież
          </Button>
          <Button variant="destructive" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Wyloguj
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Klienci</span>
          </TabsTrigger>
          <TabsTrigger value="credentials" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">Konta</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Historia</span>
          </TabsTrigger>
        </TabsList>

        {/* Clients from Fakturownia */}
        <TabsContent value="clients" className="mt-6">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nazwa</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Miasto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Brak klientów do wyświetlenia
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone || "—"}</TableCell>
                      <TableCell>{client.city || "—"}</TableCell>
                      <TableCell>
                        {client.hasCredentials ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Ma dostęp
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                            Brak konta
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => viewClientDetails(client)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Podgląd
                        </Button>
                        {client.hasCredentials && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => viewTempPassword(client.email, client.name)}
                          >
                            <Key className="w-4 h-4 mr-1" />
                            Hasło
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant={client.hasCredentials ? "outline" : "default"}
                          onClick={() => generatePassword(client.email, client.name)}
                          disabled={generatingPassword === client.email}
                        >
                          {generatingPassword === client.email ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Key className="w-4 h-4 mr-1" />
                              {client.hasCredentials ? "Resetuj" : "Generuj"}
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Credentials */}
        <TabsContent value="credentials" className="mt-6">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nazwa</TableHead>
                  <TableHead>Status hasła</TableHead>
                  <TableHead>Blokada</TableHead>
                  <TableHead>Ostatnie logowanie</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCredentials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Brak kont do wyświetlenia
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCredentials.map((cred) => {
                    const isLocked =
                      cred.locked_until && new Date(cred.locked_until) > new Date();
                    return (
                      <TableRow key={cred.id}>
                        <TableCell className="font-medium">{cred.email}</TableCell>
                        <TableCell>{cred.client_name || "—"}</TableCell>
                        <TableCell>
                          {cred.must_change_password ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium">
                              <Clock className="w-3 h-3" />
                              Wymaga zmiany
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                              <CheckCircle className="w-3 h-3" />
                              Aktywne
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {isLocked ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                              <XCircle className="w-3 h-3" />
                              Zablokowane
                            </span>
                          ) : cred.failed_attempts > 0 ? (
                            <span className="text-xs text-muted-foreground">
                              {cred.failed_attempts}/5 prób
                            </span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(cred.last_login)}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {isLocked && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => unlockAccount(cred.email)}
                              disabled={unlockingAccount === cred.email}
                            >
                              {unlockingAccount === cred.email ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <Unlock className="w-4 h-4 mr-1" />
                                  Odblokuj
                                </>
                              )}
                            </Button>
                          )}
                          {cred.must_change_password && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => viewTempPassword(cred.email, cred.client_name || "")}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Hasło
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => generatePassword(cred.email, cred.client_name || "")}
                            disabled={generatingPassword === cred.email}
                          >
                            {generatingPassword === cred.email ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <Key className="w-4 h-4 mr-1" />
                                Reset
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Login History */}
        <TabsContent value="history" className="mt-6">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Brak historii logowań
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistory.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(attempt.attempted_at)}
                      </TableCell>
                      <TableCell className="font-medium">{attempt.email}</TableCell>
                      <TableCell>
                        {attempt.success ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Sukces
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                            <XCircle className="w-3 h-3" />
                            Niepowodzenie
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {attempt.ip_address || "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Client Details Dialog (Invoices) */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Faktury klienta: {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Email: {selectedClient?.email}
            </div>

            {loadingInvoices ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : clientInvoices.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Brak faktur dla tego klienta
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Numer</TableHead>
                    <TableHead>Data wystawienia</TableHead>
                    <TableHead>Termin płatności</TableHead>
                    <TableHead>Kwota brutto</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientInvoices.map((invoice) => {
                    const isPaid = invoice.status === "paid" || invoice.paid === invoice.price_gross;
                    return (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.number}</TableCell>
                        <TableCell>{invoice.issue_date}</TableCell>
                        <TableCell>{invoice.payment_to}</TableCell>
                        <TableCell>{parseFloat(invoice.price_gross).toFixed(2)} zł</TableCell>
                        <TableCell>
                          {isPaid ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                              <CheckCircle className="w-3 h-3" />
                              Opłacona
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium">
                              <Clock className="w-3 h-3" />
                              Nieopłacona
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Password View Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Hasło tymczasowe
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Klient: {passwordClient?.name || passwordClient?.email}
            </div>

            {loadingTempPassword ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : tempPassword ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                  <code className="flex-1 text-lg font-mono">
                    {showPassword ? tempPassword : "••••••••••••"}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(tempPassword);
                      toast.success("Skopiowano do schowka");
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  To hasło tymczasowe będzie widoczne tylko do momentu, gdy klient je zmieni.
                </p>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p>Brak hasła tymczasowego.</p>
                <p className="text-xs mt-1">Klient już zmienił hasło lub nie wygenerowano jeszcze dostępu.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
