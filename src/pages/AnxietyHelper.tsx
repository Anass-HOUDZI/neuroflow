
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Sun, HeartPulse, Phone, ArrowRight } from "lucide-react";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";

const IMMEDIATE_TECHNIQUES = [
  { label: "Grounding 5-4-3-2-1", desc: "Exercice sensoriel pour revenir dans l'instant présent." },
  { label: "Relaxation musculaire progressive", desc: "Relâchez chaque groupe musculaire, orteils à la tête." },
  { label: "Restructuration de la pensée", desc: "Remettez en question vos scénarios catastrophes." },
  { label: "Respiration comptée pour crise", desc: "Inspirez 4s, tenez 4s, expirez 4s, pause 4s (4x4)." },
  { label: "Imagerie guidée", desc: "Visualisez un lieu calmant, utilisez tous vos sens." },
  { label: "Planification du temps d'inquiétude", desc: "Programmez 10 minutes : vos ruminations attendront !" },
  { label: "Exposition graduelle", desc: "Affrontez vos peurs petit à petit, à votre rythme." },
  { label: "Protocole sommeil anxieux", desc: "Routine apaisante et relaxation progressive pour dormir." },
];

const QUESTIONNAIRE = [
  { q: "Ressentez-vous actuellement une angoisse difficile à contrôler ?", key: "anxious_now" },
  { q: "Avez-vous des pensées qui tournent en boucle ?", key: "loops" },
  { q: "Avez-vous peur d'un danger imminent sans preuve concrète ?", key: "catastrophize" },
  { q: "Votre sommeil est-il perturbé par vos inquiétudes ?", key: "sleep" },
  { q: "Avez-vous fait face à une attaque de panique récemment ?", key: "panic" },
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
    <PageLayout className="bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title="AnxietyHelper"
          description="Assistant Anti-Anxiété • Techniques validées par les neurosciences & CBT"
          icon={<HeartPulse className="h-12 w-12 text-pink-600 animate-pulse" />}
        />

        <div className="space-y-8">
          {/* Questionnaire */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 Détection rapide de spirales anxieuses
              </CardTitle>
              <CardDescription>
                Répondez à ces questions pour un conseil ciblé immédiat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {QUESTIONNAIRE.map(q => (
                  <div key={q.key} className="flex items-center justify-between gap-2">
                    <span className="text-sm">{q.q}</span>
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
                  className="mt-6 w-full"
                  size="lg"
                  onClick={() => setShowTechniques(true)}
                  disabled={Object.keys(answers).length < QUESTIONNAIRE.length}
                >
                  {showTechniques ? "Revoir les techniques" : "Voir mes recommandations"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              {detectedPattern && showTechniques && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                    Résultat : {detectedPattern}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Voici des techniques validées pour ce profil :
                  </p>
                  <div className="grid gap-3">
                    {IMMEDIATE_TECHNIQUES.filter((t, idx) => {
                      if (detectedPattern === "Crise aiguë") return idx <= 3;
                      if (detectedPattern === "Anxiété de sommeil") return t.label.toLowerCase().includes("sommeil") || t.label.toLowerCase().includes("relaxation");
                      if (detectedPattern === "Pensées catastrophiques") return t.label.toLowerCase().includes("catastroph");
                      if (detectedPattern === "Ruminations") return t.label.toLowerCase().includes("planification") || t.label.toLowerCase().includes("restructuration");
                      if (detectedPattern === "Anxiété généralisée") return idx === 0 || idx === 1 || idx === 4;
                      return true;
                    }).map(tech => (
                      <div key={tech.label} className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <span className="font-medium text-indigo-700 dark:text-indigo-300">{tech.label}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tech.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="default" className="w-full mt-4" onClick={() => alert("Exercice interactif à venir !")}>
                    Commencer un exercice guidé
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bibliothèque de techniques */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧰 Bibliothèque anti-anxiété
              </CardTitle>
              <CardDescription>Techniques basées sur les neurosciences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {IMMEDIATE_TECHNIQUES.map(tech => (
                  <div key={tech.label} className="p-4 rounded-xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
                    <div className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">{tech.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tech.desc}</div>
                    <Button variant="outline" size="sm" className="w-full"
                      onClick={() => alert("Exercice interactif à venir !")}>
                      Démarrer
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section ressources d'urgence */}
          <Card className="glass-card border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Besoin d'aide immédiate ?
              </CardTitle>
              <CardDescription>
                Ne restez pas seul·e. Voici des ressources gratuites, anonymes, francophones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crisisResources.map(r => (
                  <div key={r.name} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <Phone className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="font-bold text-red-700 dark:text-red-300">{r.name}</span>
                      <div className="text-sm text-red-600 dark:text-red-400">{r.phone}</div>
                    </div>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                      Visiter
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Future features */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                Fonctionnalités à venir
              </CardTitle>
              <CardDescription>
                Relaxation audio, visualisations guidées, sons pour détente profonde
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" disabled className="w-full">
                <HeartPulse className="mr-2 h-4 w-4" />
                Démarrer session audio/visuelle (bientôt)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
