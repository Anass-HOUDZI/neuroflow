
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flower, TreePine } from "lucide-react";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { GratitudeGardenDisplay, Gratitude } from "@/components/gratitude/GratitudeGarden";
import { GratitudeForm } from "@/components/gratitude/GratitudeForm";
import { GRATITUDE_CATEGORIES, GratitudeCategory } from "@/components/gratitude/GratitudeCategories";

const GRATITUDE_PROMPTS = [
  "Qu'est-ce qui t'a fait sourire aujourd'hui ?",
  "Quelle personne a illuminé ta journée ?",
  "Quel petit plaisir as-tu savouré récemment ?",
  "Pour quel progrès personnel es-tu reconnaissant(e) ?",
  "Quelle beauté naturelle t'a touché(e) ?",
  "Quel moment de paix as-tu vécu ?",
  "Quelle découverte t'a enrichi(e) ?",
  "Quel geste bienveillant as-tu reçu ou donné ?"
];

export default function GratitudeGarden() {
  const [gratitudes, setGratitudes] = useLocalStorage<Gratitude[]>('gratitude-garden', []);
  const [newGratitude, setNewGratitude] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GratitudeCategory>(GRATITUDE_CATEGORIES[0]);
  const [currentPrompt, setCurrentPrompt] = useState(GRATITUDE_PROMPTS[0]);
  const [todaysCount, setTodaysCount] = useState(0);

  useEffect(() => {
    // Count today's gratitudes
    const today = new Date().toDateString();
    const todayCount = gratitudes.filter((g) => 
      new Date(g.date).toDateString() === today
    ).length;
    setTodaysCount(todayCount);
    
    // Random prompt
    setCurrentPrompt(GRATITUDE_PROMPTS[Math.floor(Math.random() * GRATITUDE_PROMPTS.length)]);
  }, [gratitudes]);

  const addGratitude = () => {
    if (!newGratitude.trim()) return;
    
    const gratitude: Gratitude = {
      id: Date.now().toString(),
      text: newGratitude,
      category: selectedCategory.name,
      date: new Date().toISOString(),
      plantType: selectedCategory.plantType
    };
    
    setGratitudes([...gratitudes, gratitude]);
    setNewGratitude("");
    setTodaysCount(prev => prev + 1);
    
    // New random prompt
    setCurrentPrompt(GRATITUDE_PROMPTS[Math.floor(Math.random() * GRATITUDE_PROMPTS.length)]);
  };

  const recentGratitudes = gratitudes.slice(-5).reverse();

  return (
    <PageLayout className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <PageHeader
          title="GratitudeGarden"
          description="Cultive ton bien-être avec la gratitude quotidienne 🌱"
          icon={<Flower className="h-10 w-10 text-pink-500" />}
          actions={
            <div className="flex items-center justify-center gap-4 text-sm">
              <Badge variant="secondary">{gratitudes.length} gratitudes totales</Badge>
              <Badge variant="secondary">{todaysCount}/3 aujourd'hui</Badge>
            </div>
          }
        />

        {/* Garden Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-green-600" />
              Ton Jardin de Gratitude
            </CardTitle>
            <CardDescription>
              Chaque gratitude fait pousser une nouvelle plante dans ton jardin personnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GratitudeGardenDisplay gratitudes={gratitudes} />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Add Gratitude */}
          <Card>
            <CardHeader>
              <CardTitle>✨ Nouvelle Gratitude</CardTitle>
            </CardHeader>
            <CardContent>
              <GratitudeForm
                newGratitude={newGratitude}
                onGratitudeChange={setNewGratitude}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                onSubmit={addGratitude}
                currentPrompt={currentPrompt}
                todaysCount={todaysCount}
              />
            </CardContent>
          </Card>

          {/* Recent Gratitudes */}
          <Card>
            <CardHeader>
              <CardTitle>📖 Dernières Gratitudes</CardTitle>
              <CardDescription>
                Tes moments de reconnaissance récents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentGratitudes.length > 0 ? (
                <div className="space-y-3">
                  {recentGratitudes.map((gratitude) => (
                    <div key={gratitude.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{gratitude.plantType}</span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 dark:text-gray-300">{gratitude.text}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {gratitude.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(gratitude.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Tes gratitudes apparaîtront ici...
                </p>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </PageLayout>
  );
}
