
import { ReactNode } from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';
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
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 sm:h-16 items-center px-2 sm:px-4">
          <MainNavigation />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
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
