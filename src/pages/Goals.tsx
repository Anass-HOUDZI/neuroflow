
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Plus, Target, Calendar, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  progress: number;
  completed: boolean;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "Personnel",
    deadline: ""
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedGoals = localStorage.getItem('neuroflow-goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    localStorage.setItem('neuroflow-goals', JSON.stringify(updatedGoals));
  };

  const addGoal = () => {
    if (!newGoal.title.trim()) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      deadline: newGoal.deadline,
      progress: 0,
      completed: false
    };

    saveGoals([...goals, goal]);
    setNewGoal({ title: "", description: "", category: "Personnel", deadline: "" });
    setShowForm(false);
  };

  const updateProgress = (id: string, progress: number) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, progress, completed: progress >= 100 } : goal
    );
    saveGoals(updatedGoals);
  };

  const completedGoals = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Objectifs"
          description="Définissez et suivez vos objectifs personnels et professionnels"
          icon={<Trophy className="h-12 w-12 text-yellow-500" />}
          actions={
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nouvel objectif
            </Button>
          }
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Statistiques */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{totalGoals}</div>
                <div className="text-sm text-muted-foreground">Objectifs totaux</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{completedGoals}</div>
                <div className="text-sm text-muted-foreground">Complétés</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0}%</div>
                <div className="text-sm text-muted-foreground">Taux de réussite</div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire d'ajout */}
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Nouvel objectif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Titre de l'objectif"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
                <Textarea
                  placeholder="Description (optionnelle)"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  >
                    <option>Personnel</option>
                    <option>Professionnel</option>
                    <option>Santé</option>
                    <option>Apprentissage</option>
                  </select>
                  <Input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addGoal}>Créer</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Liste des objectifs */}
          <div className="space-y-4">
            {goals.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Aucun objectif défini</h3>
                  <p className="text-muted-foreground mb-4">
                    Commencez par créer votre premier objectif
                  </p>
                  <Button onClick={() => setShowForm(true)}>
                    Créer mon premier objectif
                  </Button>
                </CardContent>
              </Card>
            ) : (
              goals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className={goal.completed ? "line-through text-muted-foreground" : ""}>
                          {goal.title}
                        </CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{goal.category}</Badge>
                        {goal.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progrès</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} />
                      <div className="flex items-center justify-between">
                        {goal.deadline && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(goal.deadline).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                        {!goal.completed && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateProgress(goal.id, Math.min(100, goal.progress + 25))}
                            >
                              +25%
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateProgress(goal.id, 100)}
                            >
                              Terminer
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
