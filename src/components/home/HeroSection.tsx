
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Shield, Zap } from "lucide-react";

export default function HeroSection() {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      {/* Contenu principal */}
      <div className="text-center mb-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Basé sur les neurosciences du bien-être
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 leading-tight">
            Transformez votre quotidien avec des outils
            <br />
            <span className="text-blue-600 dark:text-blue-400">scientifiquement fondés</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Une suite complète d'applications de bien-être qui respectent votre vie privée. 
            Tous vos données restent sur votre appareil, aucune connexion requise.
          </p>
        </div>

        {/* Points clés */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">100% Local</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Vos données ne quittent jamais votre appareil. Privacy by design.
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
              <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Sans Distraction</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Conçu pour favoriser la concentration et le flow, pas l'addiction.
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Science-Based</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Chaque outil est basé sur des recherches en neurosciences.
            </p>
          </div>
        </div>

        {/* CTA centré */}
        <div className="flex justify-center">
          <Button 
            onClick={scrollToTools}
            size="lg" 
            className="px-8 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            Découvrir les outils
            <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Indicateur de scroll animé */}
      <div className="hidden lg:flex justify-center mt-16">
        <div className="animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400 dark:text-gray-600" />
        </div>
      </div>
    </section>
  );
}
