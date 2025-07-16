
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-700 mb-8">
          <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            Suite d'outils neuroscientifiques
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
          NeuroFlow
          <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-gray-700 dark:text-gray-300">
            Suite
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Des outils scientifiquement fondés pour{" "}
          <span className="font-semibold text-purple-600 dark:text-purple-400">optimiser votre bien-être</span>,{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">booster votre productivité</span>, et{" "}
          <span className="font-semibold text-pink-600 dark:text-pink-400">libérer votre créativité</span>
        </p>

        {/* Features List */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm sm:text-base">
          <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm">
            🧠 Neurosciences appliquées
          </span>
          <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm">
            🔒 100% offline & privé
          </span>
          <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm">
            ⚡ Ultra-rapide
          </span>
          <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm">
            🎯 Science-based
          </span>
        </div>

        {/* CTA Button */}
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          onClick={scrollToFeatures}
        >
          Découvrir les outils
          <ArrowDown className="ml-2 w-5 h-5" />
        </Button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-bounce"></div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Scroll</span>
        </div>
      </div>
    </section>
  );
}
