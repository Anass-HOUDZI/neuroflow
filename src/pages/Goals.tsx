
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Target, Calendar, CheckCircle, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Goals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Daily Meditation",
      description: "Meditate for 10 minutes every day",
      progress: 75,
      target: 30,
      current: 22,
      category: "Mindfulness",
      deadline: "2024-07-15",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 2,
      title: "Journal Writing",
      description: "Write in journal 5 times per week",
      progress: 60,
      target: 20,
      current: 12,
      category: "Reflection",
      deadline: "2024-07-01",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 3,
      title: "Mood Tracking",
      description: "Track mood daily for self-awareness",
      progress: 90,
      target: 30,
      current: 27,
      category: "Self-Care",
      deadline: "2024-06-30",
      color: "bg-green-100 text-green-600"
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    category: "Wellness"
  });

  const { toast } = useToast();

  const handleCreateGoal = () => {
    if (!newGoal.title.trim() || !newGoal.target) {
      toast({
        title: "Please fill in required fields",
        description: "Title and target are required to create a goal.",
        variant: "destructive",
      });
      return;
    }

    const goal = {
      id: goals.length + 1,
      title: newGoal.title,
      description: newGoal.description,
      progress: 0,
      target: parseInt(newGoal.target),
      current: 0,
      category: newGoal.category,
      deadline: newGoal.deadline,
      color: "bg-orange-100 text-orange-600"
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: "",
      description: "",
      target: "",
      deadline: "",
      category: "Wellness"
    });
    setIsCreating(false);

    toast({
      title: "Goal created!",
      description: "Your new goal has been added successfully.",
    });
  };

  const updateProgress = (goalId: number, increment: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.max(0, Math.min(goal.target, goal.current + increment));
        const newProgress = (newCurrent / goal.target) * 100;
        return { ...goal, current: newCurrent, progress: newProgress };
      }
      return goal;
    }));

    toast({
      title: increment > 0 ? "Progress updated!" : "Progress decreased",
      description: increment > 0 ? "Great job on your progress!" : "Progress has been adjusted.",
    });
  };

  const getDaysRemaining = (deadline: string) => {
    if (!deadline) return null;
    const today = new Date();
    const end = new Date(deadline);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4"
              onClick={() => setIsCreating(false)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Create New Goal</h1>
              <p className="text-gray-600">Set a new wellness goal to work towards</p>
            </div>
          </div>

          {/* Goal Creation Form */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Goal Details</CardTitle>
                <CardDescription>Define your goal and track your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Goal Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Daily Exercise"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your goal in detail..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target">Target (number) *</Label>
                    <Input
                      id="target"
                      type="number"
                      placeholder="e.g., 30"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border rounded-md"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    >
                      <option value="Wellness">Wellness</option>
                      <option value="Mindfulness">Mindfulness</option>
                      <option value="Exercise">Exercise</option>
                      <option value="Reflection">Reflection</option>
                      <option value="Self-Care">Self-Care</option>
                      <option value="Habit">Habit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="deadline">Deadline (optional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreating(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGoal} className="flex-1">
                    Create Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" size="icon" className="mr-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Goals</h1>
              <p className="text-gray-600">Track your wellness journey</p>
            </div>
          </div>
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Goal
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{goals.length}</p>
              <p className="text-sm text-gray-600">Active Goals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">
                {goals.filter(goal => goal.progress === 100).length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Circle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">
                {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
              </p>
              <p className="text-sm text-gray-600">Avg Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-gray-600">Due Soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {goals.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No goals yet</h3>
                <p className="text-gray-600 mb-4">Create your first wellness goal to get started</p>
                <Button onClick={() => setIsCreating(true)}>
                  Create Your First Goal
                </Button>
              </CardContent>
            </Card>
          ) : (
            goals.map((goal) => {
              const daysRemaining = getDaysRemaining(goal.deadline);
              return (
                <Card key={goal.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${goal.color.split(' ')[0]}`} />
                          <CardTitle className="text-xl">{goal.title}</CardTitle>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${goal.color}`}>
                            {goal.category}
                          </span>
                        </div>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                      {daysRemaining !== null && (
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {daysRemaining > 0 ? `${daysRemaining} days left` : 
                             daysRemaining === 0 ? 'Due today' : 'Overdue'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(goal.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{goal.current}/{goal.target} ({Math.round(goal.progress)}%)</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateProgress(goal.id, 1)}
                          disabled={goal.current >= goal.target}
                        >
                          +1 Progress
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateProgress(goal.id, -1)}
                          disabled={goal.current <= 0}
                        >
                          -1 Progress
                        </Button>
                        {goal.progress === 100 && (
                          <Button variant="default" size="sm" disabled>
                            ✅ Completed!
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;
