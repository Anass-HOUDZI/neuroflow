
import React, { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsDataImporter from "@/components/statspro/StatsDataImporter";
import DescriptiveStats from "@/components/statspro/DescriptiveStats";
import StatisticalTests from "@/components/statspro/StatisticalTests";
import StatisticalCharts from "@/components/statspro/StatisticalCharts";

export type StatsData = {
  name: string;
  values: number[];
  type: 'continuous' | 'discrete' | 'categorical';
};

export default function StatsPro() {
  const [datasets, setDatasets] = useState<StatsData[]>([]);

  const handleDataImport = (newDatasets: StatsData[]) => {
    setDatasets(newDatasets);
  };

  const resetData = () => {
    setDatasets([]);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Calculator className="h-12 w-12 text-emerald-500" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">StatsPro</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
            Analyseur statistiques avancé — Tests d'hypothèses, corrélations, régressions, insights automatiques
          </p>
        </div>

        {datasets.length === 0 ? (
          <div className="flex justify-center">
            <StatsDataImporter onDataImport={handleDataImport} />
          </div>
        ) : (
          <Tabs defaultValue="descriptive" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="descriptive">Descriptives</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
              <TabsTrigger value="charts">Graphiques</TabsTrigger>
              <TabsTrigger value="data">Données ({datasets.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="descriptive">
              <DescriptiveStats datasets={datasets} />
            </TabsContent>
            
            <TabsContent value="tests">
              <StatisticalTests datasets={datasets} />
            </TabsContent>
            
            <TabsContent value="charts">
              <StatisticalCharts datasets={datasets} />
            </TabsContent>
            
            <TabsContent value="data">
              <div className="space-y-4">
                {datasets.map((dataset, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h3 className="font-semibold mb-2">{dataset.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Type: {dataset.type} | Échantillon: {dataset.values.length} valeurs
                    </p>
                    <div className="text-xs text-gray-500 max-h-20 overflow-y-auto">
                      {dataset.values.slice(0, 20).join(', ')}
                      {dataset.values.length > 20 && '...'}
                    </div>
                  </div>
                ))}
                <button
                  onClick={resetData}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Réinitialiser les données
                </button>
              </div>
            </TabsContent>
          </Tabs>
        )}

        <footer className="text-xs text-center mt-12 text-gray-400">
          📊 StatsPro MVP — Bientôt : analyses multivariées, machine learning, rapports automatiques !
        </footer>
      </div>
    </main>
  );
}
