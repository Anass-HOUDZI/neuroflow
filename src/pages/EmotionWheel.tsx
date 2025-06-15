
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Smile } from "lucide-react";

const EMOTION_WHEEL = [
  {
    label: "Joie",
    color: "#FFD600",
    secondary: [
      { label: "Optimisme", nuances: ["Enthousiasme", "Espoir", "Inspiration"] },
      { label: "Fierté", nuances: ["Confiance", "Contentement", "Satisfaction"] },
      { label: "Amour", nuances: ["Tendresse", "Affection", "Attachement"] },
    ],
  },
  {
    label: "Confiance",
    color: "#4DD4B1",
    secondary: [
      { label: "Intérêt", nuances: ["Motivation", "Curiosité", "Ouverture"] },
      { label: "Acceptation", nuances: ["Sérénité", "Affinité"] },
    ],
  },
  {
    label: "Peur",
    color: "#5A9EFF",
    secondary: [
      { label: "Inquiétude", nuances: ["Nervosité", "Crainte", "Doute"] },
      { label: "Terreur", nuances: ["Panique", "Horreur"] },
      { label: "Appréhension", nuances: ["Incroyance", "Suspicion"] },
    ],
  },
  {
    label: "Surprise",
    color: "#AE81FF",
    secondary: [
      { label: "Étonnement", nuances: ["Amazement", "Stupéfaction"] },
      { label: "Confusion", nuances: ["Perplexité", "Incompréhension"] },
    ],
  },
  {
    label: "Tristesse",
    color: "#70A1D7",
    secondary: [
      { label: "Découragement", nuances: ["Désespoir", "Abattement"] },
      { label: "Solitude", nuances: ["Isolement", "Rejet"] },
      { label: "Pitié", nuances: ["Empathie", "Compassion"] },
    ],
  },
  {
    label: "Dégoût",
    color: "#79C9B7",
    secondary: [
      { label: "Mépris", nuances: ["Aversion", "Révolte"] },
      { label: "Abandon", nuances: ["Déception", "Répulsion"] },
    ],
  },
  {
    label: "Colère",
    color: "#FF5252",
    secondary: [
      { label: "Frustration", nuances: ["Exaspération", "Agacement"] },
      { label: "Irritation", nuances: ["Rancune", "Hostilité"] },
      { label: "Rage", nuances: ["Fureur", "Indignation"] },
    ],
  },
  {
    label: "Anticipation",
    color: "#FFC347",
    secondary: [
      { label: "Attention", nuances: ["Vigilance", "Préparation"] },
      { label: "Intérêt", nuances: ["Enthousiasme", "Excitation"] },
    ],
  },
];

const REGULATION_TECHNIQUES: Record<string, string[]> = {
  Joie: [
    "Ancrage positif : prends 10s pour savourer pleinement la sensation !",
    "Partage ton émotion avec quelqu'un.",
  ],
  Confiance: [
    "Fais-toi un compliment ou note une réussite récente.",
    "Visualise un souvenir où tu as bien géré une difficulté.",
  ],
  Peur: [
    "Respiration profonde (inspire 5s, expire 5s, 4 cycles).",
    "Grounding : nomme 5 choses que tu vois/touches autour de toi.",
  ],
  Surprise: [
    "Observe et accueille : note cette surprise sans juger.",
    "Note les pensées qui te traversent."
  ],
  Tristesse: [
    "Respirer calmement, autorise-toi à ressentir.",
    "Écris ce qui cause ta tristesse, sans filtre.",
  ],
  Dégoût: [
    "Observe ce ressenti, protège-toi si besoin.",
    "Prends un moment à l'écart, respire profondément.",
  ],
  Colère: [
    "Compter lentement jusqu'à 10 avant de réagir.",
    "Exprime calmement ce qui t’a contrarié dans un journal.",
  ],
  Anticipation: [
    "Visualise des issues positives.",
    "Prépare une action concrète liée à ton objectif.",
  ]
};

