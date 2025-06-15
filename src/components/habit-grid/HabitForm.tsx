
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";

interface HabitFormProps {
  onSubmit: (habit: {
    name: string;
    description: string;
    type: 'positive' | 'negative';
    scoringType: 'binary' | 'scale' | 'duration';
    color: string;
    isActive: boolean;
  }) => void;
  onCancel: () => void;
}

const HABIT_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
];

export const HabitForm = ({ onSubmit, onCancel }: HabitFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'positive' | 'negative'>('positive');
  const [scoringType, setScoringType] = useState<'binary' | 'scale' | 'duration'>('binary');
  const [color, setColor] = useState(HABIT_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      type,
      scoringType,
      color,
      isActive: true,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Nouvelle Habitude</CardTitle>
            <CardDescription>
              Créez une nouvelle habitude à suivre
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'habitude</Label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Méditation matinale"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnelle)</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Quelques détails sur cette habitude..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              />
            </div>

            {/* Type */}
            <div className="space-y-3">
              <Label>Type d'habitude</Label>
              <RadioGroup value={type} onValueChange={(value: 'positive' | 'negative') => setType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="positive" id="positive" />
                  <Label htmlFor="positive">Positive (à développer)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="negative" id="negative" />
                  <Label htmlFor="negative">Négative (à réduire)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Scoring Type */}
            <div className="space-y-3">
              <Label>Type de suivi</Label>
              <RadioGroup value={scoringType} onValueChange={(value: 'binary' | 'scale' | 'duration') => setScoringType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="binary" id="binary" />
                  <Label htmlFor="binary">Binaire (Fait/Pas fait)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scale" id="scale" />
                  <Label htmlFor="scale">Échelle (1 à 5)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="duration" id="duration" />
                  <Label htmlFor="duration">Durée (minutes)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Color */}
            <div className="space-y-3">
              <Label>Couleur</Label>
              <div className="flex gap-2 flex-wrap">
                {HABIT_COLORS.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    onClick={() => setColor(colorOption)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === colorOption ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: colorOption }}
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Créer l'habitude
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
