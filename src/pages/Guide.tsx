import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import guideHtml from "@/content/poradnikWifi.html?raw";

const Guide = () => {
  useEffect(() => {
    document.title = "Poradnik Wi-Fi – dlaczego Wi-Fi nie działa w każdym pokoju? | Rawi-Net";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <div dangerouslySetInnerHTML={{ __html: guideHtml }} />
      </main>
      <Footer />
    </div>
  );
};

export default Guide;
