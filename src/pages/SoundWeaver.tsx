
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Waves } from "lucide-react";

export default function SoundWeaver() {
  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="SoundWeaver"
          description="Composez de la musique avec cet outil de création sonore intuitif"
          icon={<Waves className="h-12 w-12 text-violet-500" />}
        />
        
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400">
            SoundWeaver sera bientôt disponible...
          </p>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
