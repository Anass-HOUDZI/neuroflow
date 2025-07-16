
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Calendar as CalendarIcon } from "lucide-react";

export default function Calendar() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Calendar"
          description="Gérez votre emploi du temps et vos événements importants"
          icon={<CalendarIcon className="h-12 w-12 text-teal-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            Calendar sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
