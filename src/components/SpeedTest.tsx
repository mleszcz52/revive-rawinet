import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpFromLine,
  Loader2,
  Play,
  Server,
  Timer,
  TriangleAlert,
} from "lucide-react";

const CF = "https://speed.cloudflare.com";
const DOWN = (bytes: number) => `${CF}/__down?bytes=${bytes}`;
const UP = `${CF}/__up`;

const DOWN_STREAMS = 8;
const UP_STREAMS = 8;
const WARMUP_MS = 1200;
const DOWN_MS = 6000;
const UP_MS = 6000;
const PING_ROUNDS = 12;
const UPLOAD_MB = 32;
const CAPS = [50, 100, 200, 300, 500, 700, 1000, 1200, 2000];

type Phase = "idle" | "ping" | "download" | "upload" | "done" | "error";

interface Results {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  colo: string;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const median = (list: number[]) => {
  if (!list.length) return 0;
  const sorted = [...list].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const fmt = (v: number) => (v >= 100 ? v.toFixed(0) : v.toFixed(1));

async function measurePing(): Promise<{ ping: number; jitter: number }> {
  const samples: number[] = [];
  for (let i = 0; i < PING_ROUNDS; i++) {
    const start = performance.now();
    try {
      await fetch(DOWN(0), { cache: "no-store" });
      samples.push(performance.now() - start);
    } catch {
      /* pojedynczy nieudzony pomiar zostaje pominięty */
    }
  }
  const usable = samples.slice(2);
  const ping = median(usable);
  let jitter = 0;
  for (let i = 1; i < usable.length; i++) jitter += Math.abs(usable[i] - usable[i - 1]);
  if (usable.length > 1) jitter /= usable.length - 1;
  return { ping, jitter };
}

/**
 * Pobieranie: wiele równoległych strumieni, pomiar w oknie czasowym,
 * pierwszy fragment (rozruch połączeń) nie wchodzi do wyniku końcowego.
 */
async function measureDownload(
  onLive: (mbps: number) => void,
  onColo: (colo: string) => void
): Promise<number> {
  const stop = new AbortController();
  const t0 = performance.now();
  const deadline = t0 + WARMUP_MS + DOWN_MS;
  let total = 0;
  let warmBytes = 0;
  let warmAt = 0;
  let rate = 6_000_000;
  let colo = "";

  const worker = async () => {
    while (performance.now() < deadline) {
      const size = clamp(Math.round(((rate / DOWN_STREAMS) * 0.8) / 1000) * 1000, 2_000_000, 120_000_000);
      let res: Response;
      try {
        res = await fetch(DOWN(size), { cache: "no-store", signal: stop.signal });
      } catch {
        return;
      }
      if (!colo) colo = res.headers.get("cf-meta-colo") || "";
      const reader = res.body?.getReader();
      if (!reader) {
        total += Number(res.headers.get("content-length")) || size;
        continue;
      }
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) total += value.byteLength;
        }
      } catch {
        return;
      }
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed > 0.3) rate = total / elapsed;
    }
  };

  const timer = window.setInterval(() => {
    const now = performance.now();
    if (!warmAt && now >= t0 + WARMUP_MS) {
      warmAt = now;
      warmBytes = total;
    }
    const base = warmAt ? warmBytes : 0;
    const from = warmAt || t0;
    const span = Math.max(0.3, (now - from) / 1000);
    onLive(((total - base) * 8) / span / 1e6);
  }, 120);

  try {
    await Promise.all(
      Array.from({ length: DOWN_STREAMS }, () => worker())
    );
  } finally {
    window.clearInterval(timer);
    stop.abort();
  }

  const end = performance.now();
  const base = warmAt ? warmBytes : 0;
  const from = warmAt || t0;
  const span = Math.max(0.5, (end - from) / 1000);
  onColo(colo);
  return ((total - base) * 8) / span / 1e6;
}

let uploadPayload: Blob | null = null;
const getUploadPayload = () => {
  if (!uploadPayload) uploadPayload = new Blob([new Uint8Array(UPLOAD_MB * 1024 * 1024)]);
  return uploadPayload;
};

function sendOnce(
  size: number,
  signal: AbortSignal,
  onBytes: (n: number) => void
): Promise<boolean> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", UP, true);
    let last = 0;
    xhr.upload.onprogress = (e) => {
      if (e.loaded > last) {
        onBytes(e.loaded - last);
        last = e.loaded;
      }
    };
    let settled = false;
    const settle = (ok: boolean, countRest: boolean) => {
      if (settled) return;
      settled = true;
      if (countRest) {
        const rest = size - last;
        if (rest > 0) onBytes(rest);
      }
      resolve(ok);
    };
    xhr.onload = () => settle(xhr.status >= 200 && xhr.status < 300, true);
    xhr.onerror = () => settle(false, false);
    xhr.ontimeout = () => settle(false, false);
    xhr.onabort = () => settle(false, false);
    signal.addEventListener("abort", () => xhr.abort(), { once: true });
    xhr.send(getUploadPayload().slice(0, size));
  });
}

/**
 * Wysyłanie: równe, powtarzane porcje danych przez kilka sekund,
 * dzięki czemu wynik nie zależy od jednego szybkiego strzału.
 */
