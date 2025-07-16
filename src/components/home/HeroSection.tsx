
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="relative py-8 lg:py-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            NeuroFlow Suite
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Basé sur les neurosciences du bien-être
          </p>
          
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mt-6 leading-relaxed">
            Une collection d'outils scientifiquement conçus pour améliorer votre productivité, 
            votre bien-être mental et votre épanouissement personnel. Chaque application est 
            développée selon les dernières recherches en neurosciences cognitives.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={scrollToTools}
            >
              Découvrir les outils
              <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold"
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - avec plus de marge */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 mt-8">
        <div 
          className="cursor-pointer group animate-pulse"
          onClick={scrollToTools}
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center transition-colors duration-300 group-hover:border-blue-500">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-bounce group-hover:bg-blue-500 transition-colors duration-300"></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 group-hover:text-blue-500 transition-colors duration-300">
            Faire défiler
          </p>
        </div>
      </div>
    </section>
  );
}
