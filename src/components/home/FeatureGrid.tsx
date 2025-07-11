
import { Feature } from "@/data/features";
import ModernCard from "./ModernCard";

interface FeatureGridProps {
  features: Feature[];
}

// Images Unsplash pour chaque catégorie
const categoryImages = {
  productivity: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&crop=faces",
  creativity: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=300&fit=crop&crop=faces", 
  wellbeing: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=faces",
  learning: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=faces",
  technical: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=faces",
  data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=faces"
};

const getGradientForCategory = (category: string) => {
  switch (category) {
    case 'productivity': return 'primary';
    case 'creativity': return 'secondary';
    case 'wellbeing': return 'accent';
    case 'learning': return 'warm';
    case 'technical': return 'primary';
    case 'data': return 'secondary';
    default: return 'primary';
  }
};

const getBadgeForFeature = (feature: Feature) => {
  if (feature.popular) return '🔥 Populaire';
  if (feature.new) return '✨ Nouveau';
  if (feature.category === 'wellbeing') return '🧘 Zen';
  if (feature.category === 'productivity') return '⚡ Pro';
  return undefined;
};

export default function FeatureGrid({ features }: FeatureGridProps) {
  if (features.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="glass-card p-8 rounded-2xl max-w-md mx-auto backdrop-blur-sm">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">Aucun outil trouvé</h3>
          <p className="text-muted-foreground">
            Essayez avec d'autres mots-clés ou explorez nos catégories.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
          Outils Disponibles
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez notre collection d'outils scientifiquement conçus pour améliorer votre bien-être
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="transform transition-all duration-300"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <ModernCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              href={feature.href}
              gradient={getGradientForCategory(feature.category) as 'primary' | 'secondary' | 'accent' | 'warm'}
              image={categoryImages[feature.category as keyof typeof categoryImages]}
              badge={getBadgeForFeature(feature)}
            />
          </div>
        ))}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .transform {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
