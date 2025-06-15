
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

// Carte : On applique le dégradé principal sur la carte, le bouton reçoit son propre dégradé on-hover

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: LucideIcon;
    path: string;
    color: string;
  };
}

// Table à correspondance "nom dégradé d'origine" -> "dégradé complémentaire" pour survol bouton
const complementaryGradients: Record<string, string> = {
  "from-fuchsia-300 via-rose-200 to-violet-200": "from-indigo-400 via-blue-400 to-cyan-200",
  "from-cyan-400 via-teal-300 to-emerald-200": "from-pink-300 via-rose-200 to-purple-300",
  "from-orange-200 via-pink-200 to-pink-100": "from-sky-400 via-indigo-300 to-lime-200",
  "from-indigo-200 via-sky-200 to-blue-100": "from-fuchsia-300 via-orange-200 to-amber-200",
  "from-green-400 via-lime-200 to-yellow-100": "from-sky-400 via-cyan-200 to-fuchsia-200",
  "from-blue-400 via-sky-200 to-emerald-100": "from-pink-400 via-orange-200 to-violet-200",
  "from-pink-50 to-pink-500": "from-lime-300 via-teal-200 to-cyan-200",
  // fallback pour les cas non couverts :
  "default": "from-pink-400 via-orange-200 to-violet-200"
};

export default function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = feature.icon;

  // On récupère le dégradé complémentaire pour ce type de carte
  const compGradient =
    complementaryGradients[feature.color as keyof typeof complementaryGradients] ||
    complementaryGradients["default"];

  return (
    <Link to={feature.path}>
      <Card
        className={`
          group h-full cursor-pointer rounded-2xl transition 
          bg-gradient-to-tl ${feature.color}
          hover:shadow-2xl hover:-translate-y-0.5 
          duration-200 hover-scale
          border-0 shadow-md
          animate-fade-in
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
            transition group-hover:scale-105
          ">
            <IconComponent className="h-9 w-9 sm:h-12 sm:w-12 text-primary-600 dark:text-primary" />
          </div>
          <CardTitle className="text-lg mt-1 font-semibold">{feature.title}</CardTitle>
          <CardDescription className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-0">
          <Button
            variant="outline"
            className={`
              w-full rounded-xl shadow-sm hover:shadow group-hover:scale-[1.025] transition-all duration-150
              text-[0.95em] py-2
              relative z-10
              overflow-hidden
              bg-white/60
              before:content-[''] before:absolute before:inset-0 before:-z-10
              before:bg-none
              hover:before:bg-gradient-to-tr hover:before:${compGradient}
              hover:before:opacity-100
              active:before:bg-gradient-to-tr active:before:${compGradient}
              before:transition-all before:duration-200
            `}
            style={{
              // fallback support for non-Tailwind utility part in before
              // nothing extra ici
            }}
          >
            Découvrir
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
