
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { features } from "@/data/features";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredFeatures = features.filter(
    (feature) =>
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <Input
        type="search"
        placeholder="Rechercher un outil..."
        className="w-full bg-white/80 backdrop-blur-sm border-white/20 text-gray-700 placeholder:text-gray-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />

      {isOpen && searchTerm && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-2 bg-white/95 backdrop-blur-sm border-white/20 shadow-lg z-50 max-h-96 overflow-y-auto">
          {filteredFeatures.length > 0 ? (
            <div className="space-y-2">
              {filteredFeatures.slice(0, 6).map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Link
                    key={feature.id}
                    to={feature.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color}`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">
                        {feature.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {feature.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {feature.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        {feature.estimatedTime}
                      </div>
                    </div>
                  </Link>
                );
              })}
              {filteredFeatures.length > 6 && (
                <div className="text-center text-sm text-gray-500 p-2">
                  +{filteredFeatures.length - 6} autres résultats...
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 p-4">
              Aucun outil trouvé pour "{searchTerm}"
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
