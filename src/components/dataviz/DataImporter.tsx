
import React, { useRef, useState } from "react";
import { Upload, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { SecurityUtils, DataValidationSchemas, FILE_SIZE_LIMITS, ROW_LIMITS } from "@/lib/security";

type DataRow = Record<string, any>;

interface DataImporterProps {
  onDataImport: (data: DataRow[], columns: string[], fileName: string) => void;
}

export default function DataImporter({ onDataImport }: DataImporterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const parseCSV = (text: string): { data: DataRow[], columns: string[] } => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) throw new Error("Le fichier doit contenir au moins une ligne d'en-têtes et une ligne de données");
    if (lines.length > ROW_LIMITS.CSV) throw new Error(`Trop de lignes. Maximum autorisé: ${ROW_LIMITS.CSV}`);
    
    const headers = lines[0].split(',').map(h => SecurityUtils.sanitizeString(h.trim().replace(/"/g, '')));
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      const row: DataRow = {};
      headers.forEach((header, index) => {
        const value = values[index] || '';
        // Tentative de conversion en nombre
        const numValue = parseFloat(value);
        const sanitizedValue = typeof value === 'string' ? SecurityUtils.sanitizeString(value) : value;
        row[header] = !isNaN(numValue) && value !== '' ? numValue : sanitizedValue;
      });
      
      // Validate and sanitize the row
      const sanitizedRow = SecurityUtils.sanitizeObjectKeys(row);
      return DataValidationSchemas.csvRow.parse(sanitizedRow);
    });
    
    return { data, columns: headers };
  };

  const parseJSON = (text: string): { data: DataRow[], columns: string[] } => {
    const json = JSON.parse(text);
    if (!Array.isArray(json)) throw new Error("Le JSON doit être un tableau d'objets");
    if (json.length === 0) throw new Error("Le tableau JSON ne peut pas être vide");
    
    // Validate with schema
    const validatedData = DataValidationSchemas.jsonData.parse(json);
    
    // Sanitize all objects
    const sanitizedData = validatedData.map(item => SecurityUtils.sanitizeObjectKeys(item));
    
    const columns = Object.keys(sanitizedData[0] || {});
    return { data: sanitizedData, columns };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      
      // Validate file before processing
      if (fileExt === 'csv') {
        SecurityUtils.validateFile(file, ['csv'], FILE_SIZE_LIMITS.CSV);
      } else if (fileExt === 'json') {
        SecurityUtils.validateFile(file, ['json'], FILE_SIZE_LIMITS.JSON);
      } else {
        throw new Error("Format non supporté. Utilisez .csv ou .json");
      }

      const text = await file.text();
      let result: { data: DataRow[], columns: string[] };
      
      if (fileExt === 'csv') {
        result = parseCSV(text);
      } else if (fileExt === 'json') {
        result = parseJSON(text);
      } else {
        throw new Error("Format non supporté. Utilisez .csv ou .json");
      }

      onDataImport(result.data, result.columns, SecurityUtils.sanitizeString(file.name));
      toast.success(`${result.data.length} lignes importées avec succès !`);
    } catch (error) {
      console.warn('Data import error:', error);
      toast.error(`Erreur d'import : ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const generateSampleData = () => {
    const sampleData = [
      { mois: "Jan", ventes: 4500, profits: 1200, region: "Nord" },
      { mois: "Fév", ventes: 3200, profits: 900, region: "Nord" },
      { mois: "Mar", ventes: 5100, profits: 1500, region: "Sud" },
      { mois: "Avr", ventes: 4800, profits: 1300, region: "Sud" },
      { mois: "Mai", ventes: 6200, profits: 1800, region: "Est" },
      { mois: "Jun", ventes: 5900, profits: 1650, region: "Est" },
    ];
    
    onDataImport(sampleData, ["mois", "ventes", "profits", "region"], "sample-data.json");
    toast.success("Données d'exemple chargées !");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center gap-2 justify-center">
          <Upload className="h-5 w-5" />
          Importer vos données
        </CardTitle>
        <CardDescription>
          Uploadez un fichier CSV ou JSON pour commencer à créer vos visualisations
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
            <FileText className="h-4 w-4 mr-2" />
            {isLoading ? "Import en cours..." : "Choisir un fichier"}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
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
            <Download className="h-4 w-4 mr-2" />
            Utiliser des données d'exemple
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <strong>Formats supportés :</strong>
          <br />• CSV : première ligne = en-têtes, séparateur virgule
          <br />• JSON : tableau d'objets avec propriétés cohérentes
          <br />• Taille max recommandée : 1000 lignes pour performance optimale
        </div>
      </CardContent>
    </Card>
  );
}
