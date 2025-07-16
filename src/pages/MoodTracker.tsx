
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Smile, Meh, Frown, Heart, Brain, Zap } from "lucide-react";

const moods = [
  { icon: Smile, label: "Excellent", color: "text-green-500", value: 5 },
  { icon: Heart, label: "Bien", color: "text-blue-500", value: 4 },
  { icon: Meh, label: "Neutre", color: "text-yellow-500", value: 3 },
  { icon: Brain, label: "Difficile", color: "text-orange-500", value: 2 },
  { icon: Frown, label: "Mal", color: "text-red-500", value: 1 },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Suivi Humeur"
          description="Suivez votre humeur au quotidien pour mieux vous comprendre"
          icon={<Smile className="h-12 w-12 text-pink-500" />}
        />

        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Comment vous sentez-vous aujourd'hui ?</CardTitle>
              <CardDescription>
                Sélectionnez l'humeur qui correspond le mieux à votre état actuel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4 mb-6">
                {moods.map((mood) => {
                  const IconComponent = mood.icon;
                  return (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMood === mood.value
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <IconComponent className={`h-8 w-8 mx-auto mb-2 ${mood.color}`} />
                      <div className="text-sm font-medium">{mood.label}</div>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  Notes (optionnel)
                </label>
                <Textarea
                  placeholder="Que s'est-il passé aujourd'hui ? Comment vous sentez-vous ?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button className="w-full mt-6" disabled={!selectedMood}>
                <Zap className="h-4 w-4 mr-2" />
                Enregistrer mon humeur
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
