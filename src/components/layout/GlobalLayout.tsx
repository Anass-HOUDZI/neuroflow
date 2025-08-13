
import { ReactNode } from 'react';
import FixedHeader from '@/components/layout/FixedHeader';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/navigation/Breadcrumb';

interface GlobalLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
  className?: string;
}

export default function GlobalLayout({ 
  children, 
  showBreadcrumb = true, 
  className = "" 
}: GlobalLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Fixed Header */}
      <FixedHeader />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {showBreadcrumb && (
          <div className="container mx-auto px-2 sm:px-4 pt-3 sm:pt-4">
            <Breadcrumb />
          </div>
        )}
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
