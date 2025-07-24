
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('tools-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 text-center px-2 sm:px-4 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-700 mb-4 sm:mb-6">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 mr-1.5 sm:mr-2" />
          <span className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400">
            Suite d'outils neuroscientifiques
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
          <img 
            src="/lovable-uploads/a0fbbb2d-6964-4c6c-9eed-fb534407abd8.png" 
            alt="NeuroFlow" 
            className="h-16 w-auto mx-auto mb-4"
          />
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
          Des outils scientifiquement fondés pour{" "}
          <span className="font-semibold text-purple-600 dark:text-purple-400">optimiser votre bien-être</span>,{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">booster votre productivité</span>, et{" "}
          <span className="font-semibold text-pink-600 dark:text-pink-400">libérer votre créativité</span>
        </p>

        {/* Features List */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3 mb-6 sm:mb-8 lg:mb-10 text-xs sm:text-sm lg:text-base px-2">
          <span className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm text-xs sm:text-sm">
            🧠 Neurosciences appliquées
          </span>
          <span className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm text-xs sm:text-sm">
            🔒 100% offline & privé
          </span>
          <span className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm text-xs sm:text-sm">
            ⚡ Ultra-rapide
          </span>
          <span className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm text-xs sm:text-sm">
            🎯 Science-based
          </span>
        </div>

        {/* CTA Button */}
        <Button 
          size="lg" 
          className="text-sm sm:text-base lg:text-lg px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          onClick={scrollToFeatures}
        >
          Découvrir les outils
          <ArrowDown className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </section>
  );
}
