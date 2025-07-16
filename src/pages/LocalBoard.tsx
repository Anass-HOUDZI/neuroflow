
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { LayoutPanelLeft } from "lucide-react";

export default function LocalBoard() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="LocalBoard"
          description="Gérez vos projets hors-ligne avec ce Kanban minimaliste"
          icon={<LayoutPanelLeft className="h-12 w-12 text-green-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            LocalBoard sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
