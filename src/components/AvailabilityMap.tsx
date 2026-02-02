import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import JSZip from "jszip";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, CheckCircle, XCircle, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AvailabilityMapProps {
  className?: string;
}

// Line segment type (array of points)
type LineSegment = L.LatLng[];

// Cities in the coverage area with their region for geocoding
const CITIES = [
  { value: "rawicz", label: "Rawicz", region: "powiat rawicki, wielkopolskie" },
  { value: "sarnowa", label: "Sarnowa", region: "powiat rawicki, wielkopolskie" },
  { value: "miejska-gorka", label: "Miejska Górka", region: "powiat rawicki, wielkopolskie" },
  { value: "piaski", label: "Piaski", region: "powiat rawicki, wielkopolskie" },
  { value: "wroclaw", label: "Wrocław", region: "dolnośląskie" },
  { value: "konary", label: "Konary", region: "powiat rawicki, wielkopolskie" },
  { value: "bojanowo", label: "Bojanowo", region: "powiat rawicki, wielkopolskie" },
];

export const AvailabilityMap = ({ className }: AvailabilityMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [networkLines, setNetworkLines] = useState<LineSegment[]>([]);

  // Parse KMZ file and extract line segments
  useEffect(() => {
    const loadKMZ = async () => {
      try {
        const response = await fetch("/maps/Schemat.kmz");
        const arrayBuffer = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        
        // Find KML file in the archive
        const kmlFile = Object.keys(zip.files).find(name => name.endsWith('.kml'));
        if (!kmlFile) return;
        
        const kmlContent = await zip.files[kmlFile].async("text");
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlContent, "text/xml");
        
        // Extract all coordinates from lines and polygons
        const extractedLines: LineSegment[] = [];
        
        // Get all coordinate elements
        const coordinates = kmlDoc.querySelectorAll("coordinates");
        coordinates.forEach(coord => {
          const coordText = coord.textContent?.trim();
          if (coordText) {
            const points = coordText.split(/\s+/).map(point => {
              const [lng, lat] = point.split(",").map(Number);
              return L.latLng(lat, lng);
            }).filter(p => !isNaN(p.lat) && !isNaN(p.lng));
            
            // Store lines with at least 2 points
            if (points.length >= 2) {
              extractedLines.push(points);
            }
          }
        });
        
        setNetworkLines(extractedLines);
      } catch (error) {
        console.error("Error loading KMZ:", error);
      }
    };
    
    loadKMZ();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Center on Rawicz area
    const map = L.map(mapRef.current).setView([51.6095, 16.8581], 13);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Calculate distance from point to line segment in meters
  const distanceToLineSegment = (point: L.LatLng, lineStart: L.LatLng, lineEnd: L.LatLng): number => {
    const A = point.lat - lineStart.lat;
    const B = point.lng - lineStart.lng;
    const C = lineEnd.lat - lineStart.lat;
    const D = lineEnd.lng - lineStart.lng;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) {
      param = dot / lenSq;
    }

    let closestLat: number;
    let closestLng: number;

    if (param < 0) {
      closestLat = lineStart.lat;
      closestLng = lineStart.lng;
    } else if (param > 1) {
      closestLat = lineEnd.lat;
      closestLng = lineEnd.lng;
    } else {
      closestLat = lineStart.lat + param * C;
      closestLng = lineStart.lng + param * D;
    }

    const closestPoint = L.latLng(closestLat, closestLng);
    return point.distanceTo(closestPoint);
  };

  // Check if point is near any network line
  const isPointNearNetwork = (point: L.LatLng, maxDistanceMeters: number = 150): boolean => {
    let minDistance = Infinity;
    for (const line of networkLines) {
      for (let i = 0; i < line.length - 1; i++) {
        const distance = distanceToLineSegment(point, line[i], line[i + 1]);
        if (distance < minDistance) {
          minDistance = distance;
        }
        if (distance <= maxDistanceMeters) {
          console.log(`Znaleziono linię w odległości ${distance.toFixed(1)}m od punktu`);
          return true;
        }
      }
    }
    console.log(`Najbliższa linia w odległości ${minDistance.toFixed(1)}m (max: ${maxDistanceMeters}m)`);
    return false;
  };

  const checkAvailability = async () => {
    if (!address.trim() || !city) return;
    
    setIsChecking(true);
    setAvailabilityResult(null);
    
    try {
      // Get city data for search
      const cityData = CITIES.find(c => c.value === city);
      const cityLabel = cityData?.label || city;
      const region = cityData?.region || "";
      // Use Nominatim for geocoding (free, no API key needed)
      const searchQuery = `${address}, ${cityLabel}, ${region}, Polska`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data.length === 0) {
        setAvailabilityResult({
          available: false,
          message: "Nie znaleziono podanego adresu. Sprawdź poprawność danych.",
        });
        return;
      }
      
      const { lat, lon, display_name } = data[0];
      const point = L.latLng(parseFloat(lat), parseFloat(lon));
      console.log(`Geokodowanie: "${searchQuery}" -> ${display_name} (${lat}, ${lon})`);
      
      // Add marker to map
      if (mapInstanceRef.current) {
        // Remove existing markers
        mapInstanceRef.current.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            mapInstanceRef.current?.removeLayer(layer);
          }
        });
        
        L.marker(point, {
          icon: L.divIcon({
            className: "custom-marker",
            html: `<div style="background: hsl(var(--primary)); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        }).addTo(mapInstanceRef.current);
        
        mapInstanceRef.current.setView(point, 16);
      }
      
      // Check if point is near any network line (within 150 meters)
      const isInCoverage = isPointNearNetwork(point, 150);
      
      if (isInCoverage) {
        setAvailabilityResult({
          available: true,
          message: "Świetna wiadomość! Twój adres jest w zasięgu sieci RawiNet. Skontaktuj się z nami, aby zamówić usługę.",
        });
      } else {
        setAvailabilityResult({
          available: false,
          message: "Niestety, podany adres nie jest jeszcze w zasięgu naszej sieci. Zostaw kontakt, a powiadomimy Cię gdy rozszerzymy zasięg.",
        });
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setAvailabilityResult({
        available: false,
        message: "Wystąpił błąd podczas sprawdzania. Spróbuj ponownie lub skontaktuj się z nami telefonicznie.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Sprawdź dostępność
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Czy Twój adres jest w <span className="text-gradient">zasięgu</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Wpisz swój adres, aby sprawdzić czy możemy dostarczyć Ci szybki internet światłowodowy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Search Form */}
          <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Sprawdź adres</h3>
                <p className="text-sm text-muted-foreground">Wpisz ulicę i miejscowość</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="city" className="text-foreground">Miejscowość</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger id="city" className="mt-1.5">
                    <SelectValue placeholder="Wybierz miejscowość" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address" className="text-foreground">Ulica i numer</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="np. ul. Rynek 5"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && checkAvailability()}
                  className="mt-1.5"
                />
              </div>

              <Button
                onClick={checkAvailability}
                disabled={isChecking || !address.trim() || !city}
                className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sprawdzam...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Sprawdź dostępność
                  </>
                )}
              </Button>

              {/* Result */}
              {availabilityResult && (
                <div
                  className={`p-4 rounded-xl border ${
                    availabilityResult.available
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {availabilityResult.available ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-semibold ${
                        availabilityResult.available ? "text-green-500" : "text-red-500"
                      }`}>
                        {availabilityResult.available ? "Dostępne!" : "Brak zasięgu"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {availabilityResult.message}
                      </p>
                    </div>
                  </div>
                  
                  {availabilityResult.available && (
                    <a href="tel:505051376" className="block mt-4">
                      <Button className="w-full gradient-primary text-primary-foreground">
                        Zamów teraz: 505 051 376
                      </Button>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Coverage info */}
            <div className="mt-6 pt-6 border-t border-border space-y-2">
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  To jest <strong>zasięg teoretyczny</strong>. Do ostatecznego potwierdzenia dostępności usługi zadzwoń: <a href="tel:505051376" className="text-primary font-medium hover:underline">505 051 376</a>
                </span>
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card h-[400px] lg:h-auto min-h-[400px]">
            <div ref={mapRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
