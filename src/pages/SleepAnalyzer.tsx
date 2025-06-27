
import React, { useState, useEffect } from "react";
import { SleepHeader } from "@/components/sleep-analyzer/SleepHeader";
import { SleepForm } from "@/components/sleep-analyzer/SleepForm";
import { SleepHistory } from "@/components/sleep-analyzer/SleepHistory";

type SleepEntry = {
  date: string;
  bedtime: string;
  waketime: string;
  quality: string;
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

  function computeDuration(bed: string, wake: string): string | null {
    if (!bed || !wake) return null;
    const [bH, bM = "0"] = bed.split(":");
    const [wH, wM = "0"] = wake.split(":");
    let start = new Date("2020-01-01T" + bed.padEnd(5, ":00"));
    let end = new Date("2020-01-01T" + wake.padEnd(5, ":00"));
    if (end <= start)
      end.setDate(end.getDate() + 1);
    const diffMs = end.getTime() - start.getTime();
    const totalMin = Math.round(diffMs / 60000);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${h}h${m > 0 ? ` ${m}min` : ""}`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-sky-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <SleepHeader />
        <SleepForm
          input={input}
          qualities={qualities}
          onInputChange={handleChange}
          onQualityChange={handleQualityChange}
          onAddEntry={handleAddEntry}
        />
        <SleepHistory
          entries={entries}
          onClear={handleClear}
          computeDuration={computeDuration}
        />
      </div>
    </main>
  );
}
