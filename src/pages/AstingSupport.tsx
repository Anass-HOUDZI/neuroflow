
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Timer, TimerOff } from "lucide-react";

const PROTOCOLS = [
  {
    key: "16-8",
    label: "16:8 (16h de jeûne / 8h alimentation)",
    window: 16,
    eat: 8,
    description: "Le plus populaire, idéal quotidien. 16h de jeûne, 8h pour manger."
  },
  {
    key: "5-2",
    label: "5:2 (5 j. normal, 2 j. réduits)",
    window: 24,
    eat: "libre",
    description: "5 jours d'alimentation normale, 2 jours restrictifs (<500 kcal)."
  }
];

const FASTING_PHASES = [
  { hour: 0, label: "Début (glycémie normale)" },
  { hour: 8, label: "Glycogène ↓" },
  { hour: 12, label: "Lipolyse ↑" },
  { hour: 16, label: "Cétose débute" },
  { hour: 18, label: "Corps cétoniques ↑" },
  { hour: 24, label: "Autophagie optimale" }
];

const initialState = {
  selectedProtocol: "16-8",
  isFasting: false,
  fastingStart: null as null | number,
  elapsed: 0,
  symptoms: "",
  entry: "",
  currentPhaseLabel: "Début"
};

const now = () => Date.now();

