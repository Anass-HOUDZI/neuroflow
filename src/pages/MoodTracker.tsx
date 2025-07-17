
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Smile, Meh, Frown, Heart, Brain, Zap, BarChart3, Download } from "lucide-react";
import { useWellnessStore } from "@/core/stores/wellnessStore";
import { MoodVisualization } from "@/modules/wellness/components/MoodVisualization";
import { MoodHistory } from "@/modules/wellness/components/MoodHistory";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { icon: Smile, label: "Excellent", color: "text-green-500", value: 5 },
  { icon: Heart, label: "Bien", color: "text-blue-500", value: 4 },
  { icon: Meh, label: "Neutre", color: "text-yellow-500", value: 3 },
  { icon: Brain, label: "Difficile", color: "text-orange-500", value: 2 },
  { icon: Frown, label: "Mal", color: "text-red-500", value: 1 },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const [selectedStress, setSelectedStress] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const { addMoodEntry, moodEntries } = useWellnessStore();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedMood || !selectedEnergy || !selectedStress) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    addMoodEntry({
      date: new Date().toISOString(),
      mood: selectedMood,
      energy: selectedEnergy,
      stress: selectedStress,
      notes: note || undefined
    });

    // Reset form
    setSelectedMood(null);
    setSelectedEnergy(null);
    setSelectedStress(null);
    setNote("");

    toast({
      title: "Humeur enregistrée",
      description: "Votre entrée a été sauvegardée avec succès"
    });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(moodEntries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mood-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Suivi Humeur"
          description="Suivez votre humeur au quotidien pour mieux vous comprendre"
          icon={<Smile className="h-12 w-12 text-pink-500" />}
        />

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="entry" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="entry">Nouvelle entrée</TabsTrigger>
              <TabsTrigger value="charts">
                <BarChart3 className="h-4 w-4 mr-2" />
                Visualisations
              </TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="entry" className="space-y-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Comment vous sentez-vous aujourd'hui ?</CardTitle>
                  <CardDescription>
                    Évaluez votre humeur, énergie et niveau de stress
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mood Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Humeur générale</label>
                    <div className="grid grid-cols-5 gap-3">
                      {moods.map((mood) => {
                        const IconComponent = mood.icon;
                        return (
                          <button
                            key={mood.value}
                            onClick={() => setSelectedMood(mood.value)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedMood === mood.value
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <IconComponent className={`h-6 w-6 mx-auto mb-1 ${mood.color}`} />
                            <div className="text-xs font-medium">{mood.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Energy Level */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Niveau d'énergie</label>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedEnergy(level)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedEnergy === level
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Zap className={`h-6 w-6 mx-auto mb-1 ${
                            level <= 2 ? 'text-red-500' :
                            level <= 3 ? 'text-yellow-500' :
                            'text-green-500'
                          }`} />
                          <div className="text-xs font-medium">{level}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stress Level */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Niveau de stress</label>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedStress(level)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedStress === level
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Brain className={`h-6 w-6 mx-auto mb-1 ${
                            level <= 2 ? 'text-green-500' :
                            level <= 3 ? 'text-yellow-500' :
                            'text-red-500'
                          }`} />
                          <div className="text-xs font-medium">{level}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Notes (optionnel)
                    </label>
                    <Textarea
                      placeholder="Que s'est-il passé aujourd'hui ? Comment vous sentez-vous ?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    className="w-full" 
                    disabled={!selectedMood || !selectedEnergy || !selectedStress}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Enregistrer mon humeur
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="charts" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Analyse de vos données</h2>
                <Button onClick={exportData} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
              <MoodVisualization />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <MoodHistory />
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
