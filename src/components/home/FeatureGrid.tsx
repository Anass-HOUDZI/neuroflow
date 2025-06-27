
import { Feature } from "@/data/features";
import FeatureCard from "./FeatureCard";

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  if (features.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Aucun outil trouvé correspondant à votre recherche.
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Essayez avec d'autres mots-clés ou parcourez toutes nos fonctionnalités.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {features.map((feature) => (
        <FeatureCard key={feature.path} feature={feature} />
      ))}
    </div>
  );
}