export default function AstingSupport() {
  const [protocol, setProtocol] = useState(initialState.selectedProtocol);
  const [isFasting, setIsFasting] = useState(initialState.isFasting);
  const [fastingStart, setFastingStart] = useState<number | null>(initialState.fastingStart);
  const [elapsed, setElapsed] = useState(initialState.elapsed);
  const [symptoms, setSymptoms] = useState("");
  const [entry, setEntry] = useState("");
  const [phaseLabel, setPhaseLabel] = useState(initialState.currentPhaseLabel);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isFasting && fastingStart) {
      interval = setInterval(() => {
        const diff = Math.floor((now() - fastingStart) / 1000);
        setElapsed(diff);
        // phase calculation
        let current = "Début";
        for (let i = FASTING_PHASES.length - 1; i >= 0; i--) {
          if (Math.floor(diff / 3600) >= FASTING_PHASES[i].hour) {
            current = FASTING_PHASES[i].label;
            break;
          }
        }
        setPhaseLabel(current);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFasting, fastingStart]);

  // Format elapsed time
  function formatTime(sec:number) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${h}h ${m}min`;
  }

  // Protocol setup
  function handleProtocolChange(val: string) {
    setProtocol(val);
    setIsFasting(false);
    setFastingStart(null);
    setElapsed(0);
  }

  // Timer controls
  function startFasting() {
    setFastingStart(now());
    setIsFasting(true);
    setElapsed(0);
  }
  function stopFasting() {
    setIsFasting(false);
    setFastingStart(null);
    setElapsed(0);
  }

  // Symptoms/progress saving (local)
  function handleSave() {
    // On stocke dans localStorage pour la démo rapide
    window.localStorage.setItem(
      "fst_"+Date.now(),
      JSON.stringify({
        protocol,
        elapsed,
        symptoms,
        entry
      })
    );
    setSymptoms("");
    setEntry("");
  }

  // Disclaimers
  function Disclaimer() {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>⚠️ Sécurité / Disclaimer médical</AlertTitle>
        <AlertDescription>
          Ne commencez jamais un protocole de jeûne sans avis médical si vous avez un trouble métabolique, prenez des médicaments, êtes enceinte/allaitante, ou tout autre condition à risque.
          <br/>
          <strong>L’application ne remplace pas un suivi médical.</strong>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-2 animate-fade-in">
      <Disclaimer/>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="text-blue-600"/> AstingSupport - Accompagnement Jeûne
          </CardTitle>
          <CardDescription>
            Optimisez votre pratique du jeûne intermittent grâce aux conseils neuroscientifiques et protocoles adaptés.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <strong>Choisir protocole :</strong>
            <RadioGroup value={protocol} onValueChange={handleProtocolChange} className="mt-2 space-y-1">
              {PROTOCOLS.map((p) => (
                <div key={p.key} className="flex items-center gap-2">
                  <RadioGroupItem value={p.key} id={p.key} />
                  <label htmlFor={p.key} className="text-sm cursor-pointer">{p.label}</label>
                  <span className="text-xs text-gray-500 italic ml-2">{p.description}</span>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Separator className="my-4"/>
          <div className="flex items-center gap-4 mb-2">
            {isFasting ? (
              <>
                <Button variant="destructive" size="sm" onClick={stopFasting}>
                  <TimerOff className="mr-1 w-4 h-4"/> Arrêter
                </Button>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-bold">{formatTime(elapsed)}</span>
                  <span className="text-sm text-blue-600">{phaseLabel}</span>
                </div>
              </>
            ) : (
              <Button variant="default" size="sm" onClick={startFasting}>
                <Timer className="mr-1 w-4 h-4"/> Démarrer jeûne
              </Button>
            )}
          </div>
          <Progress value={isFasting && protocol === "16-8" ? Math.min((elapsed/57600)*100,100) : (isFasting ? Math.min((elapsed/86400)*100,100) : 0)} className="h-3 mt-2"/>
          <span className="text-xs text-gray-400">
            {protocol==="16-8"
              ? "Objectif : 16h - Phase autophagie vers 16-24h"
              : "Objectif : 5:2 - 24h de jeûne léger, 2x/semaine"}
          </span>
          <Separator className="my-4"/>
          <details className="mb-2">
            <summary className="cursor-pointer font-semibold text-blue-700">Guide accompagnement (protocole, rupture, symptômes…)</summary>
            <div className="text-xs mt-2 space-y-2">
              <b>Autophagie :</b> plus probable après 16-24h de jeûne complet.<br/>
              <b>Signes de rupture :</b> fatigue inhabituelle, sensations vertigineuses, nausées : rompez le jeûne.<br/>
              <b>Gestion symptômes :</b> hydratez-vous, privilégiez eau/infusions, électrolytes selon symptômes (sodium/magnésium).<br/>
              <b>Rupture :</b> faites-le avec douceur, petit repas facile à digérer, évitez sucres rapides.<br/>
              <b>Electrolytes :</b> Adaptez en cas de crampes, palpitations, fatigue extrême.<br/>
              <b>Contre-indications :</b> antécédents médicaux, grossesse, diabète traité, troubles alimentaires.<br/>
            </div>
          </details>
          <Separator className="my-2"/>
          <div className="mb-2">
            <strong>Signaler symptômes / noter évolution :</strong>
            <textarea
              className="w-full mt-1 p-2 border rounded min-h-[72px] text-sm"
              placeholder="J'ai ressenti une légère fatigue, crampe, etc..."
              value={symptoms}
              onChange={e => setSymptoms(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <strong>Note personnelle / réussite sur cette session :</strong>
            <textarea
              className="w-full mt-1 p-2 border rounded min-h-[48px] text-sm"
              placeholder="J'ai bien vécu le jeûne aujourd'hui..."
              value={entry}
              onChange={e => setEntry(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={handleSave} className="mt-2">Sauvegarder progression</Button>
          <span className="text-xs text-gray-400 block mt-1">Les données restent strictement locales (confidentialité).</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions fréquentes & Sécurité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <b>Quels symptômes surveiller&nbsp;?</b> Déshydratation, malaise inhabituel, extrême fatigue : arrêtez immédiatement.
          <br/>
          <b>Jeûne et médicaments&nbsp;?</b> Toujours consulter un professionnel de santé avant de modifier vos rythmes alimentaires.
          <br/>
          <b>En cas de doute </b>: arrêtez le jeûne, hydratez, consultez un médecin.
          <br/>
          <b>Communauté&nbsp;?</b> (À venir) - communauté d'entraide pour soutenir la motivation et échanger conseils.
        </CardContent>
      </Card>
    </div>
  );
}