async function measureUpload(onLive: (mbps: number) => void): Promise<number> {
  const stop = new AbortController();
  const t0 = performance.now();
  const deadline = t0 + WARMUP_MS + UP_MS;
  let total = 0;
  let warmBytes = 0;
  let warmAt = 0;
  let rate = 2_000_000;
  let failed = 0;

  const worker = async () => {
    while (performance.now() < deadline && !stop.signal.aborted) {
      const size = clamp(
        Math.round(((rate / UP_STREAMS) * 0.9) / 1000) * 1000,
        2_000_000,
        UPLOAD_MB * 1024 * 1024
      );
      const ok = await sendOnce(size, stop.signal, (n) => {
        total += n;
      });
      if (!ok) {
        failed++;
        return;
      }
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed > 0.3) rate = total / elapsed;
    }
  };

  const timer = window.setInterval(() => {
    const now = performance.now();
    if (!warmAt && now >= t0 + WARMUP_MS) {
      warmAt = now;
      warmBytes = total;
    }
    const base = warmAt ? warmBytes : 0;
    const from = warmAt || t0;
    const span = Math.max(0.3, (now - from) / 1000);
    onLive(((total - base) * 8) / span / 1e6);
  }, 120);

  try {
    await Promise.all(Array.from({ length: UP_STREAMS }, () => worker()));
  } finally {
    window.clearInterval(timer);
    stop.abort();
  }

  if (failed >= UP_STREAMS) return -1;

  const end = performance.now();
  const base = warmAt ? warmBytes : 0;
  const from = warmAt || t0;
  const span = Math.max(0.5, (end - from) / 1000);
  return ((total - base) * 8) / span / 1e6;
}

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

export const SpeedTest = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [live, setLive] = useState(0);
  const [results, setResults] = useState<Results | null>(null);
  const running = useRef(false);
  const alive = useRef(true);
  const maxRef = useRef(100);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const bumpMax = (v: number) => {
    const cap = CAPS.find((c) => c >= v * 1.1) ?? CAPS[CAPS.length - 1];
    if (cap > maxRef.current) maxRef.current = cap;
  };

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    setResults(null);
    setLive(0);
    try {
      setPhase("ping");
      const { ping, jitter } = await measurePing();
      if (!alive.current) return;
      setResults({ download: 0, upload: 0, ping, jitter, colo: "" });

      maxRef.current = 50;
      setPhase("download");
      let colo = "";
      const download = await measureDownload(
        (v) => {
          if (!alive.current) return;
          bumpMax(v);
          setLive(v);
        },
        (c) => {
          colo = c;
        }
      );
      if (!alive.current) return;
      setResults((r) => (r ? { ...r, download, colo } : r));
      setLive(0);

      maxRef.current = 50;
      setPhase("upload");
      const upload = await measureUpload((v) => {
        if (!alive.current) return;
        bumpMax(v);
        setLive(v);
      });
      if (!alive.current) return;
      if (upload < 0) {
        setPhase("error");
        return;
      }
      setResults((r) => (r ? { ...r, upload } : r));
      setLive(0);
      setPhase("done");
    } catch {
      if (alive.current) setPhase("error");
    } finally {
      running.current = false;
    }
  }, []);

  const busy = phase === "ping" || phase === "download" || phase === "upload";
  const showing = busy ? live : results?.download ?? 0;
  const label =
    phase === "ping"
      ? "Sprawdzam opóźnienie…"
      : phase === "download"
      ? "Mierzę pobieranie…"
      : phase === "upload"
      ? "Mierzę wysyłanie…"
      : phase === "error"
      ? "Nie udało się zmierzyć"
      : phase === "done"
      ? "Pobieranie"
      : "Gotowy do pomiaru";

  const unit = phase === "upload" && busy ? "Mb/s wysyłania" : "Mb/s pobierania";

  const verdict = useMemo(() => {
    if (!results || results.download < 0) return null;
    const d = results.download;
    if (d >= 850)
      return "Wynik odpowiada łączu gigabitowemu na kablu. Jeśli masz pakiet 1 Gb/s, wszystko jest w porządku.";
    if (d >= 600) return "Bardzo dobry wynik — odpowiada pakietom 700 Mb/s i wyższym.";
    if (d >= 250) return "Dobry wynik — odpowiada pakietom 300 Mb/s i wyższym.";
    if (d >= 80) return "Wynik poprawny dla mniejszych pakietów. Przy kablu sprawdź, czy karta sieciowa nie pracuje w trybie 100 Mb/s.";
    return "Wynik jest niski. Powtórz test na kablu Ethernet i przy zamkniętych aplikacjach korzystających z internetu.";
  }, [results]);

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-12">
      <h3 className="text-xl font-semibold text-foreground mb-1 text-center">
        Test prędkości Rawi-Net
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Pomiar trwa kilka sekund i korzysta z wielu połączeń naraz, dlatego wynik jest stabilniejszy
        niż w testach robionych pojedynczym strzałem.
      </p>

      <div className="relative">
        <Arc value={showing} max={maxRef.current} />
        <div
          className="absolute inset-x-0 bottom-1 text-center"
          aria-live="polite"
        >
          <p className="text-4xl font-bold text-foreground tabular-nums leading-none">
            {busy ? fmt(live) : results ? fmt(results.download) : "0"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Mb/s</p>
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
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
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
              {results.upload >= 0 ? fmt(results.upload) : "—"}
              <span className="text-sm font-medium text-muted-foreground ml-1">Mb/s</span>
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 border border-border p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <Timer className="w-4 h-4 text-primary" />
              Opóźnienie
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {results.ping.toFixed(0)}
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
        </div>
      )}

      {results?.colo && (
        <p className="mt-4 text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
          <Server className="w-3.5 h-3.5" />
          Pomiar przez serwer {results.colo} — wynik zależy też od tego, jak daleko stąd do tego
          serwera.
        </p>
      )}

      {verdict && phase === "done" && (
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
