
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Map } from "lucide-react";

export default function MindFlow() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="MindFlow"
          description="Visualisez vos idées avec cet outil de cartes mentales intuitif"
          icon={<Map className="h-12 w-12 text-purple-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            MindFlow sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
