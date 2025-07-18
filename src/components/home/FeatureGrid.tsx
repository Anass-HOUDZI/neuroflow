
import { Feature } from "@/data/features";
import ModernCard from "./ModernCard";

interface FeatureGridProps {
  features: Feature[];
}

// Images Unsplash pour chaque catégorie
const categoryImages = {
  productivity: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&crop=faces",
  creativity: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=300&fit=crop&crop=faces", 
  wellness: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=faces",
  learning: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=faces",
  utility: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=faces",
  'data-tools': "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=faces",
  health: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=faces",
  'dev-tools': "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=faces"
};

const getGradientForCategory = (category: string) => {
  switch (category) {
    case 'productivity': return 'primary';
    case 'creativity': return 'secondary';
    case 'wellness': return 'accent';
    case 'learning': return 'warm';
    case 'utility': return 'primary';
    case 'data-tools': return 'secondary';
    case 'health': return 'accent';
    case 'dev-tools': return 'warm';
    default: return 'primary';
  }
};

const getBadgeForFeature = (feature: Feature) => {
  if (feature.popular) return '🔥 Populaire';
  if (feature.new) return '✨ Nouveau';
  if (feature.category === 'wellness') return '🧘 Zen';
  if (feature.category === 'productivity') return '⚡ Pro';
  return undefined;
};

const categoryLabels = {
  productivity: 'Productivité',
  wellness: 'Bien-être',
  health: 'Santé',
  'data-tools': 'Outils de données',
  creativity: 'Créativité',
  learning: 'Apprentissage',
  utility: 'Utilitaires',
  'dev-tools': 'Développement'
};

export default function FeatureGrid({ features }: FeatureGridProps) {
  if (features.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="glass-card p-6 sm:p-8 rounded-2xl max-w-md mx-auto backdrop-blur-sm">
          <div className="text-4xl sm:text-6xl mb-4">🔍</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">Aucun outil trouvé</h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            Essayez avec d'autres mots-clés ou explorez nos catégories.
          </p>
        </div>
      </div>
    );
  }

  // Grouper les features par catégorie
  const featuresGroupedByCategory = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  return (
    <div className="relative space-y-12 sm:space-y-16">
      {/* Section Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
          Outils Disponibles
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Découvrez notre collection d'outils scientifiquement conçus pour améliorer votre bien-être
        </p>
      </div>

      {/* Categories */}
      {Object.entries(featuresGroupedByCategory).map(([category, categoryFeatures]) => (
        <div key={category} className="space-y-6 sm:space-y-8">
          <div className="text-center sm:text-left px-4">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              {categoryLabels[category as keyof typeof categoryLabels] || category}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto sm:mx-0"></div>
          </div>

          {/* Grid for each category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4">
            {categoryFeatures.map((feature, index) => (
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
                  href={feature.href || feature.path}
                  gradient={getGradientForCategory(feature.category) as 'primary' | 'secondary' | 'accent' | 'warm'}
                  image={feature.image || categoryImages[feature.category as keyof typeof categoryImages]}
                  badge={getBadgeForFeature(feature)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
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
