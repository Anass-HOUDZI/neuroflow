
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Feature } from "@/data/features";

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = feature.icon;
  
  return (
    <Link to={feature.path} className="group">
      <Card
        className={`
          h-full cursor-pointer rounded-2xl transition-all duration-200
          bg-gradient-to-tl ${feature.color || 'from-blue-500 to-purple-600'}
          hover:shadow-2xl hover:-translate-y-0.5 
          border-0 shadow-md animate-fade-in
          group-hover:scale-[1.02]
          relative overflow-hidden
        `}
        style={{ minHeight: '280px' }}
      >
        {/* Background Image */}
        {feature.image && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            style={{ backgroundImage: `url(${feature.image})` }}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        <CardHeader className="text-center flex flex-col items-center pb-2 pt-5 relative z-10">
          <div className="
            mx-auto rounded-2xl 
            bg-white/90 dark:bg-gray-900/90 
            border border-gray-200 dark:border-gray-800
            shadow-lg flex items-center justify-center
            mb-3 w-16 h-16 sm:w-20 sm:h-20
            transition-transform duration-200 group-hover:scale-110
            backdrop-blur-sm
          ">
            <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-primary-600 dark:text-primary" />
          </div>
          <CardTitle className="text-lg sm:text-xl mt-1 font-semibold text-white drop-shadow-lg">
            {feature.title}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-white/90 line-clamp-2 drop-shadow-sm">
            {feature.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-0 relative z-10">
          <Button
            variant="outline"
            className="
              w-full rounded-xl shadow-sm transition-all duration-200
              text-sm sm:text-base py-2
              bg-white/40 backdrop-blur-sm
              border border-white/60
              text-white hover:bg-white hover:text-primary
              hover:border-white hover:shadow-md
              group-hover:scale-[1.025]
              font-medium
            "
          >
            Découvrir
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
