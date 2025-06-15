
import React, { useState, useEffect } from "react";
import { Droplet, Plus, AlarmClock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LOCAL_KEY = "hydro_reminder_entries";
const GOAL_KEY = "hydro_reminder_goal";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function HydroReminder() {
  const [goal, setGoal] = useState<number>(() => {
    const saved = localStorage.getItem(GOAL_KEY);
    return saved ? Number(saved) : 2000;
  });
  const [inputGoal, setInputGoal] = useState<string>(goal.toString());
  const [entries, setEntries] = useState<{ date: string; amount: number }[]>(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  });
  const [drinkAmount, setDrinkAmount] = useState<number>(250);
  const today = getToday();

  // Filtrer les entrées du jour
  const todayEntries = entries.filter((e) => e.date === today);
  const todayTotal = todayEntries.reduce((acc, e) => acc + e.amount, 0);

  // Sauvegarder les entrées et objectif dans localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
  }, [entries]);
  useEffect(() => {
    localStorage.setItem(GOAL_KEY, String(goal));
  }, [goal]);

  const handleAddEntry = () => {
    if (drinkAmount <= 0) return;
    setEntries([{ date: today, amount: drinkAmount }, ...entries]);
    setDrinkAmount(250);
  };

  const handleResetDay = () => {
    setEntries(entries.filter((e) => e.date !== today));
  };

  const handleGoalSave = () => {
    setGoal(Number(inputGoal) || 2000);
  };

  const progress = Math.min((todayTotal / goal) * 100, 100);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-lime-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-3 mb-6 text-center">
          <Droplet className="h-12 w-12 text-sky-500" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">HydroReminder</h1>
          <div className="text-gray-600 dark:text-gray-300">Hydratation quotidienne & rappels bienveillants 💧</div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Objectif quotidien</CardTitle>
            <CardDescription>Fixez votre objectif (en ml)</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex gap-2" onSubmit={e => { e.preventDefault(); handleGoalSave(); }}>
              <Input
                type="number"
                min={100}
                max={8000}
                step={50}
                value={inputGoal}
                onChange={e => setInputGoal(e.target.value)}
                className="max-w-[140px]"
              />
              <Button type="submit" variant="outline">Enregistrer</Button>
            </form>
            <div className="mt-2 text-sm text-gray-500">
              Recommandé : 1500-2500 ml / jour (adulte)
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Journal d’aujourd’hui</CardTitle>
            <CardDescription>
              {todayTotal} ml / {goal} ml
              <span className="ml-2 text-xs text-sky-700 dark:text-sky-300">
                {progress >= 100
                  ? "🎉 Objectif atteint !" 
                  : `${Math.max(goal - todayTotal, 0)} ml restants`}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {/* Barre/cercle de progression */}
              <div className="w-full h-5 rounded-full bg-sky-100 dark:bg-gray-700 mb-1 overflow-hidden">
                <div
                  className="h-full bg-sky-400 transition-all"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  role="progressbar"
                />
              </div>
              
              <form className="flex gap-2" onSubmit={e => { e.preventDefault(); handleAddEntry(); }}>
                <Input
                  type="number"
                  min={50}
                  max={2000}
                  step={50}
                  value={drinkAmount}
                  onChange={e => setDrinkAmount(Number(e.target.value))}
                  className="max-w-[100px]"
                  aria-label="Quantité bue (ml)"
                />
                <Button type="submit"><Plus className="mr-1 h-4 w-4" />Ajouter</Button>
              </form>
              <div className="flex flex-wrap gap-2 text-xs mt-2">
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={() => setDrinkAmount(150)}
                >Petit verre 150ml</Button>
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={() => setDrinkAmount(250)}
                >Verre standard 250ml</Button>
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={() => setDrinkAmount(500)}
                >Grande gourde 500ml</Button>
              </div>
            </div>
            {todayEntries.length > 0 && (
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-1">Historique du jour</div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-32 overflow-y-auto">
                  {todayEntries.map((e, idx) => (
                    <li key={idx} className="py-1 flex gap-2 items-center">
                      <AlarmClock className="h-3 w-3 text-sky-400" />
                      {e.amount} ml
                      <span className="ml-auto text-gray-400">{new Date().toLocaleTimeString().slice(0,5)}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="w-full mt-2 text-red-600" onClick={handleResetDay}>
                  Réinitialiser la journée
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="text-xs text-gray-400 text-center mt-2">
          Bois régulièrement, sans surdoser. <br /> 
          L’application est un rappel, mais écoute aussi ta soif ! <br />
          Les données restent uniquement sur cet appareil.
        </div>
      </div>
    </main>
  );
}
