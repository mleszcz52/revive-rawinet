import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SpeedTestEngine from "@cloudflare/speedtest";
import type { MeasurementType, Results as CfResults } from "@cloudflare/speedtest";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpFromLine,
  Gauge,
  Loader2,
  Network,
  Play,
  Server,
  Timer,
  TriangleAlert,
} from "lucide-react";

const CAPS = [50, 100, 200, 300, 500, 700, 1000, 1200, 2000];

type Phase =
  | "idle"
  | "ping"
  | "download"
  | "upload"
  | "packetLoss"
  | "done"
  | "error";

interface ScoreEntry {
  label: string;
  name: string;
}

interface Results {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  downLoadedLatency: number | null;
  packetLoss: number | null;
  colo: string;
  scores: ScoreEntry[];
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const fmt = (v: number) => (v >= 100 ? v.toFixed(0) : v.toFixed(1));

const scorePl = (name: string): { text: string; tone: "bad" | "mid" | "good" } => {
  switch (name) {
    case "great":
      return { text: "Świetna", tone: "good" };
    case "good":
      return { text: "Dobra", tone: "good" };
    case "average":
      return { text: "Przeciętna", tone: "mid" };
    case "poor":
      return { text: "Słaba", tone: "bad" };
    default:
      return { text: "Bardzo słaba", tone: "bad" };
  }
};

const phaseOf = (type: MeasurementType): Phase => {
  if (type.startsWith("latency")) return "ping";
  if (type === "download") return "download";
  if (type === "upload") return "upload";
  if (type.startsWith("packetLoss")) return "packetLoss";
  return "ping";
};

const metaColo = async (): Promise<string> => {
  try {
    const res = await fetch("https://speed.cloudflare.com/meta", { cache: "no-store" });
    if (!res.ok) return "";
    const meta = await res.json();
    return typeof meta?.colo === "string" ? meta.colo : "";
  } catch {
    return "";
  }
};

const Arc = ({ value, max }: { value: number; max: number }) => {
  const r = 82;
  const length = Math.PI * r;
  const pct = clamp(value / max, 0, 1);
  return (
    <svg viewBox="0 0 200 116" className="w-full max-w-[300px] mx-auto" aria-hidden="true">
      <path
        d={`M ${100 - r} 104 A ${r} ${r} 0 0 1 ${100 + r} 104`}
        fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={`M ${100 - r} 104 A ${r} ${r} 0 0 1 ${100 + r} 104`}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${pct * length} ${length}`}
        style={{ transition: "stroke-dasharray 140ms linear" }}
      />
    </svg>
  );
};

const Metric = ({
  icon: Icon,
  label,
  value,
  unit,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
  hint: string;
}) => (
  <div className="rounded-lg bg-muted/50 border border-border p-4">
    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
      <Icon className="w-4 h-4 text-primary" />
      {label}
    </div>
    <p className="text-2xl font-bold text-foreground tabular-nums">
      {value}
      <span className="text-sm font-medium text-muted-foreground ml-1">{unit}</span>
    </p>
    <p className="text-xs text-muted-foreground mt-2 leading-snug">{hint}</p>
  </div>
);

export const SpeedTest = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [live, setLive] = useState(0);
  const [results, setResults] = useState<Results | null>(null);
  const engineRef = useRef<SpeedTestEngine | null>(null);
  const coloRef = useRef("");
  const alive = useRef(true);
  const maxRef = useRef(100);
  const phaseRef = useRef<Phase>("idle");

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      engineRef.current?.pause();
    };
  }, []);

  const bumpMax = (mbps: number) => {
    const cap = CAPS.find((c) => c >= mbps * 1.1) ?? CAPS[CAPS.length - 1];
    if (cap > maxRef.current) maxRef.current = cap;
  };

  const run = useCallback(() => {
    if (engineRef.current?.isRunning) return;
    setResults(null);
    setLive(0);
    setPhase("ping");
    maxRef.current = 50;

    const engine = new SpeedTestEngine({
      autoStart: false,
      // Nie wysyłamy wyników do panelu analitycznego Cloudflare —
      // same pomiary idą do jego serwerów, wynik zostaje w przeglądarce.
      logAimApiUrl: null,
      logMeasurementApiUrl: null,
      measureDownloadLoadedLatency: true,
      measureUploadLoadedLatency: true,
    });
    engineRef.current = engine;

    engine.onPhaseChange = ({ measurement }) => {
      if (!alive.current) return;
      const next = phaseOf(measurement.type as MeasurementType);
      phaseRef.current = next;
      setPhase(next);
      if (next === "download" || next === "upload") maxRef.current = 50;
    };

    engine.onResultsChange = () => {
      if (!alive.current) return;
      const s = engine.results.getSummary();
      if (phaseRef.current === "ping") {
        setLive(s.latency ?? 0);
      } else if (phaseRef.current === "download" && s.download !== undefined) {
        const mbps = s.download / 1e6;
        bumpMax(mbps);
        setLive(mbps);
      } else if (phaseRef.current === "upload" && s.upload !== undefined) {
        const mbps = s.upload / 1e6;
        bumpMax(mbps);
        setLive(mbps);
      }
    };

    engine.onFinish = (res: CfResults) => {
      if (!alive.current) return;
      const s = res.getSummary();
      const scores = res.getScores();
      // Pokazujemy tylko oceny, które silnik rzeczywiście zmierzył —
      // brak pomiaru (np. niedostępny test strat pakietów) to nie „zła jakość".
      const entries: ScoreEntry[] = [
        { label: "Streaming wideo", name: scores.streaming?.classificationName ?? "" },
        { label: "Gry online", name: scores.gaming?.classificationName ?? "" },
        { label: "Wideorozmowy", name: scores.rtc?.classificationName ?? "" },
      ].filter((e) => e.name.length > 0);
      setResults({
        download: (s.download ?? 0) / 1e6,
        upload: (s.upload ?? 0) / 1e6,
        ping: s.latency ?? 0,
        jitter: s.jitter ?? 0,
        downLoadedLatency: s.downLoadedLatency ?? null,
        packetLoss: s.packetLoss !== undefined ? s.packetLoss * 100 : null,
        colo: coloRef.current,
        scores: entries,
      });
      setLive(0);
      setPhase("done");
    };

    engine.onError = () => {
      if (alive.current) setPhase("error");
    };

    engine.play();

    // Kod serwera pomiarowego (np. WAW) — osobne, lekkie zapytanie.
    void metaColo().then((colo) => {
      coloRef.current = colo;
    });
  }, []);

  const busy =
    phase === "ping" || phase === "download" || phase === "upload" || phase === "packetLoss";
  const showing = busy ? live : results?.download ?? 0;
  const label =
    phase === "ping"
      ? "Sprawdzam opóźnienie…"
      : phase === "download"
      ? "Mierzę pobieranie…"
      : phase === "upload"
      ? "Mierzę wysyłanie…"
      : phase === "packetLoss"
      ? "Sprawdzam straty pakietów…"
      : phase === "error"
      ? "Nie udało się zmierzyć"
      : phase === "done"
      ? "Pobieranie"
      : "Gotowy do pomiaru";

  const unit =
    phase === "upload" && busy ? "Mb/s wysyłania" : phase === "ping" && busy ? "ms" : "Mb/s pobierania";

  const verdict = useMemo(() => {
    if (!results || phase !== "done") return null;
    const d = results.download;
    if (d >= 850)
      return "Wynik odpowiada łączu gigabitowemu na kablu. Jeśli masz pakiet 1 Gb/s, wszystko jest w porządku.";
    if (d >= 600) return "Bardzo dobry wynik — odpowiada pakietom 700 Mb/s i wyższym.";
    if (d >= 250) return "Dobry wynik — odpowiada pakietom 300 Mb/s i wyższym.";
    if (d >= 80) return "Wynik poprawny dla mniejszych pakietów. Przy kablu sprawdź, czy karta sieciowa nie pracuje w trybie 100 Mb/s.";
    return "Wynik jest niski. Powtórz test na kablu Ethernet i przy zamkniętych aplikacjach korzystających z internetu.";
  }, [results, phase]);

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-12">
      <h3 className="text-xl font-semibold text-foreground mb-1 text-center">
        Test prędkości Rawi-Net
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Pomiar trwa kilkanaście sekund i idzie do sieci Cloudflare — mierzy pobieranie, wysyłanie,
        opóźnienie, straty pakietów oraz jakość łącza dla streamingu, gier i wideorozmów.
      </p>

      <div className="relative">
        <Arc value={showing} max={maxRef.current} />
        <div
          className="absolute inset-x-0 bottom-1 text-center"
          aria-live="polite"
        >
          <p className="text-4xl font-bold text-foreground tabular-nums leading-none">
            {phase === "ping" && busy
              ? fmt(live || 0)
              : busy || phase === "done"
              ? fmt(showing)
              : "0"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {phase === "ping" && busy ? "ms" : "Mb/s"}
          </p>
        </div>
      </div>

      <p className="text-center text-sm font-medium text-primary mt-3 h-5">{label}</p>
      <p className="sr-only">{unit}</p>

      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={run}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3 text-primary-foreground font-semibold shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
        >
          {busy ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Trwa pomiar…
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {phase === "done" || phase === "error" ? "Powtórz test" : "Rozpocznij test"}
            </>
          )}
        </button>
      </div>

      {results && (
        <>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/50 border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <ArrowDownToLine className="w-4 h-4 text-primary" />
                Pobieranie
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {fmt(results.download)}
                <span className="text-sm font-medium text-muted-foreground ml-1">Mb/s</span>
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <ArrowUpFromLine className="w-4 h-4 text-primary" />
                Wysyłanie
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {results.upload > 0 ? fmt(results.upload) : "—"}
                <span className="text-sm font-medium text-muted-foreground ml-1">Mb/s</span>
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Timer className="w-4 h-4 text-primary" />
                Opóźnienie
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {results.ping > 0 ? results.ping.toFixed(0) : "—"}
                <span className="text-sm font-medium text-muted-foreground ml-1">ms</span>
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Activity className="w-4 h-4 text-primary" />
                Jitter
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {results.jitter.toFixed(1)}
                <span className="text-sm font-medium text-muted-foreground ml-1">ms</span>
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Network className="w-4 h-4 text-primary" />
                Straty pakietów
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {results.packetLoss !== null ? results.packetLoss.toFixed(2) : "—"}
                <span className="text-sm font-medium text-muted-foreground ml-1">%</span>
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 border border-border p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Gauge className="w-4 h-4 text-primary" />
                Opóźnienie pod obciążeniem
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {results.downLoadedLatency !== null ? results.downLoadedLatency.toFixed(0) : "—"}
                <span className="text-sm font-medium text-muted-foreground ml-1">ms</span>
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {results.scores.map((s) => {
              const v = scorePl(s.name);
              return (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      v.tone === "good"
                        ? "bg-primary"
                        : v.tone === "mid"
                        ? "bg-yellow-500"
                        : "bg-destructive"
                    }`}
                    aria-hidden="true"
                  />
                  {s.label}: <span className="font-medium text-foreground">{v.text}</span>
                </span>
              );
            })}
          </div>
        </>
      )}

      {results?.colo && (
        <p className="mt-4 text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
          <Server className="w-3.5 h-3.5" />
          Pomiar przez serwer {results.colo} — wynik zależy też od tego, jak daleko stąd do tego
          serwera.
        </p>
      )}

      {verdict && (
        <p className="mt-4 text-sm text-muted-foreground text-center max-w-xl mx-auto">
          {verdict}
        </p>
      )}

      {phase === "error" && (
        <p className="mt-4 text-sm text-destructive text-center flex items-center justify-center gap-2">
          <TriangleAlert className="w-4 h-4" />
          Serwer pomiarowy nie odpowiedział. Sprawdź połączenie i spróbuj ponownie.
        </p>
      )}
    </div>
  );
};
