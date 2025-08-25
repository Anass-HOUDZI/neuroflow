import { memo, useMemo, lazy, Suspense } from "react";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Activity, Clock, Target } from "lucide-react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

// Lazy load chart components
const LineChart = lazy(() => import("recharts").then(m => ({ default: m.LineChart })));
const BarChart = lazy(() => import("recharts").then(m => ({ default: m.BarChart })));
const ResponsiveContainer = lazy(() => import("recharts").then(m => ({ default: m.ResponsiveContainer })));

// Memoized static data
const usageData = [
  { name: 'Lun', minutes: 45, sessions: 3 },
  { name: 'Mar', minutes: 60, sessions: 4 },
  { name: 'Mer', minutes: 30, sessions: 2 },
  { name: 'Jeu', minutes: 75, sessions: 5 },
  { name: 'Ven', minutes: 50, sessions: 3 },
  { name: 'Sam', minutes: 90, sessions: 6 },
  { name: 'Dim', minutes: 40, sessions: 2 },
];

const toolsData = [
  { name: 'ZenPad', usage: 25, sessions: 15 },
  { name: 'MoodTracker', usage: 20, sessions: 12 },
  { name: 'Méditation', usage: 18, sessions: 10 },
  { name: 'HabitGrid', usage: 15, sessions: 8 },
  { name: 'SleepAnalyzer', usage: 12, sessions: 7 },
  { name: 'Autres', usage: 10, sessions: 5 },
];

// Memoized metric cards component
const MetricCards = memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <Clock className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">6h 30m</p>
            <p className="text-sm text-muted-foreground">Cette semaine</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <Activity className="h-8 w-8 text-green-500" />
          <div>
            <p className="text-2xl font-bold">25</p>
            <p className="text-sm text-muted-foreground">Sessions totales</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-purple-500" />
          <div>
            <p className="text-2xl font-bold">+15%</p>
            <p className="text-sm text-muted-foreground">Progression</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-orange-500" />
          <div>
            <p className="text-2xl font-bold">7/10</p>
            <p className="text-sm text-muted-foreground">Objectifs atteints</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
));

MetricCards.displayName = "MetricCards";

const OptimizedAnalytics = memo(() => {
  // Memoize chart configurations
  const chartConfig = useMemo(() => ({
    lineChart: {
      width: "100%",
      height: 300,
      data: usageData
    },
    barChart: {
      width: "100%", 
      height: 300,
      data: toolsData
    }
  }), []);

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Analytics"
          description="Analysez vos habitudes et progressez avec des insights personnalisés"
          icon={<BarChart3 className="h-12 w-12 text-purple-500" />}
        />

        <div className="max-w-6xl mx-auto space-y-6">
          <MetricCards />

          <Tabs defaultValue="usage" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="usage">Usage Quotidien</TabsTrigger>
              <TabsTrigger value="tools">Outils Populaires</TabsTrigger>
              <TabsTrigger value="progress">Progression</TabsTrigger>
            </TabsList>

            <TabsContent value="usage" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Suspense fallback={<LoadingSpinner />}>
                    <ResponsiveContainer {...chartConfig.lineChart}>
                      <LineChart data={usageData}>
                        {/* Chart configuration */}
                      </LineChart>
                    </ResponsiveContainer>
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Suspense fallback={<LoadingSpinner />}>
                    <ResponsiveContainer {...chartConfig.barChart}>
                      <BarChart data={toolsData}>
                        {/* Chart configuration */}
                      </BarChart>
                    </ResponsiveContainer>
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div>
                        <p className="font-medium">Méditation quotidienne</p>
                        <p className="text-sm text-muted-foreground">Streak actuel : 12 jours</p>
                      </div>
                      <div className="text-2xl font-bold text-green-600">85%</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div>
                        <p className="font-medium">Suivi d'humeur</p>
                        <p className="text-sm text-muted-foreground">Streak actuel : 8 jours</p>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">70%</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div>
                        <p className="font-medium">Journal quotidien</p>
                        <p className="text-sm text-muted-foreground">Streak actuel : 5 jours</p>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">60%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
});

OptimizedAnalytics.displayName = "OptimizedAnalytics";

export default OptimizedAnalytics;