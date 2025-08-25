import { memo, useState, useCallback, lazy, Suspense } from "react";
import { BarChart3 } from "lucide-react";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

// Lazy load heavy components
const DataImporter = lazy(() => import("@/components/dataviz/DataImporter"));
const ChartBuilder = lazy(() => import("@/components/dataviz/ChartBuilder"));
const DataTable = lazy(() => import("@/components/dataviz/DataTable"));

export type DataRow = Record<string, any>;

const OptimizedDataViz = memo(() => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const handleDataImport = useCallback((importedData: DataRow[], importedColumns: string[], name: string) => {
    setData(importedData);
    setColumns(importedColumns);
    setFileName(name);
  }, []);

  const handleReset = useCallback(() => {
    setData([]);
    setColumns([]);
    setFileName("");
  }, []);

  const hasData = data.length > 0;

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="DataViz"
          description="Transformez vos données en insights visuels — Import CSV/JSON, graphiques interactifs, analyse tendances"
          icon={<BarChart3 className="h-12 w-12 text-blue-500" />}
        />

        {!hasData ? (
          <div className="flex justify-center">
            <Suspense fallback={<LoadingSpinner />}>
              <DataImporter onDataImport={handleDataImport} />
            </Suspense>
          </div>
        ) : (
          <Tabs defaultValue="charts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="charts">Graphiques</TabsTrigger>
              <TabsTrigger value="data">Données ({data.length} lignes)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="charts">
              <Suspense fallback={<LoadingSpinner />}>
                <ChartBuilder data={data} columns={columns} fileName={fileName} />
              </Suspense>
            </TabsContent>
            
            <TabsContent value="data">
              <Suspense fallback={<LoadingSpinner />}>
                <DataTable data={data} columns={columns} onReset={handleReset} />
              </Suspense>
            </TabsContent>
          </Tabs>
        )}

        <footer className="text-xs text-center mt-12 text-gray-400">
          🧪 DataViz MVP — Bientôt : dashboards, templates sectoriels, analyse prédictive !
        </footer>
      </PageLayout>
    </GlobalLayout>
  );
});

OptimizedDataViz.displayName = "OptimizedDataViz";

export default OptimizedDataViz;