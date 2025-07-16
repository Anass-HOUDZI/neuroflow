
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { BarChart3, TrendingUp, Activity, Clock, Target } from "lucide-react";

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

export default function Analytics() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Analytics"
          description="Analysez vos habitudes et progressez avec des insights personnalisés"
          icon={<BarChart3 className="h-12 w-12 text-purple-500" />}
        />

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Métriques principales */}
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

          {/* Graphiques détaillés */}
          <Tabs defaultValue="usage" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="usage">Usage Quotidien</TabsTrigger>
              <TabsTrigger value="tools">Outils Populaires</TabsTrigger>
              <TabsTrigger value="progress">Progression</TabsTrigger>
            </TabsList>

            <TabsContent value="usage" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Usage quotidien (7 derniers jours)</CardTitle>
                  <CardDescription>
                    Temps passé et nombre de sessions par jour
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="minutes" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        name="Minutes"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Outils les plus utilisés</CardTitle>
                  <CardDescription>
                    Répartition de l'usage par outil ce mois-ci
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={toolsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#8884d8" name="Pourcentage d'usage" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Progression des habitudes</CardTitle>
                  <CardDescription>
                    Évolution de vos habitudes au fil du temps
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
}
