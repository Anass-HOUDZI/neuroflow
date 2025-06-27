
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';

interface NutrientTipsProps {
  showTips: boolean;
  onToggleTips: () => void;
}

export const NutrientTips: React.FC<NutrientTipsProps> = ({
  showTips,
  onToggleTips
}) => {
  return (
    <>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onToggleTips} 
        className="mb-2 rounded-full shadow-sm hover:shadow transition"
      >
        {showTips ? "Masquer" : "Voir"} conseils nutritionnels
      </Button>
      {showTips && (
        <div className="space-y-2 text-xs rounded-xl bg-sky-50 border px-3 py-2 my-2 animate-fade-in">
          <b>Bio-disponibilité :</b> Cuire peu, associer Vitamine C (ex. poivron cru) avec Fer végétal pour booster absorption.<br />
          <b>Interactions :</b> Calcium et Fer se concurrencent, éviter ensemble. <br />
          <b>Timing :</b> Prendre le magnésium plutôt soir pour la détente.<br />
          <b>Suppléments :</b> Toujours vérifier interactions médicaments-suppléments avec un professionnel.<br />
          <b>Marqueurs santé :</b> Fatigue persistante ? Parlez à votre médecin et envisagez une prise de sang.
        </div>
      )}
      <Separator className="my-4" />
      <details>
        <summary className="cursor-pointer font-semibold text-blue-700">
          <Info className="inline w-4 h-4 mr-1" />À propos micronutriments
        </summary>
        <div className="text-xs mt-2 space-y-2">
          <b>Base de données : </b> Données issues des références Anses/EFSA et littérature neuroscience.<br />
          <b>Aliments : </b> Bio-disponibilité variable selon cuisson/associations.<br />
          <b>Symptômes : </b> Questionnaire qualitatif (non diagnostique).<br />
          Une approche personnalisée nécessite un suivi professionnel. Les conseils sont informatifs.
        </div>
      </details>
    </>
  );
};
