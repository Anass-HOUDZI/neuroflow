
import React, { useState } from "react";
import { Droplet } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { HydroProgress } from "@/components/hydro/HydroProgress";
import { DrinkEntry } from "@/components/hydro/DrinkEntry";
import { TodayHistory } from "@/components/hydro/TodayHistory";

interface HydroEntry {
  date: string;
  amount: number;
  time: string;
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function HydroReminder() {
  const [goal, setGoal] = useLocalStorage<number>("hydro_reminder_goal", 2000);
  const [entries, setEntries] = useLocalStorage<HydroEntry[]>("hydro_reminder_entries", []);
  const [inputGoal, setInputGoal] = useState<string>(goal.toString());
  const [drinkAmount, setDrinkAmount] = useState<number>(250);
  
  const today = getToday();
  const todayEntries = entries.filter((e) => e.date === today);
  const todayTotal = todayEntries.reduce((acc, e) => acc + e.amount, 0);
  const dailyLimit = 3000; // Safety limit

  const handleAddEntry = () => {
    if (drinkAmount <= 0 || todayTotal >= dailyLimit) return;
    
    const newEntry: HydroEntry = {
      date: today,
      amount: drinkAmount,
      time: new Date().toLocaleTimeString().slice(0, 5)
    };
    
    setEntries([newEntry, ...entries]);
    setDrinkAmount(250);
  };

  const handleResetDay = () => {
    setEntries(entries.filter((e) => e.date !== today));
  };

  const handleGoalSave = () => {
    const newGoal = Number(inputGoal) || 2000;
    setGoal(Math.max(500, Math.min(8000, newGoal))); // Clamp between 500-8000ml
  };

  return (
    <PageLayout className="bg-gradient-to-br from-sky-50 via-cyan-50 to-lime-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-lg mx-auto">
        <PageHeader
          title="HydroReminder"
          description="Hydratation quotidienne & rappels bienveillants 💧"
          icon={<Droplet className="h-12 w-12 text-sky-500" />}
        />

        {/* Goal Setting */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Objectif quotidien</CardTitle>
            <CardDescription>Fixez votre objectif (en ml)</CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              className="flex gap-2" 
              onSubmit={(e) => { e.preventDefault(); handleGoalSave(); }}
            >
              <Input
                type="number"
                min={500}
                max={8000}
                step={50}
                value={inputGoal}
                onChange={(e) => setInputGoal(e.target.value)}
                className="max-w-[140px]"
              />
              <Button type="submit" variant="outline">Enregistrer</Button>
            </form>
            <div className="mt-2 text-sm text-gray-500">
              Recommandé : 1500-2500 ml / jour (adulte)
            </div>
          </CardContent>
        </Card>

        {/* Today's Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Journal d'aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <HydroProgress current={todayTotal} goal={goal} className="mb-4" />
            
            <DrinkEntry
              amount={drinkAmount}
              onAmountChange={setDrinkAmount}
              onAdd={handleAddEntry}
              disabled={todayTotal >= dailyLimit}
            />

            <TodayHistory entries={todayEntries} onReset={handleResetDay} />
            
            {todayTotal >= dailyLimit && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Limite quotidienne atteinte. Consultez un professionnel de santé si nécessaire.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-xs text-gray-400 text-center">
          Bois régulièrement, sans surdoser. <br /> 
          L'application est un rappel, mais écoute aussi ta soif ! <br />
          Les données restent uniquement sur cet appareil.
        </div>
      </div>
    </PageLayout>
  );
}
