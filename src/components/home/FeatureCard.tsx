
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
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
          bg-gradient-to-tl ${feature.color}
          hover:shadow-2xl hover:-translate-y-0.5 
          border-0 shadow-md animate-fade-in
          group-hover:scale-[1.02]
        `}
        style={{ minHeight: '240px' }}
      >
        <CardHeader className="text-center flex flex-col items-center pb-2 pt-5">
          <div className="
            mx-auto rounded-full 
            bg-white/80 dark:bg-gray-900/80 
            border border-gray-200 dark:border-gray-800
            shadow flex items-center justify-center
            mb-2 w-16 h-16 sm:w-20 sm:h-20
            transition-transform duration-200 group-hover:scale-105
          ">
            <IconComponent className="h-9 w-9 sm:h-12 sm:w-12 text-primary-600 dark:text-primary" />
          </div>
          <CardTitle className="text-lg mt-1 font-semibold text-gray-900 dark:text-gray-100">
            {feature.title}
          </CardTitle>
          <CardDescription className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {feature.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-0">
          <Button
            variant="outline"
            className="
              w-full rounded-xl shadow-sm transition-all duration-200
              text-[0.95em] py-2
              bg-white/40 backdrop-blur-sm
              border border-white/60
              text-primary hover:bg-white hover:text-primary
              hover:border-white hover:shadow-md
              group-hover:scale-[1.025]
            "
          >
            Découvrir
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
