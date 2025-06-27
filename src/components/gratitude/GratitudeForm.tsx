
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GratitudeCategories, GratitudeCategory } from './GratitudeCategories';

interface GratitudeFormProps {
  newGratitude: string;
  onGratitudeChange: (value: string) => void;
  selectedCategory: GratitudeCategory;
  onCategorySelect: (category: GratitudeCategory) => void;
  onSubmit: () => void;
  currentPrompt: string;
  todaysCount: number;
  maxDaily?: number;
}

export const GratitudeForm: React.FC<GratitudeFormProps> = ({
  newGratitude,
  onGratitudeChange,
  selectedCategory,
  onCategorySelect,
  onSubmit,
  currentPrompt,
  todaysCount,
  maxDaily = 3
}) => {
  const isDisabled = !newGratitude.trim() || todaysCount >= maxDaily;

  return (
    <div className="space-y-4">
      <p className="italic text-emerald-600 text-sm">
        "{currentPrompt}"
      </p>
      
      <GratitudeCategories
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />

      <div>
        <Textarea
          value={newGratitude}
          onChange={(e) => onGratitudeChange(e.target.value)}
          placeholder="Exprime ta gratitude avec authenticité..."
          rows={3}
          className="resize-none"
        />
      </div>

      <Button 
        onClick={onSubmit}
        disabled={isDisabled}
        className="w-full"
      >
        {todaysCount >= maxDaily 
          ? "Limite quotidienne atteinte" 
          : "Planter ma gratitude 🌱"
        }
      </Button>
      
      {todaysCount >= maxDaily && (
        <p className="text-sm text-gray-500 text-center">
          Revenez demain pour de nouvelles gratitudes ! La qualité prime sur la quantité.
        </p>
      )}
    </div>
  );
};
