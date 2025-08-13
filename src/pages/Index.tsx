
import HeroSection from "@/components/home/HeroSection";
import FeatureGrid from "@/components/home/FeatureGrid";
import { features } from "@/data/features";
import GlobalLayout from "@/components/layout/GlobalLayout";

export default function Index() {
  return (
    <GlobalLayout showBreadcrumb={false}>
      <div className="
        min-h-screen transition-colors duration-300
        bg-gradient-to-br from-slate-50 to-blue-100 
        dark:from-gray-900 dark:to-gray-900
      ">
        <div className="container mx-auto px-2 py-8">
          <HeroSection />
          
          {/* Section des outils avec ID pour le scroll */}
          <div id="tools-section" className="scroll-mt-8 mt-6 sm:mt-8 lg:mt-10">
            <FeatureGrid features={features} />
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
