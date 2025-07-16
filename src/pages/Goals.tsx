
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Trophy } from "lucide-react";

export default function Goals() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Goals"
          description="Définissez et suivez vos objectifs personnels et professionnels"
          icon={<Trophy className="h-12 w-12 text-yellow-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            Goals sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
