import { memo, lazy, Suspense } from "react";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { features } from "@/data/features";

// Lazy load heavy components
const HeroSection = lazy(() => import("@/components/home/HeroSection"));
const FeatureGrid = lazy(() => import("@/components/home/FeatureGrid"));

const OptimizedIndex = memo(() => {
  return (
    <GlobalLayout showBreadcrumb={false}>
      <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-900">
        <div className="container mx-auto px-2 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <HeroSection />
          </Suspense>
          
          {/* Section des outils avec ID pour le scroll */}
          <div id="tools-section" className="scroll-mt-8 mt-6 sm:mt-8 lg:mt-10">
            <Suspense fallback={<LoadingSpinner />}>
              <FeatureGrid features={features} />
            </Suspense>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
});

OptimizedIndex.displayName = "OptimizedIndex";

export default OptimizedIndex;