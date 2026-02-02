import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import JSZip from "jszip";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface AvailabilityMapProps {
  className?: string;
}

export const AvailabilityMap = ({ className }: AvailabilityMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const coverageLayerRef = useRef<L.LayerGroup | null>(null);
  const [address, setAddress] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [polygons, setPolygons] = useState<L.LatLng[][]>([]);

  // Parse KMZ file and extract polygons
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
        
        // Extract all coordinates from polygons and lines
        const extractedPolygons: L.LatLng[][] = [];
        
        // Get Polygon coordinates
        const coordinates = kmlDoc.querySelectorAll("coordinates");
        coordinates.forEach(coord => {
          const coordText = coord.textContent?.trim();
          if (coordText) {
            const points = coordText.split(/\s+/).map(point => {
              const [lng, lat] = point.split(",").map(Number);
              return L.latLng(lat, lng);
            }).filter(p => !isNaN(p.lat) && !isNaN(p.lng));
            
            if (points.length > 2) {
              extractedPolygons.push(points);
            }
          }
        });
        
        setPolygons(extractedPolygons);
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
    const map = L.map(mapRef.current).setView([51.6095, 16.8581], 12);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const coverageLayer = L.layerGroup().addTo(map);
    coverageLayerRef.current = coverageLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Add polygons to map when loaded
  useEffect(() => {
    if (!coverageLayerRef.current || polygons.length === 0) return;
    
    coverageLayerRef.current.clearLayers();
    
    polygons.forEach(coords => {
      L.polygon(coords, {
        color: "#10b981",
        fillColor: "#10b981",
        fillOpacity: 0.3,
        weight: 2,
      }).addTo(coverageLayerRef.current!);
    });

    // Fit bounds to show all polygons
    if (mapInstanceRef.current && polygons.length > 0) {
      const allPoints = polygons.flat();
      if (allPoints.length > 0) {
        const bounds = L.latLngBounds(allPoints);
        mapInstanceRef.current.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [polygons]);

  // Check if point is inside any polygon
  const isPointInPolygon = (point: L.LatLng, polygon: L.LatLng[]): boolean => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lng, yi = polygon[i].lat;
      const xj = polygon[j].lng, yj = polygon[j].lat;
      
      if (((yi > point.lat) !== (yj > point.lat)) &&
          (point.lng < (xj - xi) * (point.lat - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  };

  const checkAvailability = async () => {
    if (!address.trim()) return;
    
    setIsChecking(true);
    setAvailabilityResult(null);
    
    try {
      // Use Nominatim for geocoding (free, no API key needed)
      const searchQuery = `${address}, powiat rawicki, Polska`;
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
      
      const { lat, lon } = data[0];
      const point = L.latLng(parseFloat(lat), parseFloat(lon));
      
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
            html: `<div style="background: #ef4444; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        }).addTo(mapInstanceRef.current);
        
        mapInstanceRef.current.setView(point, 15);
      }
      
      // Check if point is in any coverage area
      const isInCoverage = polygons.some(polygon => isPointInPolygon(point, polygon));
      
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
                <Label htmlFor="address" className="text-foreground">Adres</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="np. ul. Rynek 5, Rawicz"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && checkAvailability()}
                  className="mt-1.5"
                />
              </div>

              <Button
                onClick={checkAvailability}
                disabled={isChecking || !address.trim()}
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
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <span className="inline-block w-3 h-3 rounded bg-green-500/50 mr-2"></span>
                Obszary zaznaczone na zielono to miejsca objęte zasięgiem sieci RawiNet.
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
