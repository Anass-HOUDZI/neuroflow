
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
import SoundWeaver from "./pages/SoundWeaver";
import DataViz from "./pages/DataViz";
import StatsPro from "./pages/StatsPro";
import FitnessLog from "./pages/FitnessLog";
import SleepAnalyzer from "./pages/SleepAnalyzer";
import HydroReminder from "./pages/HydroReminder";
import AnxietyHelper from "./pages/AnxietyHelper";
import EmotionWheel from "./pages/EmotionWheel";
import GratitudeGarden from "./pages/GratitudeGarden";
import StressScanner from "./pages/StressScanner";
import SelfCompassion from "./pages/SelfCompassion";
import EnergyBalance from "./pages/EnergyBalance";
import MindfulEating from "./pages/MindfulEating";
import AstingSupport from "./pages/AstingSupport";
import NutrientTracker from "./pages/NutrientTracker";
import Footer from "@/components/Footer";
import ReloadPrompt from "@/components/pwa/ReloadPrompt";
import PwaStatusBar from "@/components/pwa/PwaStatusBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ReloadPrompt />
      <BrowserRouter>
        {/* ROUTES PRINCIPALES */}
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
          {/* DESIGN & CREATIVITY TOOLS SUPPRIMÉS */}
          {/* <Route path="/pixelcraft" element={<PixelCraft />} /> */}
          {/* <Route path="/vectorstudio" element={<VectorStudio />} /> */}
          {/* <Route path="/colormaster" element={<ColorMaster />} /> */}
          <Route path="/soundweaver" element={<SoundWeaver />} />
          {/* <Route path="/quickedit" element={<QuickEdit />} /> */}
          {/* <Route path="/fontforge" element={<FontForge />} /> */}
          {/* <Route path="/diagramflow" element={<DiagramFlow />} /> */}
          {/* <Route path="/logomaker" element={<LogoMaker />} /> */}
          {/* <Route path="/mememaker" element={<MemeMaker />} /> */}
          {/* <Route path="/patterngen" element={<PatternGen />} /> */}
          <Route path="/dataviz" element={<DataViz />} />
          <Route path="/statspro" element={<StatsPro />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/fitnesslog" element={<FitnessLog />} />
          <Route path="/sleepanalyzer" element={<SleepAnalyzer />} />
          <Route path="/hydro" element={<HydroReminder />} />
          {/* --- WELL-BEING TOOLS --- */}
          <Route path="/astingsupport" element={<AstingSupport />} />
          <Route path="/anxietyhelper" element={<AnxietyHelper />} />
          <Route path="/emotionwheel" element={<EmotionWheel />} />
          <Route path="/gratitudegarden" element={<GratitudeGarden />} />
          <Route path="/stressscanner" element={<StressScanner />} />
          <Route path="/selfcompassion" element={<SelfCompassion />} />
          <Route path="/energybalance" element={<EnergyBalance />} />
          <Route path="/mindfuleating" element={<MindfulEating />} />
          <Route path="/nutrienttracker" element={<NutrientTracker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* PWA: barre d’état connexion/offline (juste au dessus du footer) */}
      <PwaStatusBar />
      {/* Le footer global, toujours visible */}
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
