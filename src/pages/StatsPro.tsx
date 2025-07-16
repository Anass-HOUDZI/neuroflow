
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { TrendingUp } from "lucide-react";

export default function StatsPro() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="StatsPro"
          description="Analysez vos données avec des outils statistiques avancés"
          icon={<TrendingUp className="h-12 w-12 text-blue-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            StatsPro sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
