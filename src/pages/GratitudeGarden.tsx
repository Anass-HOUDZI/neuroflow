
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Flower, Heart, Sun, Sprout, TreePine, Leaf } from "lucide-react";

const GRATITUDE_CATEGORIES = [
  { name: "Relations", icon: Heart, color: "bg-pink-100 text-pink-600", plantType: "🌹" },
  { name: "Progrès perso", icon: Sprout, color: "bg-green-100 text-green-600", plantType: "🌱" },
  { name: "Nature", icon: TreePine, color: "bg-emerald-100 text-emerald-600", plantType: "🌲" },
  { name: "Santé", icon: Sun, color: "bg-yellow-100 text-yellow-600", plantType: "🌻" },
  { name: "Créativité", icon: Flower, color: "bg-purple-100 text-purple-600", plantType: "🌺" },
  { name: "Général", icon: Leaf, color: "bg-blue-100 text-blue-600", plantType: "🍀" }
];

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

interface Gratitude {
  id: string;
  text: string;
  category: string;
  date: string;
  plantType: string;
}

export default function GratitudeGarden() {
  const [gratitudes, setGratitudes] = useState<Gratitude[]>([]);
  const [newGratitude, setNewGratitude] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(GRATITUDE_CATEGORIES[0]);
  const [currentPrompt, setCurrentPrompt] = useState(GRATITUDE_PROMPTS[0]);
  const [todaysCount, setTodaysCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('gratitude-garden');
    if (stored) {
      const parsed = JSON.parse(stored);
      setGratitudes(parsed);
      
      // Count today's gratitudes
      const today = new Date().toDateString();
      const todayCount = parsed.filter((g: Gratitude) => 
        new Date(g.date).toDateString() === today
      ).length;
      setTodaysCount(todayCount);
    }
    
    // Random prompt
    setCurrentPrompt(GRATITUDE_PROMPTS[Math.floor(Math.random() * GRATITUDE_PROMPTS.length)]);
  }, []);

  useEffect(() => {
    localStorage.setItem('gratitude-garden', JSON.stringify(gratitudes));
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

  const getGardenDisplay = () => {
    const gardenSize = Math.min(gratitudes.length, 50); // Max 50 plants visible
    const rows = Math.ceil(Math.sqrt(gardenSize));
    const plants = gratitudes.slice(-gardenSize);
    
    return (
      <div 
        className="grid gap-2 p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg min-h-[300px]"
        style={{ gridTemplateColumns: `repeat(${rows || 1}, 1fr)` }}
      >
        {plants.map((gratitude, index) => (
          <div 
            key={gratitude.id}
            className="text-2xl hover:scale-110 transition-transform cursor-pointer"
            title={`${gratitude.category}: ${gratitude.text}`}
            style={{
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            {gratitude.plantType}
          </div>
        ))}
        {gardenSize === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-12">
            <Sprout className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">Ton jardin attend tes premières gratitudes...</p>
          </div>
        )}
      </div>
    );
  };

  const recentGratitudes = gratitudes.slice(-5).reverse();

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Flower className="h-10 w-10 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">GratitudeGarden</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Cultive ton bien-être avec la gratitude quotidienne 🌱
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="secondary">{gratitudes.length} gratitudes totales</Badge>
            <Badge variant="secondary">{todaysCount}/3 aujourd'hui</Badge>
          </div>
        </div>

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
            {getGardenDisplay()}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Add Gratitude */}
          <Card>
            <CardHeader>
              <CardTitle>✨ Nouvelle Gratitude</CardTitle>
              <CardDescription className="italic text-emerald-600">
                "{currentPrompt}"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Category Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Catégorie</label>
                <div className="grid grid-cols-2 gap-2">
                  {GRATITUDE_CATEGORIES.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Button
                        key={category.name}
                        variant={selectedCategory.name === category.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="justify-start"
                      >
                        <IconComponent className="h-4 w-4 mr-2" />
                        {category.name}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Gratitude Input */}
              <div>
                <Textarea
                  value={newGratitude}
                  onChange={(e) => setNewGratitude(e.target.value)}
                  placeholder="Exprime ta gratitude avec authenticité..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <Button 
                onClick={addGratitude}
                disabled={!newGratitude.trim() || todaysCount >= 3}
                className="w-full"
              >
                {todaysCount >= 3 ? "Limite quotidienne atteinte" : "Planter ma gratitude 🌱"}
              </Button>
              
              {todaysCount >= 3 && (
                <p className="text-sm text-gray-500 text-center">
                  Revenez demain pour de nouvelles gratitudes ! La qualité prime sur la quantité.
                </p>
              )}
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

        {/* Features Coming Soon */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Fonctionnalités à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <ul className="space-y-1">
                <li>• Jardin 3D interactif (WebGL)</li>
                <li>• Saisonnalité basée sur la constance</li>
                <li>• Export journal de gratitude (PDF)</li>
                <li>• Rappels personnalisés bienveillants</li>
              </ul>
              <ul className="space-y-1">
                <li>• Photos attachées aux gratitudes</li>
                <li>• Partage communautaire (optionnel)</li>
                <li>• Statistiques bien-être longitudinales</li>
                <li>• Détection patterns de gratitude</li>
              </ul>
            </div>
          </CardContent>
        </Card>

      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </main>
  );
}
