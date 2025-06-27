
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { NutrientHeader } from "@/components/nutrient-tracker/NutrientHeader";
import { NutrientGrid } from "@/components/nutrient-tracker/NutrientGrid";
import { NutrientTips } from "@/components/nutrient-tracker/NutrientTips";

const MICRONUTRIENTS = [
  { key: "Vitamin D", sources: "Saumon, Oeuf, Soleil", symptoms: "Fatigue, humeur basse", optimal: "600 IU/j", color: "bg-yellow-200" },
  { key: "Magnésium", sources: "Amande, Epinard, Chocolat noir", symptoms: "Anxiété, crampes", optimal: "320-420mg/j", color: "bg-green-200" },
  { key: "Fer", sources: "Lentilles, Boeuf, Légumes verts", symptoms: "Fatigue, essoufflement", optimal: "8-18mg/j", color: "bg-red-200" },
  { key: "Omega-3", sources: "Poisson, Graines de lin", symptoms: "Troubles humeur, inflammation", optimal: "500mg/j", color: "bg-blue-200" },
  { key: "Iode", sources: "Sel iodé, Poisson blanc", symptoms: "Tristesse, brouillard mental", optimal: "150µg/j", color: "bg-purple-200" }
];

export default function NutrientTracker() {
  const [intake, setIntake] = useState<{ [k: string]: number }>({});
  const [meals, setMeals] = useState("");
  const [supplements, setSupplements] = useState("");
  const [showTips, setShowTips] = useState(false);

  const handleIntakeChange = (key: string, val: number) => {
    setIntake({ ...intake, [key]: val });
  };

  const totalCovered = MICRONUTRIENTS.filter(nut => (intake[nut.key] || 0) > 0.7).length;
  const risk =
    totalCovered >= 3 ? "Faible risque de carence" :
      totalCovered === 2 ? "Risque modéré, à surveiller" :
        "Risque élevé, vigilance!";

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-pink-50 dark:from-gray-900 dark:to-gray-900 py-10 px-2 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <NutrientHeader />
        <Card className="mb-6 rounded-2xl shadow-xl bg-white/95 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              Suivi des Micronutriments essentiels
            </CardTitle>
            <CardDescription>
              Impact mental : Visualisez vos couverts nutritionnels, recevez conseils personnalisés.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <b>1. Estimez vos apports du jour :</b>
              <NutrientGrid
                micronutrients={MICRONUTRIENTS}
                intake={intake}
                onIntakeChange={handleIntakeChange}
              />
            </div>
            <Separator className="my-4" />
            <div>
              <b>2. Vos repas clés :</b>
              <textarea 
                className="w-full mt-1 p-2 border rounded min-h-[48px] text-sm bg-gray-50" 
                placeholder="Déjeuner : salade + œuf... Goûter : fruit..." 
                value={meals} 
                onChange={e => setMeals(e.target.value)} 
              />
              <b className="mt-2 block">Suppléments aujourd'hui :</b>
              <textarea 
                className="w-full mt-1 p-2 border rounded min-h-[32px] text-sm bg-gray-50" 
                placeholder="Magnésium, Vitamine D..." 
                value={supplements} 
                onChange={e => setSupplements(e.target.value)} 
              />
            </div>
            <Separator className="my-4" />
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-600" /><b>Bilan :</b>
              <span className={`${risk.includes("élevé") ? "text-red-700 font-bold" : risk.includes("modéré") ? "text-orange-600" : "text-emerald-800"}`}>{risk}</span>
            </div>
            <NutrientTips showTips={showTips} onToggleTips={() => setShowTips(t => !t)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
