
import React from "react";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Heart, 
  Shield, 
  Github, 
  Linkedin, 
  Mail,
  BookOpen,
  CheckSquare,
  Clipboard,
  Calendar,
  Target,
  Smile,
  Wind,
  Activity,
  Dumbbell,
  Moon,
  Droplets,
  Apple,
  Music,
  PieChart,
  TrendingUp,
  BarChart3
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Productivité",
      links: [
        { name: "ZenPad", href: "/zenpad", icon: BookOpen },
        { name: "HabitGrid", href: "/habitgrid", icon: CheckSquare },
        { name: "LocalBoard", href: "/localboard", icon: Clipboard },
        { name: "Calendrier", href: "/calendar", icon: Calendar },
        { name: "Objectifs", href: "/goals", icon: Target },
        { name: "Journal", href: "/journal", icon: BookOpen }
      ]
    },
    {
      title: "Bien-être",
      links: [
        { name: "Suivi Humeur", href: "/mood", icon: Smile },
        { name: "Méditation", href: "/meditation", icon: Brain },
        { name: "Respiration", href: "/mindfulbreath", icon: Wind },
        { name: "Anxiété", href: "/anxietyhelper", icon: Activity },
        { name: "Gratitude", href: "/gratitudegarden", icon: Heart }
      ]
    },
    {
      title: "Santé",
      links: [
        { name: "Fitness", href: "/fitnesslog", icon: Dumbbell },
        { name: "Sommeil", href: "/sleepanalyzer", icon: Moon },
        { name: "Hydratation", href: "/hydro", icon: Droplets },
        { name: "Nutrition", href: "/nutrienttracker", icon: Apple },
        { name: "Énergie", href: "/energybalance", icon: Activity }
      ]
    },
    {
      title: "Outils",
      links: [
        { name: "SoundWeaver", href: "/soundweaver", icon: Music },
        { name: "DataViz", href: "/dataviz", icon: PieChart },
        { name: "StatsPro", href: "/statspro", icon: TrendingUp },
        { name: "Analytics", href: "/analytics", icon: BarChart3 }
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Logo et description */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  NeuroFlow Suite
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Compagnon bien-être neuroscientifique
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Une suite complète d'outils de bien-être basés sur les neurosciences. 
              Vos données restent privées et l'application fonctionne entièrement hors ligne.
            </p>
            
            {/* Valeurs */}
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <Shield className="h-3 w-3" />
                <span>100% Local</span>
              </div>
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Brain className="h-3 w-3" />
                <span>Science-Based</span>
              </div>
              <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                <Heart className="h-3 w-3" />
                <span>Sans Distraction</span>
              </div>
            </div>
          </div>

          {/* Liens organisés */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <IconComponent className="h-3 w-3" />
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
              <span>
                Copyright © 2025{" "}
                <a
                  href="https://www.linkedin.com/in/anasshoudzi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-colors"
                >
                  Anass Houdzi
                </a>
                {" – Tous droits réservés."}
              </span>
            </div>

            {/* Liens sociaux */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:anass.houdzi@gmail.com"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/anasshoudzi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/Anass-HOUDZI/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>

            {/* Navigation rapide */}
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/about"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/favorites"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Favoris
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
