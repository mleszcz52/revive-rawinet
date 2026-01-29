import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import News from "./pages/News";
import Internet from "./pages/Internet";
import Television from "./pages/Television";
import InternetTV from "./pages/InternetTV";
import Business from "./pages/Business";
import Subscriber from "./pages/Subscriber";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nowosci" element={<News />} />
          <Route path="/internet" element={<Internet />} />
          <Route path="/telewizja" element={<Television />} />
          <Route path="/internet-telewizja" element={<InternetTV />} />
          <Route path="/biznes" element={<Business />} />
          <Route path="/dla-abonenta" element={<Subscriber />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
