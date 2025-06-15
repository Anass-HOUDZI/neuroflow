
import React, { useState, useEffect } from "react";
import { Moon, BedDouble, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SleepEntry = {
  date: string;
  bedtime: string;
  waketime: string;
  quality: string; // "Excellent", "Bon", "Moyen", "Fatigué", "Très fatigué"
  notes: string;
};

const qualities = [
  "Excellent", "Bon", "Moyen", "Fatigué", "Très fatigué"
];

const LS_KEY = "sleepanalyzer_entries";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function SleepAnalyzer() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [input, setInput] = useState<SleepEntry>({
    date: getToday(),
    bedtime: "",
    waketime: "",
    quality: "",
    notes: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) setEntries(JSON.parse(raw));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleQualityChange = (q: string) => {
    setInput((prev) => ({ ...prev, quality: q }));
  };

  const handleAddEntry = () => {
    if (!input.bedtime || !input.waketime || !input.quality) return;
    const updated = [{ ...input }, ...entries];
    setEntries(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    setInput({ date: getToday(), bedtime: "", waketime: "", quality: "", notes: "" });
  };

  const handleClear = () => {
    setEntries([]);
    localStorage.removeItem(LS_KEY);
  };

  // Calculate duration in hours/minutes if both fields present
  function computeDuration(bed: string, wake: string): string | null {
    if (!bed || !wake) return null;
    const [bH, bM = "0"] = bed.split(":");
    const [wH, wM = "0"] = wake.split(":");
    let start = new Date("2020-01-01T" + bed.padEnd(5, ":00"));
    let end = new Date("2020-01-01T" + wake.padEnd(5, ":00"));
    if (end <= start)
      end.setDate(end.getDate() + 1); // si réveil après minuit
    const diffMs = end.getTime() - start.getTime();
    const totalMin = Math.round(diffMs / 60000);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${h}h${m > 0 ? ` ${m}min` : ""}`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-sky-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <BedDouble className="h-12 w-12 text-indigo-500" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">SleepAnalyzer</h1>
          <div className="text-gray-600 dark:text-gray-300">
            Analysez votre sommeil et identifiez vos habitudes 🌙
          </div>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nouvelle nuit</CardTitle>
            <CardDescription>Saisissez vos horaires et la qualité ressentie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Input
                type="date"
                name="date"
                value={input.date}
                onChange={handleChange}
              />
              <div className="flex gap-2">
                <Input
                  type="time"
                  name="bedtime"
                  placeholder="Heure de coucher"
                  value={input.bedtime}
                  onChange={handleChange}
                />
                <Input
                  type="time"
                  name="waketime"
                  placeholder="Heure de réveil"
                  value={input.waketime}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {qualities.map((q) => (
                  <Button
                    key={q}
                    variant={input.quality === q ? "default" : "outline"}
                    type="button"
                    onClick={() => handleQualityChange(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
              <Textarea
                name="notes"
                placeholder="Notes ou rêves (optionnel)"
                value={input.notes}
                onChange={handleChange}
              />
              <Button
                onClick={handleAddEntry}
                disabled={!input.bedtime || !input.waketime || !input.quality}
              >
                <Plus className="mr-2 h-4 w-4" /> Ajouter nuit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique</CardTitle>
            <CardDescription>Dernières nuits enregistrées</CardDescription>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <div className="text-gray-400 text-center">Aucun enregistrement pour le moment.</div>
            ) : (
              <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {entries.map((entry, i) => (
                  <li key={i} className="p-3 rounded bg-white/70 dark:bg-gray-900 border shadow-sm">
                    <div className="flex items-center gap-3 font-semibold text-indigo-600">
                      <Moon className="h-4 w-4" /> {entry.date}
                      <span className="ml-auto font-mono text-gray-400">{entry.quality}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-sm">
                      <div>
                        {entry.bedtime} ➔ {entry.waketime}{" "}
                        <span className="text-xs text-gray-500">({computeDuration(entry.bedtime, entry.waketime) || "?"})</span>
                      </div>
                      {entry.notes && (
                        <div className="text-xs italic text-gray-500 truncate max-w-xs">"{entry.notes}"</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {entries.length > 0 && (
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
