
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Battery, Zap, Coffee, Moon, Sun, TrendingUp } from "lucide-react";

const energyLevels = [
  { value: 1, label: "Épuisé", color: "text-red-500" },
  { value: 2, label: "Fatigué", color: "text-orange-500" },
  { value: 3, label: "Neutre", color: "text-yellow-500" },
  { value: 4, label: "Énergique", color: "text-green-500" },
  { value: 5, label: "Plein d'énergie", color: "text-emerald-500" },
];

const activities = [
  { name: "Méditation", boost: 15, icon: "🧘" },
  { name: "Exercice", boost: 25, icon: "🏃" },
  { name: "Sieste", boost: 20, icon: "😴" },
  { name: "Café", boost: 10, icon: "☕" },
  { name: "Marche", boost: 15, icon: "🚶" },
  { name: "Musique", boost: 10, icon: "🎵" },
];

export default function EnergyBalance() {
  const [currentEnergy, setCurrentEnergy] = useState(3);
  const [todayActivities, setTodayActivities] = useState<string[]>([]);

  const addActivity = (activity: string) => {
    if (!todayActivities.includes(activity)) {
      setTodayActivities([...todayActivities, activity]);
    }
  };

  const energyPercentage = (currentEnergy / 5) * 100;

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Équilibre Énergétique"
          description="Suivez et optimisez votre niveau d'énergie quotidien"
          icon={<Battery className="h-12 w-12 text-yellow-500" />}
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Niveau d'énergie actuel */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Votre niveau d'énergie actuel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {energyLevels.find(level => level.value === currentEnergy)?.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <Battery className="h-6 w-6 text-yellow-500" />
                    <span className="text-xl font-semibold">{energyPercentage}%</span>
                  </div>
                </div>
                <Progress value={energyPercentage} className="h-3" />
                <div className="grid grid-cols-5 gap-2">
                  {energyLevels.map((level) => (
                    <Button
                      key={level.value}
                      variant={currentEnergy === level.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentEnergy(level.value)}
                      className="text-xs"
                    >
                      {level.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activités énergisantes */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Activités énergisantes
              </CardTitle>
              <CardDescription>
                Sélectionnez les activités que vous avez pratiquées aujourd'hui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activities.map((activity) => (
                  <Button
                    key={activity.name}
                    variant={todayActivities.includes(activity.name) ? "default" : "outline"}
                    onClick={() => addActivity(activity.name)}
                    className="h-20 flex flex-col gap-2"
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <span className="text-sm font-medium">{activity.name}</span>
                    <span className="text-xs text-muted-foreground">+{activity.boost}%</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conseils personnalisés */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-orange-500" />
                Conseils pour aujourd'hui
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentEnergy <= 2 && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
                    <p className="text-sm text-red-700 dark:text-red-300">
                      🚨 Votre énergie est faible. Considérez une sieste de 20 minutes ou une activité relaxante.
                    </p>
                  </div>
                )}
                {currentEnergy === 3 && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      ⚖️ Votre énergie est neutre. Une activité physique légère pourrait vous aider à la booster.
                    </p>
                  </div>
                )}
                {currentEnergy >= 4 && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      ✨ Excellent niveau d'énergie ! C'est le moment idéal pour les tâches importantes.
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Moon className="h-4 w-4" />
                  <span>Pensez à maintenir un cycle de sommeil régulier pour optimiser votre énergie</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
