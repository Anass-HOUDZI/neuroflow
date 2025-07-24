
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Shield, Zap } from "lucide-react";

export default function About() {
  return (
    <GlobalLayout>
      <div className="bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title="À propos de NeuroFlow"
            description="Découvrez notre mission et les valeurs qui guident le développement de votre compagnon bien-être"
            icon={<Brain className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
          />

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Notre Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  NeuroFlow a été conçu pour offrir des outils de bien-être basés sur les neurosciences, 
                  entièrement locaux et sans distraction. Notre objectif est de vous accompagner dans votre 
                  parcours vers un mieux-être authentique, sans dépendance technologique néfaste.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Vos Données, Votre Contrôle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Tous vos données restent sur votre appareil. Aucune information personnelle n'est 
                  transmise à des serveurs externes. Vous gardez le contrôle total de votre vie privée 
                  et de vos informations de bien-être.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Fonctionnalités Principales
              </CardTitle>
              <CardDescription>
                Une suite complète d'outils pour votre bien-être quotidien
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Productivité</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ZenPad, HabitGrid, LocalBoard, MindFlow et DeepFocus pour optimiser votre workflow
                  </p>
                </div>
                <div className="p-4 bg-green-50/50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Bien-être</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    MoodTracker, MindfulBreath, Méditation et outils de gestion émotionnelle
                  </p>
                </div>
                <div className="p-4 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Santé</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Suivi du sommeil, hydratation, nutrition et activité physique
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GlobalLayout>
  );
}
