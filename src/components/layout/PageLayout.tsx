
import * as React from "react"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import Breadcrumb from "@/components/navigation/Breadcrumb"

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
  showBreadcrumb?: boolean
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ children, className, maxWidth = "2xl", padding = "md", showBreadcrumb = true, ...props }, ref) => {
    const maxWidthClasses = {
      sm: "max-w-sm",
      md: "max-w-2xl", 
      lg: "max-w-4xl",
      xl: "max-w-6xl",
      "2xl": "max-w-7xl",
      full: "max-w-full"
    }

    const paddingClasses = {
      none: "",
      sm: "px-2 py-4",
      md: "px-4 py-8", 
      lg: "px-6 py-12"
    }

    return (
      <ErrorBoundary>
        <main
          ref={ref}
          className={cn(
            "min-h-screen w-full mx-auto",
            maxWidthClasses[maxWidth],
            paddingClasses[padding],
            className
          )}
          {...props}
        >
          {showBreadcrumb && <Breadcrumb />}
          {children}
        </main>
      </ErrorBoundary>
    )
  }
)
PageLayout.displayName = "PageLayout"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, icon, actions, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-4 mb-8 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions}
      </div>
    )
  }
)
PageHeader.displayName = "PageHeader"

export { PageLayout, PageHeader }
