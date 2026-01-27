import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RouterOptions } from "@/components/RouterOptions";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <RouterOptions />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
