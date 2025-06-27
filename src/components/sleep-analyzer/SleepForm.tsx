
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

type SleepEntry = {
  date: string;
  bedtime: string;
  waketime: string;
  quality: string;
  notes: string;
};

interface SleepFormProps {
  input: SleepEntry;
  qualities: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onQualityChange: (quality: string) => void;
  onAddEntry: () => void;
}

export const SleepForm: React.FC<SleepFormProps> = ({
  input,
  qualities,
  onInputChange,
  onQualityChange,
  onAddEntry
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Nouvelle nuit</CardTitle>
        <CardDescription>Saisissez vos horaires et la qualité ressentie</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Input
            type="date"
            name="date"
            value={input.date}
            onChange={onInputChange}
          />
          <div className="flex gap-2">
            <Input
              type="time"
              name="bedtime"
              placeholder="Heure de coucher"
              value={input.bedtime}
              onChange={onInputChange}
            />
            <Input
              type="time"
              name="waketime"
              placeholder="Heure de réveil"
              value={input.waketime}
              onChange={onInputChange}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {qualities.map((q) => (
              <Button
                key={q}
                variant={input.quality === q ? "default" : "outline"}
                type="button"
                onClick={() => onQualityChange(q)}
              >
                {q}
              </Button>
            ))}
          </div>
          <Textarea
            name="notes"
            placeholder="Notes ou rêves (optionnel)"
            value={input.notes}
            onChange={onInputChange}
          />
          <Button
            onClick={onAddEntry}
            disabled={!input.bedtime || !input.waketime || !input.quality}
          >
            <Plus className="mr-2 h-4 w-4" /> Ajouter nuit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
