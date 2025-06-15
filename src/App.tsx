
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MoodTracker from "./pages/MoodTracker";
import Meditation from "./pages/Meditation";
import Journal from "./pages/Journal";
import Goals from "./pages/Goals";
import Analytics from "./pages/Analytics";
import CalendarPage from "./pages/Calendar";
import ZenPad from "./pages/ZenPad";
import HabitGrid from "./pages/HabitGrid";
import MindfulBreath from "./pages/MindfulBreath";
import LocalBoard from "./pages/LocalBoard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/zenpad" element={<ZenPad />} />
          <Route path="/habitgrid" element={<HabitGrid />} />
          <Route path="/mindfulbreath" element={<MindfulBreath />} />
          <Route path="/localboard" element={<LocalBoard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
