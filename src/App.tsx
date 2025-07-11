
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OptimizedErrorBoundary } from "@/core/components/OptimizedErrorBoundary";
import { OptimizedLoadingSpinner } from "@/core/components/OptimizedLoadingSpinner";
import Footer from "@/components/Footer";
import ReloadPrompt from "@/components/pwa/ReloadPrompt";
import PwaStatusBar from "@/components/pwa/PwaStatusBar";

// Lazy load all pages with intelligent preloading
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Wellness Module (optimized loading)
const MoodTracker = lazy(() => import("./pages/MoodTracker"));
const Meditation = lazy(() => import("./pages/Meditation"));
const MindfulBreath = lazy(() => import("./pages/MindfulBreath"));
const AnxietyHelper = lazy(() => import("./pages/AnxietyHelper"));
const StressScanner = lazy(() => import("./pages/StressScanner"));
const SelfCompassion = lazy(() => import("./pages/SelfCompassion"));
const EmotionWheel = lazy(() => import("./pages/EmotionWheel"));
const GratitudeGarden = lazy(() => import("./pages/GratitudeGarden"));

// Productivity Module (optimized loading)
const Journal = lazy(() => import("./pages/Journal"));
const Goals = lazy(() => import("./pages/Goals"));
const HabitGrid = lazy(() => import("./pages/HabitGrid"));
const ZenPad = lazy(() => import("./pages/ZenPad"));
const LocalBoard = lazy(() => import("./pages/LocalBoard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const CalendarPage = lazy(() => import("./pages/Calendar"));

// Health Module (optimized loading)
const SleepAnalyzer = lazy(() => import("./pages/SleepAnalyzer"));
const FitnessLog = lazy(() => import("./pages/FitnessLog"));
const HydroReminder = lazy(() => import("./pages/HydroReminder"));
const NutrientTracker = lazy(() => import("./pages/NutrientTracker"));
const AstingSupport = lazy(() => import("./pages/AstingSupport"));
const MindfulEating = lazy(() => import("./pages/MindfulEating"));
const EnergyBalance = lazy(() => import("./pages/EnergyBalance"));

// Data Module (optimized loading)  
const DataViz = lazy(() => import("./pages/DataViz"));
const StatsPro = lazy(() => import("./pages/StatsPro"));
const SoundWeaver = lazy(() => import("./pages/SoundWeaver"));

// Optimized QueryClient with intelligent caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && 'status' in error && typeof error.status === 'number') {
          return error.status >= 500 && failureCount < 3
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false, // Reduce unnecessary requests
    },
  },
});

// Optimized Route Wrapper with better error handling
const RouteWrapper = ({ children }: { children: React.ReactNode }) => (
  <OptimizedErrorBoundary>
    <Suspense fallback={<OptimizedLoadingSpinner showBrain />}>
      {children}
    </Suspense>
  </OptimizedErrorBoundary>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ReloadPrompt />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RouteWrapper><Index /></RouteWrapper>} />
          
          {/* Core pages */}
          <Route path="/about" element={<RouteWrapper><About /></RouteWrapper>} />
          <Route path="/contact" element={<RouteWrapper><Contact /></RouteWrapper>} />
          <Route path="/favorites" element={<RouteWrapper><Favorites /></RouteWrapper>} />
          <Route path="/settings" element={<RouteWrapper><Settings /></RouteWrapper>} />
          
          {/* Wellness Module */}
          <Route path="/mood" element={<RouteWrapper><MoodTracker /></RouteWrapper>} />
          <Route path="/meditation" element={<RouteWrapper><Meditation /></RouteWrapper>} />
          <Route path="/mindfulbreath" element={<RouteWrapper><MindfulBreath /></RouteWrapper>} />
          <Route path="/anxietyhelper" element={<RouteWrapper><AnxietyHelper /></RouteWrapper>} />
          <Route path="/stressscanner" element={<RouteWrapper><StressScanner /></RouteWrapper>} />
          <Route path="/selfcompassion" element={<RouteWrapper><SelfCompassion /></RouteWrapper>} />
          <Route path="/emotionwheel" element={<RouteWrapper><EmotionWheel /></RouteWrapper>} />
          <Route path="/gratitudegarden" element={<RouteWrapper><GratitudeGarden /></RouteWrapper>} />
          
          {/* Productivity Module */}
          <Route path="/journal" element={<RouteWrapper><Journal /></RouteWrapper>} />
          <Route path="/goals" element={<RouteWrapper><Goals /></RouteWrapper>} />
          <Route path="/habitgrid" element={<RouteWrapper><HabitGrid /></RouteWrapper>} />
          <Route path="/zenpad" element={<RouteWrapper><ZenPad /></RouteWrapper>} />
          <Route path="/localboard" element={<RouteWrapper><LocalBoard /></RouteWrapper>} />
          <Route path="/analytics" element={<RouteWrapper><Analytics /></RouteWrapper>} />
          <Route path="/calendar" element={<RouteWrapper><CalendarPage /></RouteWrapper>} />
          
          {/* Health Module */}
          <Route path="/sleepanalyzer" element={<RouteWrapper><SleepAnalyzer /></RouteWrapper>} />
          <Route path="/fitnesslog" element={<RouteWrapper><FitnessLog /></RouteWrapper>} />
          <Route path="/hydro" element={<RouteWrapper><HydroReminder /></RouteWrapper>} />
          <Route path="/nutrienttracker" element={<RouteWrapper><NutrientTracker /></RouteWrapper>} />
          <Route path="/astingsupport" element={<RouteWrapper><AstingSupport /></RouteWrapper>} />
          <Route path="/mindfuleating" element={<RouteWrapper><MindfulEating /></RouteWrapper>} />
          <Route path="/energybalance" element={<RouteWrapper><EnergyBalance /></RouteWrapper>} />
          
          {/* Data Module */}
          <Route path="/dataviz" element={<RouteWrapper><DataViz /></RouteWrapper>} />
          <Route path="/statspro" element={<RouteWrapper><StatsPro /></RouteWrapper>} />
          <Route path="/soundweaver" element={<RouteWrapper><SoundWeaver /></RouteWrapper>} />
          
          <Route path="*" element={<RouteWrapper><NotFound /></RouteWrapper>} />
        </Routes>
      </BrowserRouter>
      <PwaStatusBar />
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
