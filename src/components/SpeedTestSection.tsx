import { Gauge, Wifi, Cable, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SpeedTestSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Gauge className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Sprawdź prędkość internetu
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dowiedz się, jakich realnych prędkości możesz oczekiwać i jak prawidłowo zmierzyć swoje łącze.
            </p>
          </div>

          {/* Speed Test Embed */}
          <div className="bg-card rounded-xl border border-border p-6 mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
              Test prędkości OpenSpeedTest
            </h3>
            <div className="w-full mx-auto rounded-lg overflow-hidden" style={{ height: '550px' }}>
              <iframe
                src="https://openspeedtest.com/speedtest"
                className="w-full h-full border-0"
                title="Test prędkości internetu OpenSpeedTest"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Kliknij START, aby rozpocząć test prędkości internetu
            </p>
          </div>

          {/* Why lower speed section */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Dlaczego realna prędkość jest zazwyczaj niższa od obiecanej?
            </h3>
            <p className="text-muted-foreground mb-4">
              Różnica między prędkością „pakietową" a „realną" wynika z kilku czynników:
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Jakość Sprzętu</h4>
                  <p className="text-sm text-muted-foreground">
                    Twój router, karta sieciowa i nawet przewody mogą stanowić „wąskie gardło". Starszy sprzęt może nie obsługiwać pełnej prędkości gigabitowej.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Łączność Wi-Fi</h4>
                  <p className="text-sm text-muted-foreground">
                    Korzystanie z sieci Wi-Fi (zamiast kabla Ethernet) zawsze powoduje stratę prędkości. Zasięg, przeszkody i standard Wi-Fi mają tu kluczowe znaczenie.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Serwery, z Których Pobierasz</h4>
                  <p className="text-sm text-muted-foreground">
                    Jeśli serwer, z którego pobierasz plik, jest wolny lub przeciążony, Twój super szybki internet i tak nie pomoże.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ethernet speeds */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cable className="w-5 h-5 text-primary" />
              Połączenie kablowe (Ethernet)
            </h3>
            <p className="text-muted-foreground mb-4">
              To jedyny miarodajny sposób testowania łącza gigabitowego. Przy łączu 1 Gb/s (1000 Mb/s) wyniki równo 1000 Mb/s są technicznie niemożliwe do osiągnięcia w domowych warunkach.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-foreground">Realny wynik idealny</span>
                </div>
                <p className="text-2xl font-bold text-green-500">930 – 945 Mb/s</p>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Wynik bardzo dobry</span>
                </div>
                <p className="text-2xl font-bold text-primary">ok. 900 Mb/s</p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Uwaga na wynik ~94 Mb/s</p>
                  <p className="text-sm text-muted-foreground">
                    Jeśli Twój test zatrzymuje się w okolicach 90-95 Mb/s, oznacza to zazwyczaj uszkodzony kabel (lub kabel kategorii 5 zamiast 5e/6) albo kartę sieciową, która przełączyła się w tryb „Fast Ethernet" (100 Mb/s) zamiast „Gigabit".
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WiFi speeds */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Wifi className="w-5 h-5 text-primary" />
              Połączenie przez Wi-Fi
            </h3>
            <p className="text-muted-foreground mb-4">
              Wyniki przez Wi-Fi są niższe i zależą od standardu routera oraz urządzenia, na którym robisz test.
            </p>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Standard Wi-Fi</TableHead>
                    <TableHead>Blisko routera</TableHead>
                    <TableHead>Przez ścianę</TableHead>
                    <TableHead className="hidden sm:table-cell">Komentarz</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Wi-Fi 5 (AC)</TableCell>
                    <TableCell>350 – 550 Mb/s</TableCell>
                    <TableCell>150 – 300 Mb/s</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      Najpopularniejszy standard w starszych routerach
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Wi-Fi 6 (AX)</TableCell>
                    <TableCell>600 – 900 Mb/s</TableCell>
                    <TableCell>300 – 500 Mb/s</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      Wymaga nowoczesnego sprzętu z obsługą Wi-Fi 6
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Wi-Fi 7 (BE)</TableCell>
                    <TableCell>900 – 940 Mb/s</TableCell>
                    <TableCell>500+ Mb/s</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      Najnowszy standard, pełne wykorzystanie 1 Gb/s
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Ważne:</strong> Operator gwarantuje prędkość „do" routera. To, co dzieje się po Wi-Fi (zakłócenia, grube ściany), jest poza odpowiedzialnością operatora.
              </p>
            </div>
          </div>

          {/* How to measure speed */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Jak prawidłowo zmierzyć prędkość internetu?
            </h3>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Połączenie kablem</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Zawsze, jeśli to możliwe, podłącz komputer bezpośrednio do routera za pomocą <strong>kabla Ethernet</strong>. Eliminuje to zmienne i straty wynikające z Wi-Fi. Jeśli test na kablu wyjdzie dobrze, a na Wi-Fi źle, problemem jest Twoja sieć bezprzewodowa, a nie dostawca.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>2. Wyłączenie zbędnych aplikacji</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Zamknij wszystkie aplikacje korzystające z internetu w tle (aktualizacje, Netflix, Dropbox, torrenty, gry online). Upewnij się, że inne urządzenia w domu nie pobierają ani nie wysyłają danych.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>3. Wybór właściwego serwera</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Wybierz serwer położony blisko Ciebie (w tym samym mieście lub regionie). Zapewni to pomiar prędkości Twojego łącza do najbliższego punktu dostępowego.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>4. Powtórzenie testu</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Wykonaj test 2-3 razy o różnych porach dnia (np. rano i wieczorem). Prędkość może się wahać, a uśredniony wynik da lepszy obraz sytuacji.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Summary table */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Podsumowanie - czego oczekiwać?
            </h3>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Typ połączenia</TableHead>
                    <TableHead>Oczekiwany wynik</TableHead>
                    <TableHead>Ocena</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Kabel (Ethernet)</TableCell>
                    <TableCell>930 – 945 Mb/s</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-green-500">
                        <CheckCircle2 className="w-4 h-4" /> Perfekcyjnie
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kabel (Ethernet)</TableCell>
                    <TableCell>&lt; 100 Mb/s</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-destructive">
                        <AlertTriangle className="w-4 h-4" /> Awaria
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Wi-Fi 5 (5 GHz)</TableCell>
                    <TableCell>300 – 500 Mb/s</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-primary">
                        <CheckCircle2 className="w-4 h-4" /> Norma
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Wi-Fi 6 (5 GHz)</TableCell>
                    <TableCell>700 – 900 Mb/s</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-green-500">
                        <CheckCircle2 className="w-4 h-4" /> Bardzo dobrze
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Wi-Fi (2.4 GHz)</TableCell>
                    <TableCell>40 – 100 Mb/s</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-amber-500">
                        <Info className="w-4 h-4" /> Norma (wolne pasmo)
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Expected speeds by package */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Oczekiwana prędkość wg pakietu (na kablu):</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Pakiet 300 Mb/s</p>
                  <p className="text-lg font-bold text-primary">250 – 300 Mb/s</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Pakiet 700 Mb/s</p>
                  <p className="text-lg font-bold text-primary">600 – 700 Mb/s</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Pakiet 1000 Mb/s</p>
                  <p className="text-lg font-bold text-primary">850 – 940 Mb/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
