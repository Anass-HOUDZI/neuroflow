
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main className={cn(
      "min-h-screen flex flex-col",
      className
    )}>
      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        {children}
      </div>
    </main>
  );
}

export function PageHeader({ title, description, icon, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 mb-8 text-center">
      {icon && (
        <div className="flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-4">
          {actions}
        </div>
      )}
    </div>
  );
}
