
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface DrinkEntryProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  onAdd: () => void;
  disabled?: boolean;
}

const PRESET_AMOUNTS = [
  { label: 'Petit verre', value: 150 },
  { label: 'Verre standard', value: 250 },
  { label: 'Grande gourde', value: 500 }
];

export const DrinkEntry: React.FC<DrinkEntryProps> = ({
  amount,
  onAmountChange,
  onAdd,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <form 
        className="flex gap-2" 
        onSubmit={(e) => { e.preventDefault(); onAdd(); }}
      >
        <Input
          type="number"
          min={50}
          max={2000}
          step={50}
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          className="max-w-[100px]"
          aria-label="Quantité bue (ml)"
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled}>
          <Plus className="mr-1 h-4 w-4" />
          Ajouter
        </Button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        {PRESET_AMOUNTS.map((preset) => (
          <Button
            key={preset.value}
            variant="outline"
            size="sm"
            onClick={() => onAmountChange(preset.value)}
            disabled={disabled}
          >
            {preset.label} {preset.value}ml
          </Button>
        ))}
      </div>
    </div>
  );
};
