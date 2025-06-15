
import { Card } from "@/components/ui/card";
import { Heart, Star, Zap, Target } from "lucide-react";

interface EncouragementMessageProps {
  weeklyProgress: number;
  streak: number;
  activeHabitsCount: number;
}

export const EncouragementMessage = ({ 
  weeklyProgress, 
  streak, 
  activeHabitsCount 
}: EncouragementMessageProps) => {
  const getMessage = () => {
    if (activeHabitsCount === 0) {
      return {
        text: "Bienvenue dans votre parcours d'habitudes ! Commencez par créer votre première habitude.",
        icon: Star,
        color: "text-blue-500",
        bgColor: "bg-blue-50"
      };
    }

    if (weeklyProgress >= 80) {
      return {
        text: "Incroyable ! Vous êtes sur une excellente lancée. Votre régularité est inspirante ! 🌟",
        icon: Zap,
        color: "text-green-500",
        bgColor: "bg-green-50"
      };
    }

    if (weeklyProgress >= 60) {
      return {
        text: "Très bien ! Vous maintenez un bon rythme. Chaque petit pas compte ! 💪",
        icon: Target,
        color: "text-emerald-500",
        bgColor: "bg-emerald-50"
      };
    }

    if (weeklyProgress >= 40) {
      return {
        text: "C'est un bon début ! N'oubliez pas que la progression n'est pas linéaire. Continuez ! 🌱",
        icon: Heart,
        color: "text-orange-500",
        bgColor: "bg-orange-50"
      };
    }

    if (streak > 0) {
      return {
        text: `Votre série de ${streak} jour${streak > 1 ? 's' : ''} montre votre engagement. Soyez fier de chaque effort ! ❤️`,
        icon: Heart,
        color: "text-pink-500",
        bgColor: "bg-pink-50"
      };
    }

    return {
      text: "Chaque nouveau jour est une opportunité. Soyez bienveillant avec vous-même et commencez petit ! 🌸",
      icon: Heart,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    };
  };

  const message = getMessage();
  const IconComponent = message.icon;

  return (
    <Card className={`mb-8 ${message.bgColor} border-0`}>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <IconComponent className={`h-6 w-6 ${message.color}`} />
          <p className="text-gray-700 font-medium">
            {message.text}
          </p>
        </div>
      </div>
    </Card>
  );
};
