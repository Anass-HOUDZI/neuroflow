
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Shield, Zap, Users, Clock, Star } from "lucide-react";
import StatsCounter from "./StatsCounter";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-bg opacity-50" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Premium Badge */}
        <div className={`
          mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm animate-glow">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-semibold">
              Basé sur les neurosciences du bien-être
            </span>
          </div>
        </div>

        {/* Animated Title */}
        <div className={`
          mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            <span className="block gradient-text animate-glow">
              Transformez votre
            </span>
            <span className="block gradient-text">
              quotidien avec des outils
            </span>
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              scientifiquement fondés
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            Une suite complète d'applications de bien-être qui respectent votre vie privée. 
            <br className="hidden sm:block" />
            <span className="text-primary font-medium">Tous vos données restent sur votre appareil, aucune connexion requise.</span>
          </p>
        </div>

        {/* Dynamic Stats */}
        <div className={`
          mb-12 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-yellow-500 mr-2 group-hover:scale-110 transition-transform" />
                <StatsCounter end={25} suffix="+" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">Outils disponibles</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-emerald-500 mr-2 group-hover:scale-110 transition-transform" />
                <StatsCounter end={30} suffix="s" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">Temps de lancement</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-blue-500 mr-2 group-hover:scale-110 transition-transform" />
                <StatsCounter end={100} suffix="%" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">Gratuit & Open Source</p>
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className={`
          mb-12 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="glass-card p-6 rounded-2xl backdrop-blur-sm group hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">100% Local</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vos données ne quittent jamais votre appareil. Privacy by design.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl backdrop-blur-sm group hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-emerald-500" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Sans Distraction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Conçu pour favoriser la concentration et le flow, pas l'addiction.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl backdrop-blur-sm group hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Science-Based</h3>
              <p className="text-muted-foreground leading-relaxed">
                Chaque outil est basé sur des recherches en neurosciences.
              </p>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className={`
          transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <Button 
            onClick={scrollToTools}
            size="lg" 
            className="
              px-10 py-6 text-lg font-semibold
              bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90
              text-white rounded-2xl shadow-2xl hover:shadow-primary/20
              transform hover:scale-105 transition-all duration-300
              animate-glow group relative overflow-hidden
            "
          >
            <span className="relative z-10 flex items-center">
              Découvrir les outils
              <ChevronDown className="ml-3 h-6 w-6 group-hover:translate-y-1 transition-transform" />
            </span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Button>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
