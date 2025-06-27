
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsDataImporter from "@/components/statspro/StatsDataImporter";
import DescriptiveStats from "@/components/statspro/DescriptiveStats";
import StatisticalTests from "@/components/statspro/StatisticalTests";
import StatisticalCharts from "@/components/statspro/StatisticalCharts";
import { StatsHeader } from "@/components/statspro/StatsHeader";
import { StatsDatasets } from "@/components/statspro/StatsDatasets";

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
        <StatsHeader datasetsCount={datasets.length} />

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
              <StatsDatasets datasets={datasets} onResetData={resetData} />
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