export default function EmotionWheel() {
  const [activePrimary, setActivePrimary] = useState<number | null>(null);
  const [activeSecondary, setActiveSecondary] = useState<number | null>(null);
  const [activeNuance, setActiveNuance] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // reset on new selection
  const handlePrimary = (idx: number) => {
    setActivePrimary(idx);
    setActiveSecondary(null);
    setActiveNuance(null);
    setSubmitted(false);
  };

  const handleSecondary = (idx: number) => {
    setActiveSecondary(idx);
    setActiveNuance(null);
    setSubmitted(false);
  };

  const handleNuance = (nuance: string) => {
    setActiveNuance(nuance);
    setSubmitted(false);
  };

  const handleJournal = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Basic Plutchik wheel layout (circular grid)
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Smile className="h-10 w-10 text-yellow-400" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">EmotionWheel</h1>
          <p className="text-md text-gray-600 dark:text-gray-300 text-center">
            Roue des Émotions interactive (basée neurosciences)<br />
            Granularité émotionnelle = meilleure auto-régulation
          </p>
        </div>
        {/* Wheel SVG */}
        <Card>
          <CardHeader>
            <CardTitle>🎡 Sélectionne ton émotion</CardTitle>
            <CardDescription>
              Commence par une émotion primaire, explore les nuances
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Primary emotions as a radial/circular grid */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {EMOTION_WHEEL.map((emo, idx) => (
                <Button
                  key={emo.label}
                  size="sm"
                  variant={activePrimary === idx ? "default" : "outline"}
                  style={{ background: activePrimary === idx ? emo.color : undefined, color: "#222", borderColor: emo.color, fontWeight: "bold" }}
                  onClick={() => handlePrimary(idx)}
                >
                  {emo.label}
                </Button>
              ))}
            </div>
            {/* Secondary emotions */}
            {activePrimary !== null && (
              <div className="flex flex-wrap gap-2 mb-3 justify-center animate-fade-in">
                {EMOTION_WHEEL[activePrimary].secondary.map((sec, idx) => (
                  <Button
                    key={sec.label}
                    size="sm"
                    variant={activeSecondary === idx ? "default" : "outline"}
                    className="border"
                    style={{ background: activeSecondary === idx ? EMOTION_WHEEL[activePrimary].color : undefined, color: "#222", borderColor: EMOTION_WHEEL[activePrimary].color, fontWeight: "normal" }}
                    onClick={() => handleSecondary(idx)}
                  >
                    {sec.label}
                  </Button>
                ))}
              </div>
            )}
            {/* Nuances */}
            {activePrimary !== null && activeSecondary !== null && (
              <div className="flex flex-wrap gap-2 mb-4 justify-center animate-fade-in">
                {EMOTION_WHEEL[activePrimary].secondary[activeSecondary].nuances.map(nuance => (
                  <Button
                    key={nuance}
                    size="sm"
                    variant={activeNuance === nuance ? "default" : "outline"}
                    style={{ background: activeNuance === nuance ? EMOTION_WHEEL[activePrimary].color : undefined, color: "#222", borderColor: EMOTION_WHEEL[activePrimary].color }}
                    onClick={() => handleNuance(nuance)}
                  >
                    {nuance}
                  </Button>
                ))}
              </div>
            )}

            {/* Intensity slider */}
            {(activePrimary !== null || activeNuance) && (
              <div className="flex items-center gap-3 mb-2 mt-4">
                <span>Intensité</span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={intensity}
                  onChange={e => setIntensity(Number(e.target.value))}
                  className="accent-amber-400 w-40"
                />
                <span className="font-bold" style={{
                  color: activePrimary !== null ? EMOTION_WHEEL[activePrimary].color : "#bbb"
                }}>{intensity}/10</span>
              </div>
            )}
            {/* Contextual journal */}
            {(activePrimary !== null || activeNuance) && (
              <form onSubmit={handleJournal} className="flex flex-col gap-3 mt-4">
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Contexte / situation liée à cette émotion
                </label>
                <Textarea
                  value={context}
                  onChange={e => setContext(e.target.value)}
                  rows={2}
                  placeholder="Décris très brièvement la situation, personnes, pensées, etc."
                />
                <Button type="submit" className="self-end">Valider</Button>
              </form>
            )}
            {/* Résultat + techniques */}
            {(submitted && activePrimary !== null) && (
              <div className="mt-6 p-4 rounded bg-orange-50 dark:bg-gray-900 animate-fade-in">
                <div className="font-semibold text-lg" style={{ color: EMOTION_WHEEL[activePrimary].color }}>
                  {EMOTION_WHEEL[activePrimary].label}{activeSecondary !== null && <> &rarr; {EMOTION_WHEEL[activePrimary].secondary[activeSecondary].label}</>}
                  {activeNuance && <> &rarr; {activeNuance}</>}
                </div>
                <div className="mt-3">
                  <div>Intensité ressentie : <span className="font-bold">{intensity}/10</span></div>
                  {context &&
                    <div>Contexte : <span className="italic">{context}</span></div>
                  }
                </div>
                <div className="mt-4">
                  <div className="font-medium">Suggestions de régulation adaptées :</div>
                  <ul className="list-disc ml-5 mt-1 space-y-1 text-base">
                    {(REGULATION_TECHNIQUES[EMOTION_WHEEL[activePrimary].label] ?? []).map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                  <div className="text-xs text-gray-400 mt-2">
                    Techniques plus personnalisées et relaxation guidée prochainement.
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Avancées & autres fonctionnalités */}
        <Card>
          <CardHeader>
            <CardTitle>🧠 Fonctions avancées à venir</CardTitle>
            <CardDescription>Ces fonctionnalités arrivent prochainement :</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-4 space-y-1 text-gray-600 dark:text-gray-400 text-sm">
              <li>Export données émotionnelles (PDF/CSV) sécurisé</li>
              <li>Détection patterns : cycles, triggers, corrélations météo (API météo)</li>
              <li>Mode kid-friendly : emojis, teintes vives</li>
              <li>Statistiques long terme, tendances</li>
              <li>Notifications check-in bienveillant quotidien</li>
              <li>Intégration calendrier (événements & émotions)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
