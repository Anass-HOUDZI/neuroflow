
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ModernCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: 'primary' | 'secondary' | 'accent' | 'warm';
  image?: string;
  badge?: string;
  children?: ReactNode;
}

const gradientClasses = {
  primary: 'from-blue-500/20 via-purple-500/20 to-blue-600/20',
  secondary: 'from-purple-500/20 via-pink-500/20 to-blue-500/20',
  accent: 'from-emerald-500/20 via-teal-500/20 to-blue-500/20',
  warm: 'from-orange-500/20 via-red-500/20 to-pink-500/20'
};

const hoverGradients = {
  primary: 'hover:from-blue-500/30 hover:via-purple-500/30 hover:to-blue-600/30',
  secondary: 'hover:from-purple-500/30 hover:via-pink-500/30 hover:to-blue-500/30',
  accent: 'hover:from-emerald-500/30 hover:via-teal-500/30 hover:to-blue-500/30',
  warm: 'hover:from-orange-500/30 hover:via-red-500/30 hover:to-pink-500/30'
};

export default function ModernCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  gradient, 
  image, 
  badge, 
  children 
}: ModernCardProps) {
  return (
    <Link
      to={href}
      className={`
        group relative overflow-hidden rounded-2xl 
        glass-card animate-shine
        bg-gradient-to-br ${gradientClasses[gradient]} ${hoverGradients[gradient]}
        transform-gpu transition-all duration-500
        hover:scale-105 hover:-translate-y-2
        border border-white/10 hover:border-white/20
        min-h-[280px] flex flex-col
      `}
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/20">
            {badge}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Icon */}
        <div className="mb-4">
          <div className={`
            w-12 h-12 rounded-xl bg-gradient-to-br ${gradientClasses[gradient]}
            backdrop-blur-sm border border-white/20
            flex items-center justify-center
            group-hover:scale-110 group-hover:rotate-3
            transition-transform duration-300
          `}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
          {description}
        </p>

        {/* Custom Children */}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}

        {/* Hover Arrow */}
        <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-medium">Explorer</span>
          <svg 
            className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Glow Effect */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-br ${gradientClasses[gradient]} blur-xl -z-10
      `} />
    </Link>
  );
}
