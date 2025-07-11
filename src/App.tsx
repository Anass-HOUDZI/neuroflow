
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import Footer from "@/components/Footer";
import ReloadPrompt from "@/components/pwa/ReloadPrompt";
import PwaStatusBar from "@/components/pwa/PwaStatusBar";

// Lazy load all pages for optimal performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Productivity tools
const MoodTracker = lazy(() => import("./pages/MoodTracker"));
const Meditation = lazy(() => import("./pages/Meditation"));
const Journal = lazy(() => import("./pages/Journal"));
const Goals = lazy(() => import("./pages/Goals"));
const Analytics = lazy(() => import("./pages/Analytics"));
const CalendarPage = lazy(() => import("./pages/Calendar"));
const ZenPad = lazy(() => import("./pages/ZenPad"));
const HabitGrid = lazy(() => import("./pages/HabitGrid"));
const MindfulBreath = lazy(() => import("./pages/MindfulBreath"));
const LocalBoard = lazy(() => import("./pages/LocalBoard"));
const SoundWeaver = lazy(() => import("./pages/SoundWeaver"));

// Data & Technical tools
const DataViz = lazy(() => import("./pages/DataViz"));
const StatsPro = lazy(() => import("./pages/StatsPro"));

// Health & Wellness tools
const FitnessLog = lazy(() => import("./pages/FitnessLog"));
const SleepAnalyzer = lazy(() => import("./pages/SleepAnalyzer"));
const HydroReminder = lazy(() => import("./pages/HydroReminder"));
const AstingSupport = lazy(() => import("./pages/AstingSupport"));
const AnxietyHelper = lazy(() => import("./pages/AnxietyHelper"));
const EmotionWheel = lazy(() => import("./pages/EmotionWheel"));
const GratitudeGarden = lazy(() => import("./pages/GratitudeGarden"));
const StressScanner = lazy(() => import("./pages/StressScanner"));
const SelfCompassion = lazy(() => import("./pages/SelfCompassion"));
const EnergyBalance = lazy(() => import("./pages/EnergyBalance"));
const MindfulEating = lazy(() => import("./pages/MindfulEating"));
const NutrientTracker = lazy(() => import("./pages/NutrientTracker"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ReloadPrompt />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
          
          {/* Main pages */}
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/favorites" element={<PageWrapper><Favorites /></PageWrapper>} />
          <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
          
          {/* Productivity & Wellness */}
          <Route path="/mood" element={<PageWrapper><MoodTracker /></PageWrapper>} />
          <Route path="/meditation" element={<PageWrapper><Meditation /></PageWrapper>} />
          <Route path="/journal" element={<PageWrapper><Journal /></PageWrapper>} />
          <Route path="/goals" element={<PageWrapper><Goals /></PageWrapper>} />
          <Route path="/analytics" element={<PageWrapper><Analytics /></PageWrapper>} />
          <Route path="/calendar" element={<PageWrapper><CalendarPage /></PageWrapper>} />
          <Route path="/zenpad" element={<PageWrapper><ZenPad /></PageWrapper>} />
          <Route path="/habitgrid" element={<PageWrapper><HabitGrid /></PageWrapper>} />
          <Route path="/mindfulbreath" element={<PageWrapper><MindfulBreath /></PageWrapper>} />
          <Route path="/localboard" element={<PageWrapper><LocalBoard /></PageWrapper>} />
          <Route path="/soundweaver" element={<PageWrapper><SoundWeaver /></PageWrapper>} />
          
          {/* Data & Technical */}
          <Route path="/dataviz" element={<PageWrapper><DataViz /></PageWrapper>} />
          <Route path="/statspro" element={<PageWrapper><StatsPro /></PageWrapper>} />
          
          {/* Health & Wellness */}
          <Route path="/fitnesslog" element={<PageWrapper><FitnessLog /></PageWrapper>} />
          <Route path="/sleepanalyzer" element={<PageWrapper><SleepAnalyzer /></PageWrapper>} />
          <Route path="/hydro" element={<PageWrapper><HydroReminder /></PageWrapper>} />
          <Route path="/astingsupport" element={<PageWrapper><AstingSupport /></PageWrapper>} />
          <Route path="/anxietyhelper" element={<PageWrapper><AnxietyHelper /></PageWrapper>} />
          <Route path="/emotionwheel" element={<PageWrapper><EmotionWheel /></PageWrapper>} />
          <Route path="/gratitudegarden" element={<PageWrapper><GratitudeGarden /></PageWrapper>} />
          <Route path="/stressscanner" element={<PageWrapper><StressScanner /></PageWrapper>} />
          <Route path="/selfcompassion" element={<PageWrapper><SelfCompassion /></PageWrapper>} />
          <Route path="/energybalance" element={<PageWrapper><EnergyBalance /></PageWrapper>} />
          <Route path="/mindfuleating" element={<PageWrapper><MindfulEating /></PageWrapper>} />
          <Route path="/nutrienttracker" element={<PageWrapper><NutrientTracker /></PageWrapper>} />
          
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </BrowserRouter>
      <PwaStatusBar />
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
