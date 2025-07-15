
import { ReactNode } from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/navigation/Breadcrumb';

interface GlobalLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

export default function GlobalLayout({ children, showBreadcrumb = true }: GlobalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNavigation />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {showBreadcrumb && (
          <div className="container mx-auto px-4 pt-4">
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
