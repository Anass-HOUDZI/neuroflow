
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <GlobalLayout>
      <div className="bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title="Contact"
            description="Contactez-nous pour toute question, suggestion ou collaboration"
            icon={<MessageCircle className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
          />

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Développeur Principal</CardTitle>
                <CardDescription>Anass Houdzi - Créateur de NeuroFlow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => window.open('mailto:anass.houdzi@gmail.com', '_blank')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    anass.houdzi@gmail.com
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => window.open('https://www.linkedin.com/in/anasshoudzi/', '_blank')}
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn Profile
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => window.open('https://github.com/Anass-HOUDZI/', '_blank')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Questions Fréquentes</CardTitle>
                <CardDescription>Réponses aux questions les plus courantes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Mes données sont-elles sécurisées ?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Absolument ! Toutes vos données restent sur votre appareil et ne sont jamais transmises.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    L'application fonctionne-t-elle hors ligne ?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Oui, NeuroFlow est conçu pour fonctionner entièrement hors ligne.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Comment puis-je suggérer une amélioration ?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Contactez-nous par email avec vos suggestions. Nous apprécions tous les retours !
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
