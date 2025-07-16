
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { features } from "@/data/features";
import { useNavigate } from "react-router-dom";

export default function FeaturesGrid() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Votre boîte à outils complète
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Une suite d'applications spécialisées, chacune optimisée pour un aspect spécifique de votre développement personnel
          </p>
        </motion.div>

        {/* Grille des fonctionnalités par catégorie */}
        {Object.entries(features).map(([category, categoryFeatures]) => (
          <motion.div
            key={category}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 capitalize">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryFeatures.map((feature, index) => (
                <motion.div key={feature.id} variants={itemVariants}>
                  <Card 
                    className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                    onClick={() => navigate(feature.path)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                          style={{ backgroundColor: feature.color }}
                        >
                          {feature.icon}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {feature.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {feature.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {feature.benefits && (
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            {feature.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start">
                                <span className="text-green-500 mr-1">✓</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
