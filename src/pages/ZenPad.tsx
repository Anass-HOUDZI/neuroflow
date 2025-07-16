
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { TextCursor } from "lucide-react";

export default function ZenPad() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="ZenPad"
          description="L'éditeur de texte zen ultime pour une concentration maximale"
          icon={<TextCursor className="h-12 w-12 text-blue-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            ZenPad sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
