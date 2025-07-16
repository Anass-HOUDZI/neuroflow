
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Speaker } from "lucide-react";

export default function Meditation() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Méditation Guidée"
          description="Explorez des séances de méditation pour la paix intérieure"
          icon={<Speaker className="h-12 w-12 text-indigo-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            Méditation Guidée sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
