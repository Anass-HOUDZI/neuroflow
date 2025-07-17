
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { animationPresets } from '@/core/animations/presets';

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
    <motion.div
      initial={animationPresets.scaleIn.initial}
      animate={animationPresets.scaleIn.animate}
      transition={animationPresets.scaleIn.transition}
      whileHover={{
        scale: 1.03,
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      <Link
        to={href}
        className={`
          group relative overflow-hidden rounded-xl sm:rounded-2xl 
          glass-card animate-shine
          bg-gradient-to-br ${gradientClasses[gradient]} ${hoverGradients[gradient]}
          transform-gpu transition-all duration-300
          border border-white/10 hover:border-white/20
          min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] flex flex-col
          block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        `}
      >
        {/* Background Image */}
        {image && (
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <img 
              src={image} 
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
            <motion.span 
              className="px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {badge}
            </motion.span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-5 lg:p-6 flex flex-col h-full">
          {/* Icon */}
          <motion.div 
            className="mb-3 sm:mb-4"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`
              w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${gradientClasses[gradient]}
              backdrop-blur-sm border border-white/20
              flex items-center justify-center
              transition-transform duration-300
            `}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-3 sm:line-clamp-4">
            {description}
          </p>

          {/* Custom Children */}
          {children && (
            <motion.div 
              className="mt-3 sm:mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {children}
            </motion.div>
          )}

          {/* Hover Arrow */}
          <motion.div 
            className="mt-3 sm:mt-4 flex items-center text-primary"
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs sm:text-sm font-medium">Explorer</span>
            <motion.svg 
              className="ml-2 h-3 w-3 sm:h-4 sm:w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div 
          className={`
            absolute inset-0 bg-gradient-to-br ${gradientClasses[gradient]} blur-xl -z-10
          `}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.5 }}
        />
      </Link>
    </motion.div>
  );
}
