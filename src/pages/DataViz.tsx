
import React, { useState } from "react";
import { BarChart3 } from "lucide-react";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import DataImporter from "@/components/dataviz/DataImporter";
import ChartBuilder from "@/components/dataviz/ChartBuilder";
import DataTable from "@/components/dataviz/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalLayout from "@/components/layout/GlobalLayout";

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
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="DataViz"
          description="Transformez vos données en insights visuels — Import CSV/JSON, graphiques interactifs, analyse tendances"
          icon={<BarChart3 className="h-12 w-12 text-blue-500" />}
        />

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
      </PageLayout>
    </GlobalLayout>
  );
}
