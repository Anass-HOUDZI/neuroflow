
import { useState, useEffect } from "react";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star, Trash2 } from "lucide-react";
import { features } from "@/data/features";
import { Link } from "react-router-dom";
import GlobalLayout from "@/components/layout/GlobalLayout";

interface FavoriteFeature {
  path: string;
  title: string;
  description: string;
  addedAt: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteFeature[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('neuroflow-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (path: string) => {
    const updatedFavorites = favorites.filter(fav => fav.path !== path);
    setFavorites(updatedFavorites);
    localStorage.setItem('neuroflow-favorites', JSON.stringify(updatedFavorites));
  };

  const addSampleFavorites = () => {
    const sampleFavorites = features.slice(0, 3).map(feature => ({
      path: feature.path,
      title: feature.title,
      description: feature.description,
      addedAt: new Date().toISOString()
    }));
    setFavorites(sampleFavorites);
    localStorage.setItem('neuroflow-favorites', JSON.stringify(sampleFavorites));
  };

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Mes Favoris"
          description="Retrouvez rapidement vos outils préférés pour un accès simplifié"
          icon={<Heart className="h-12 w-12 text-red-500" />}
        />

        {favorites.length === 0 ? (
          <Card className="glass-card text-center max-w-md mx-auto">
            <CardHeader>
              <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <CardTitle>Aucun favori pour le moment</CardTitle>
              <CardDescription>
                Ajoutez vos outils préférés en cliquant sur l'icône cœur depuis n'importe quel outil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={addSampleFavorites} className="mt-4">
                Ajouter des exemples de favoris
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <Card key={favorite.path} className="glass-card group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{favorite.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {favorite.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(favorite.path)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Ajouté le {new Date(favorite.addedAt).toLocaleDateString('fr-FR')}
                    </span>
                    <Link to={favorite.path}>
                      <Button size="sm" className="mt-2">
                        Ouvrir
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </PageLayout>
    </GlobalLayout>
  );
}
