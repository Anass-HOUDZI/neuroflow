
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { CheckSquare } from "lucide-react";

export default function HabitGrid() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="HabitGrid"
          description="Suivez vos habitudes quotidiennes pour atteindre vos objectifs"
          icon={<CheckSquare className="h-12 w-12 text-green-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            HabitGrid sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
