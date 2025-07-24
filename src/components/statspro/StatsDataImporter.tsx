import React, { useRef, useState } from "react";
import { Upload, Calculator, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { StatsData } from "@/types/stats";
import { SecurityUtils, DataValidationSchemas, FILE_SIZE_LIMITS, ROW_LIMITS } from "@/lib/security";

interface StatsDataImporterProps {
  onDataImport: (datasets: StatsData[]) => void;
}

export default function StatsDataImporter({ onDataImport }: StatsDataImporterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const detectDataType = (values: number[]): 'continuous' | 'discrete' | 'categorical' => {
    // Si tous les nombres sont entiers et dans une plage raisonnable, c'est probablement discret
    const allIntegers = values.every(v => Number.isInteger(v));
    const uniqueValues = new Set(values).size;
    const totalValues = values.length;
    
    if (allIntegers && uniqueValues < totalValues * 0.1) {
      return 'discrete';
    }
    return 'continuous';
  };

  const parseCSV = (text: string): StatsData[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) throw new Error("Le fichier doit contenir au moins une ligne d'en-têtes et une ligne de données");
    if (lines.length > ROW_LIMITS.CSV) throw new Error(`Trop de lignes. Maximum autorisé: ${ROW_LIMITS.CSV}`);
    
    const headers = lines[0].split(',').map(h => SecurityUtils.sanitizeString(h.trim().replace(/"/g, '')));
    const rows = lines.slice(1).map(line => line.split(',').map(v => v.trim().replace(/"/g, '')));
    
    const datasets: StatsData[] = [];
    
    headers.forEach((header, colIndex) => {
      if (!header || header.length === 0) return;
      
      const values: number[] = [];
      
      rows.forEach(row => {
        const value = row[colIndex];
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && isFinite(numValue)) {
          values.push(numValue);
        }
      });
      
      if (values.length > 0 && values.length <= 1000) {
        const statsData: StatsData = {
          name: header,
          values,
          type: detectDataType(values)
        };
        
        // Validate with schema
        DataValidationSchemas.statsData.parse(statsData);
        datasets.push(statsData);
      }
    });
    
    return datasets;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      // Validate file before processing
      SecurityUtils.validateFile(file, ['csv'], FILE_SIZE_LIMITS.CSV);
      
      const text = await file.text();
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExt !== 'csv') {
        throw new Error("Format non supporté. Utilisez .csv");
      }

      const datasets = parseCSV(text);
      if (datasets.length === 0) {
        throw new Error("Aucune donnée numérique trouvée dans le fichier");
      }

      onDataImport(datasets);
      toast.success(`${datasets.length} variable(s) importée(s) avec succès !`);
    } catch (error) {
      console.warn('Stats data import error:', error);
      toast.error(`Erreur d'import : ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const generateSampleData = () => {
    const sampleDatasets: StatsData[] = [
      {
        name: "Notes_Examen",
        values: [85, 78, 92, 67, 88, 75, 91, 82, 79, 87, 94, 73, 86, 89, 77],
        type: 'continuous'
      },
      {
        name: "Âge_Participants",
        values: [25, 30, 28, 35, 22, 31, 27, 29, 33, 26, 24, 32, 28, 30, 25],
        type: 'discrete'
      },
      {
        name: "Satisfaction_Service",
        values: [4, 5, 3, 4, 5, 2, 4, 3, 5, 4, 3, 4, 5, 3, 4],
        type: 'discrete'
      }
    ];
    
    onDataImport(sampleDatasets);
    toast.success("Données d'exemple chargées !");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center gap-2 justify-center">
          <Upload className="h-5 w-5" />
          Importer vos données pour analyse
        </CardTitle>
        <CardDescription>
          Uploadez un fichier CSV avec des colonnes numériques pour commencer l'analyse statistique
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            <Database className="h-4 w-4 mr-2" />
            {isLoading ? "Import en cours..." : "Choisir un fichier CSV"}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <div className="text-center text-sm text-gray-500">
            ou
          </div>
          
          <Button
            onClick={generateSampleData}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Utiliser des données d'exemple
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <strong>Format CSV requis :</strong>
          <br />• Première ligne = noms des variables
          <br />• Colonnes = variables numériques à analyser
          <br />• Séparateur = virgule
          <br />• Exemple : Notes,Age,Satisfaction
        </div>
      </CardContent>
    </Card>
  );
}
