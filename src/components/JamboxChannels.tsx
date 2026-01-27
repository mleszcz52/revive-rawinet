import { useState } from "react";
import { cn } from "@/lib/utils";

interface JamboxChannelsProps {
  className?: string;
}

const packages = [
  { id: "75", name: "Podstawowy", channels: "78", hdChannels: "68" },
  { id: "76", name: "Korzystny", channels: "136", hdChannels: "119" },
  { id: "77", name: "Bogaty", channels: "179", hdChannels: "152" },
];

export const JamboxChannels = ({ className }: JamboxChannelsProps) => {
  const [activePackage, setActivePackage] = useState(packages[0]);

  return (
    <div className={cn("", className)}>
      {/* Package Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setActivePackage(pkg)}
            className={cn(
              "px-6 py-3 rounded-xl font-semibold transition-all duration-300",
              activePackage.id === pkg.id
                ? "gradient-primary text-primary-foreground shadow-glow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {pkg.name}
            <span className="ml-2 text-sm opacity-80">({pkg.channels} kanałów)</span>
          </button>
        ))}
      </div>

      {/* Package Info */}
      <div className="text-center mb-6">
        <p className="text-lg text-muted-foreground">
          Zawiera <span className="font-bold text-foreground">{activePackage.channels} kanałów</span> w tym{" "}
          <span className="font-bold text-primary">{activePackage.hdChannels} w jakości HD</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Masz możliwość rozszerzenia swojego pakietu o wybrane pakiety tematyczne oraz premium
        </p>
      </div>

      {/* JAMBOX iframe */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
        <iframe
          src={`https://www.jambox.pl/iframe-pakiet-logo?p=${activePackage.id}`}
          title={`Pakiet ${activePackage.name} - Lista kanałów JAMBOX`}
          className="w-full border-0"
          style={{ height: "600px" }}
          loading="lazy"
        />
      </div>

      {/* JAMBOX Attribution */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        Telewizja dostarczana przez{" "}
        <a 
          href="https://www.jambox.pl" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          JAMBOX
        </a>
      </p>
    </div>
  );
};
