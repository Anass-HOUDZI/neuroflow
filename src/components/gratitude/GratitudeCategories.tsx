
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sun, Sprout, TreePine, Flower, Leaf, LucideIcon } from 'lucide-react';

export interface GratitudeCategory {
  name: string;
  icon: LucideIcon;
  color: string;
  plantType: string;
}

export const GRATITUDE_CATEGORIES: GratitudeCategory[] = [
  { name: "Relations", icon: Heart, color: "bg-pink-100 text-pink-600", plantType: "🌹" },
  { name: "Progrès perso", icon: Sprout, color: "bg-green-100 text-green-600", plantType: "🌱" },
  { name: "Nature", icon: TreePine, color: "bg-emerald-100 text-emerald-600", plantType: "🌲" },
  { name: "Santé", icon: Sun, color: "bg-yellow-100 text-yellow-600", plantType: "🌻" },
  { name: "Créativité", icon: Flower, color: "bg-purple-100 text-purple-600", plantType: "🌺" },
  { name: "Général", icon: Leaf, color: "bg-blue-100 text-blue-600", plantType: "🍀" }
];

interface GratitudeCategoriesProps {
  selectedCategory: GratitudeCategory;
  onCategorySelect: (category: GratitudeCategory) => void;
}

export const GratitudeCategories: React.FC<GratitudeCategoriesProps> = ({
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Catégorie</label>
      <div className="grid grid-cols-2 gap-2">
        {GRATITUDE_CATEGORIES.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.name}
              variant={selectedCategory.name === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => onCategorySelect(category)}
              className="justify-start"
            >
              <IconComponent className="h-4 w-4 mr-2" />
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
