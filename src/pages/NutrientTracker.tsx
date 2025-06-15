
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Apple, Salad, Pill, Leaf, CheckCircle, Info, Circle } from "lucide-react";

const MICRONUTRIENTS = [
  { key: "Vitamin D", sources: "Saumon, Oeuf, Soleil", symptoms: "Fatigue, humeur basse", optimal: "600 IU/j", color: "bg-yellow-200" },
  { key: "Magnésium", sources: "Amande, Epinard, Chocolat noir", symptoms: "Anxiété, crampes", optimal: "320-420mg/j", color: "bg-green-200" },
  { key: "Fer", sources: "Lentilles, Boeuf, Légumes verts", symptoms: "Fatigue, essoufflement", optimal: "8-18mg/j", color: "bg-red-200" },
  { key: "Omega-3", sources: "Poisson, Graines de lin", symptoms: "Troubles humeur, inflammation", optimal: "500mg/j", color: "bg-blue-200" },
  { key: "Iode", sources: "Sel iodé, Poisson blanc", symptoms: "Tristesse, brouillard mental", optimal: "150µg/j", color: "bg-purple-200" }
];

export default function NutrientTracker() {
  const [intake, setIntake] = useState<{[k:string]:number}>({});
  const [meals, setMeals] = useState("");
  const [supplements, setSupplements] = useState("");
  const [showTips, setShowTips] = useState(false);

  const handleIntakeChange = (key: string, val: number) => {
    setIntake({ ...intake, [key]: val });
  };

  // Dummy risk score: low if at least 3 nutrients >=70%, med if 2, high if 0-1
  const totalCovered = MICRONUTRIENTS.filter(nut => (intake[nut.key] || 0) > 0.7).length;
  const risk =
    totalCovered >= 3 ? "Faible risque de carence" :
    totalCovered === 2 ? "Risque modéré, à surveiller" :
    "Risque élevé, vigilance!";

  return (
    <div className="max-w-2xl mx-auto py-10 px-2 animate-fade-in">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf /> NutrientTracker – Suivi Micronutriments
          </CardTitle>
          <CardDescription>Impact mental : Optimisez vos apports pour soutient du bien-être neuropsychique</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <b>1. Évaluez vos principaux apports d'aujourd'hui :</b>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {MICRONUTRIENTS.map((nut) => (
                <div key={nut.key} className={`rounded p-3 flex flex-col shadow-sm ${nut.color}`}>
                  <div className="flex items-center gap-2 font-semibold"><Circle size={15}/> {nut.key}</div>
                  <label className="text-[13px] mt-1">Estimation de l'apport : 
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      value={intake[nut.key] || 0}
                      onChange={e=>handleIntakeChange(nut.key, parseFloat(e.target.value))}
                      className="w-full my-1"
                    />
                  </label>
                  <Progress value={((intake[nut.key] || 0)*100)} className="h-2 mt-1"/>
                  <span className="text-xs">{Math.round((intake[nut.key] || 0)*100)}% du besoin</span>
                  <span className="text-xs text-gray-500">Sources : {nut.sources}</span>
                  <span className="text-xs text-gray-400">Symptômes carence : {nut.symptoms}</span>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-3"/>
          <div>
            <b>2. Vos repas/clés (alimentaires) :</b>
            <textarea className="w-full mt-1 p-2 border rounded min-h-[48px] text-sm" placeholder="Déjeuner : salade + œuf... Goûter : fruit..." value={meals} onChange={e=>setMeals(e.target.value)}/>
            <b className="mt-2 block">Suppléments aujourd'hui :</b>
            <textarea className="w-full mt-1 p-2 border rounded min-h-[32px] text-sm" placeholder="Magnésium, Vitamine D..." value={supplements} onChange={e=>setSupplements(e.target.value)} />
          </div>
          <Separator className="my-3"/>
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-600"/><b>Bilan :</b>
            <span className={`${risk.includes("élevé")?"text-red-700 font-bold":risk.includes("modéré")?"text-orange-600":"text-emerald-800"}`}>{risk}</span>
          </div>
          <Button size="sm" variant="outline" onClick={()=>setShowTips(t=>!t)} className="mb-2">{showTips ? "Masquer" : "Voir"} conseils nutritionnels</Button>
          {showTips && (
            <div className="space-y-2 text-xs rounded bg-sky-50 border px-3 py-2 my-2">
              <b>Bio-disponibilité :</b> Cuire peu, associer Vitamine C (ex. poivron cru) avec Fer végétal pour booster absorption.<br/>
              <b>Interactions :</b> Calcium et Fer se concurrencent, éviter ensemble. <br/>
              <b>Timing :</b> Prendre le magnésium plutôt soir pour la détente.<br/>
              <b>Suppléments :</b> Toujours vérifier interactions médicaments-suppléments avec un professionnel.<br/>
              <b>Marqueurs santé :</b> Fatigue persistante ? Parlez à votre médecin et envisagez une prise de sang.
            </div>
          )}
          <Separator className="my-3"/>
          <details>
            <summary className="cursor-pointer font-semibold text-blue-700"><Info className="inline w-4 h-4 mr-1"/>À propos micronutriments</summary>
            <div className="text-xs mt-2 space-y-2">
              <b>Base de données : </b> Données issues des références Anses/EFSA et littérature neuroscience.<br/>
              <b>Aliments : </b> Bio-disponibilité variable selon cuisson/associations.<br/>
              <b>Symptômes : </b> Questionnaire qualitatif (non diagnostique).<br/>
              Une approche personnalisée nécessite un suivi professionnel. Les conseils sont informatifs.
            </div>
          </details>
        </CardContent>
      </Card>
    </div>
  );
}
