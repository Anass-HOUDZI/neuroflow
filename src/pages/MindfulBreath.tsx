
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Waves } from "lucide-react";

export default function MindfulBreath() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="MindfulBreath"
          description="Pratiquez la respiration consciente pour réduire le stress"
          icon={<Waves className="h-12 w-12 text-cyan-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            MindfulBreath sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
