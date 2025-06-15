
import React, { useState } from "react";
import { BarChart3 } from "lucide-react";
import DataImporter from "@/components/dataviz/DataImporter";
import ChartBuilder from "@/components/dataviz/ChartBuilder";
import DataTable from "@/components/dataviz/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type DataRow = Record<string, any>;

export default function DataViz() {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const handleDataImport = (importedData: DataRow[], importedColumns: string[], name: string) => {
    setData(importedData);
    setColumns(importedColumns);
    setFileName(name);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <BarChart3 className="h-12 w-12 text-blue-500" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">DataViz</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
            Transformez vos données en insights visuels — Import CSV/JSON, graphiques interactifs, analyse tendances
          </p>
        </div>

        {data.length === 0 ? (
          <div className="flex justify-center">
            <DataImporter onDataImport={handleDataImport} />
          </div>
        ) : (
          <Tabs defaultValue="charts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="charts">Graphiques</TabsTrigger>
              <TabsTrigger value="data">Données ({data.length} lignes)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="charts">
              <ChartBuilder data={data} columns={columns} fileName={fileName} />
            </TabsContent>
            
            <TabsContent value="data">
              <DataTable data={data} columns={columns} onReset={() => {
                setData([]);
                setColumns([]);
                setFileName("");
              }} />
            </TabsContent>
          </Tabs>
        )}

        <footer className="text-xs text-center mt-12 text-gray-400">
          🧪 DataViz MVP — Bientôt : dashboards, templates sectoriels, analyse prédictive !
        </footer>
      </div>
    </main>
  );
}
