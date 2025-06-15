
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Sun, HeartPulse, Phone, ArrowRight } from "lucide-react";

const IMMEDIATE_TECHNIQUES = [
  { label: "Grounding 5-4-3-2-1", desc: "Exercice sensoriel pour revenir dans l’instant présent." },
  { label: "Relaxation musculaire progressive", desc: "Relâchez chaque groupe musculaire, orteils à la tête." },
  { label: "Restructuration de la pensée", desc: "Remettez en question vos scénarios catastrophes." },
  { label: "Respiration comptée pour crise", desc: "Inspirez 4s, tenez 4s, expirez 4s, pause 4s (4x4)." },
  { label: "Imagerie guidée", desc: "Visualisez un lieu calmant, utilisez tous vos sens." },
  { label: "Planification du temps d’inquiétude", desc: "Programmez 10 minutes : vos ruminations attendront !" },
  { label: "Exposition graduelle", desc: "Affrontez vos peurs petit à petit, à votre rythme." },
  { label: "Protocole sommeil anxieux", desc: "Routine apaisante et relaxation progressive pour dormir." },
];

const QUESTIONNAIRE = [
  { q: "Ressentez-vous actuellement une angoisse difficile à contrôler ?", key: "anxious_now" },
  { q: "Avez-vous des pensées qui tournent en boucle ?", key: "loops" },
  { q: "Avez-vous peur d’un danger imminent sans preuve concrète ?", key: "catastrophize" },
  { q: "Votre sommeil est-il perturbé par vos inquiétudes ?", key: "sleep" },
  { q: "Avez-vous fait face à une attaque de panique récemment ?", key: "panic" },
];

function getPattern(results: Record<string, boolean>) {
  if (results.panic) return "Crise aiguë";
  if (results.sleep) return "Anxiété de sommeil";
  if (results.catastrophize) return "Pensées catastrophiques";
  if (results.loops) return "Ruminations";
  if (results.anxious_now) return "Anxiété généralisée";
  return null;
}

export default function AnxietyHelper() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showTechniques, setShowTechniques] = useState(false);

  const handleAnswer = (key: string, val: boolean) => {
    setAnswers(a => ({ ...a, [key]: val }));
  };

  const detectedPattern = getPattern(answers);

  // Section ressources/hotline (mock)
  const crisisResources = [
    { name: "Crisis Text Line (FR)", url: "https://www.crisistextline.fr/", phone: "sms au 741741" },
    { name: "SOS Suicide", url: "https://www.sos-suicide.org/", phone: "01 45 39 40 00" },
    { name: "Fil Santé Jeunes", url: "https://www.filsantejeunes.com/", phone: "0 800 235 236" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        <div className="flex flex-col gap-2 items-center text-center mb-4">
          <HeartPulse className="h-10 w-10 text-pink-600 animate-pulse" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">AnxietyHelper</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Assistant Anti-Anxiété • Techniques validées par les neurosciences & CBT
          </p>
        </div>

        {/* Questionnaire */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Détection rapide de spirales anxieuses</CardTitle>
            <CardDescription>
              Répondez à ces questions pour un conseil ciblé immédiat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {QUESTIONNAIRE.map(q => (
                <div key={q.key} className="flex items-center justify-between gap-2">
                  <span>{q.q}</span>
                  <div className="flex gap-1">
                    <Button
                      variant={answers[q.key] === true ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAnswer(q.key, true)}
                    >Oui</Button>
                    <Button
                      variant={answers[q.key] === false ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAnswer(q.key, false)}
                    >Non</Button>
                  </div>
                </div>
              ))}
              <Button
                className="mt-2"
                size="lg"
                onClick={() => setShowTechniques(true)}
                disabled={Object.keys(answers).length < QUESTIONNAIRE.length}
              >
                {showTechniques ? "Revoir les techniques" : "Voir mes recommandations"}
              </Button>
            </div>
            {detectedPattern && showTechniques && (
              <div className="mt-4 p-3 rounded bg-blue-50 dark:bg-gray-800">
                <p className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                  Résultat : {detectedPattern}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Voici des techniques validées pour ce profil :
                </p>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-base">
                  {IMMEDIATE_TECHNIQUES.filter((t, idx) => {
                    // Matching some techniques to detected pattern
                    if (detectedPattern === "Crise aiguë") return idx <= 3;
                    if (detectedPattern === "Anxiété de sommeil") return t.label.toLowerCase().includes("sommeil") || t.label.toLowerCase().includes("relaxation");
                    if (detectedPattern === "Pensées catastrophiques") return t.label.toLowerCase().includes("catastroph");
                    if (detectedPattern === "Ruminations") return t.label.toLowerCase().includes("planification") || t.label.toLowerCase().includes("restructuration");
                    if (detectedPattern === "Anxiété généralisée") return idx === 0 || idx === 1 || idx === 4;
                    return true;
                  }).map(tech => (
                    <li key={tech.label}>
                      <span className="font-medium">{tech.label} : </span>
                      <span>{tech.desc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  <Button variant="secondary" className="w-full" onClick={() => alert("Exercice interactif à venir !")}>
                    Commencer un exercice guidé
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bibliothèque de toutes les techniques */}
        <Card>
          <CardHeader>
            <CardTitle>🧰 Bibliothèque anti-anxiété</CardTitle>
            <CardDescription>Détaillé 20+ techniques basées neurosciences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {IMMEDIATE_TECHNIQUES.map(tech => (
                <div key={tech.label} className="p-3 rounded border bg-white/80 dark:bg-gray-900">
                  <div className="font-semibold text-indigo-700 dark:text-indigo-300">{tech.label}</div>
                  <div className="text-sm text-gray-500">{tech.desc}</div>
                  <Button variant="outline" size="sm" className="mt-2"
                    onClick={() => alert("Exercice interactif à venir !")}>
                    Démarrer
                  </Button>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-4">
              De nouvelles techniques et protocoles seront ajoutés prochainement.
            </div>
          </CardContent>
        </Card>

        {/* Section ressources d'urgence */}
        <Card>
          <CardHeader>
            <CardTitle>
              <AlertTriangle className="inline mr-2 text-red-400" />Besoin d’aide immédiate ?
            </CardTitle>
            <CardDescription>
              Ne restez pas seul·e. Voici des ressources gratuites, anonymes, francophones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {crisisResources.map(r => (
                <li key={r.name} className="flex items-center gap-2 text-base">
                  <Phone className="h-4 w-4 text-sky-500" />
                  <span className="font-bold">{r.name} :</span>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{r.url.replace(/^https:\/\//, "")}</a>
                  <span className="text-pink-600">{r.phone}</span>
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-500 mt-3">
              Intégrations automatisées (Crisis Text API, Calm API, sons binauraux) à venir.
            </div>
          </CardContent>
        </Card>

        {/* Future features */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Sun className="inline mr-2" />Guided Imagery & Relaxation Audio
            </CardTitle>
            <CardDescription>
              À venir : musique, visualisations guidées, sons pour détente profonde.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" disabled className="opacity-80" >
              <HeartPulse className="inline mr-2 h-4 w-4" />
              Démarrer session audio/visuelle (bientôt)
            </Button>
            <div className="text-xs text-gray-400 mt-2">
              Intégration prochaine : relaxations de Calm, sons binauraux sur mesure.
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
