
import React, { useState, useEffect } from "react";
import { Dumbbell, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FitnessSession = {
  date: string;
  activity: string;
  duration: string;
  notes: string;
};

const LS_KEY = "fitnesslog_sessions";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function FitnessLog() {
  const [sessions, setSessions] = useState<FitnessSession[]>([]);
  const [input, setInput] = useState<FitnessSession>({
    date: getToday(),
    activity: "",
    duration: "",
    notes: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) setSessions(JSON.parse(raw));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSession = () => {
    if (!input.activity || !input.duration) return;
    const updated = [{ ...input }, ...sessions];
    setSessions(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    setInput({ date: getToday(), activity: "", duration: "", notes: "" });
  };

  const handleClear = () => {
    setSessions([]);
    localStorage.removeItem(LS_KEY);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <Dumbbell className="h-12 w-12 text-emerald-500" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">FitnessLog</h1>
          <div className="text-gray-600 dark:text-gray-300">
            Suivi simple & bienveillant de vos entraînements quotidiens 🏋️
          </div>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nouvelle séance</CardTitle>
            <CardDescription>Saisissez type, durée et notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Input
                type="date"
                name="date"
                value={input.date}
                onChange={handleChange}
              />
              <Input
                name="activity"
                placeholder="Ex : Course, Yoga, Muscu..."
                value={input.activity}
                onChange={handleChange}
              />
              <Input
                name="duration"
                placeholder="Durée (mn)"
                value={input.duration}
                onChange={handleChange}
              />
              <Textarea
                name="notes"
                placeholder="Notes (optionnel)"
                value={input.notes}
                onChange={handleChange}
              />
              <Button onClick={handleAddSession} disabled={!input.activity || !input.duration}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter séance
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique</CardTitle>
            <CardDescription>Dernières séances enregistrées</CardDescription>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-gray-400 text-center">Aucune séance enregistrée pour le moment.</div>
            ) : (
              <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {sessions.map((session, i) => (
                  <li key={i} className="p-3 rounded bg-white/70 dark:bg-gray-900 border shadow-sm">
                    <div className="flex items-center gap-3 font-semibold text-emerald-600">
                      <Dumbbell className="h-4 w-4" /> {session.activity}
                      <span className="ml-auto font-mono text-gray-400">{session.date}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-sm">
                      <div>Durée : <b>{session.duration} min</b></div>
                      {session.notes && (
                        <div className="text-xs italic text-gray-500 truncate max-w-xs">"{session.notes}"</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {sessions.length > 0 && (
              <Button variant="destructive" className="w-full mt-6" onClick={handleClear}>
                Tout effacer
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
