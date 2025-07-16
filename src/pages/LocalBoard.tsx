
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LayoutPanelLeft, Plus, GripVertical, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  createdAt: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export default function LocalBoard() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'À faire', tasks: [] },
    { id: 'doing', title: 'En cours', tasks: [] },
    { id: 'done', title: 'Terminé', tasks: [] }
  ]);
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    tags: ''
  });
  
  const [showForm, setShowForm] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [selectedColumn, setSelectedColumn] = useState('todo');

  useEffect(() => {
    const savedBoard = localStorage.getItem('localboard-data');
    if (savedBoard) {
      setColumns(JSON.parse(savedBoard));
    }
  }, []);

  const saveBoard = (updatedColumns: Column[]) => {
    setColumns(updatedColumns);
    localStorage.setItem('localboard-data', JSON.stringify(updatedColumns));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: selectedColumn,
      priority: newTask.priority,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date().toISOString()
    };

    const updatedColumns = columns.map(col => 
      col.id === selectedColumn 
        ? { ...col, tasks: [...col.tasks, task] }
        : col
    );

    saveBoard(updatedColumns);
    setNewTask({ title: '', description: '', priority: 'medium', tags: '' });
    setShowForm(false);
  };

  const deleteTask = (taskId: string, columnId: string) => {
    const updatedColumns = columns.map(col => 
      col.id === columnId 
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
        : col
    );
    saveBoard(updatedColumns);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedTask) return;

    const sourceColumn = columns.find(col => 
      col.tasks.some(task => task.id === draggedTask.id)
    );
    
    if (!sourceColumn || sourceColumn.id === targetColumnId) {
      setDraggedTask(null);
      return;
    }

    const updatedColumns = columns.map(col => {
      if (col.id === sourceColumn.id) {
        return { ...col, tasks: col.tasks.filter(task => task.id !== draggedTask.id) };
      }
      if (col.id === targetColumnId) {
        return { ...col, tasks: [...col.tasks, { ...draggedTask, status: targetColumnId }] };
      }
      return col;
    });

    saveBoard(updatedColumns);
    setDraggedTask(null);
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0);
  const completedTasks = columns.find(col => col.id === 'done')?.tasks.length || 0;

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="LocalBoard"
          description="Gérez vos projets hors-ligne avec ce Kanban minimaliste"
          icon={<LayoutPanelLeft className="h-12 w-12 text-green-500" />}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                {totalTasks} tâches • {completedTasks} terminées
              </Button>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle tâche
              </Button>
            </div>
          }
        />

        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Formulaire d'ajout */}
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle tâche</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Titre de la tâche"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
                <Textarea
                  placeholder="Description (optionnelle)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <select
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {columns.map(col => (
                      <option key={col.id} value={col.id}>{col.title}</option>
                    ))}
                  </select>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="low">Priorité basse</option>
                    <option value="medium">Priorité moyenne</option>
                    <option value="high">Priorité haute</option>
                  </select>
                  <Input
                    placeholder="Tags (séparés par des virgules)"
                    value={newTask.tags}
                    onChange={(e) => setNewTask({...newTask, tags: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addTask}>Créer</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Colonnes Kanban */}
          <div className="grid md:grid-cols-3 gap-6">
            {columns.map((column) => (
              <Card
                key={column.id}
                className="h-fit"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{column.title}</span>
                    <Badge variant="secondary">{column.tasks.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 min-h-[400px]">
                    {column.tasks.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                        <p className="text-sm">Glissez une tâche ici</p>
                      </div>
                    ) : (
                      column.tasks.map((task) => (
                        <Card
                          key={task.id}
                          className="transition-transform hover:scale-105"
                          draggable
                          onDragStart={() => handleDragStart(task)}
                        >
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm flex-1">{task.title}</h4>
                              <div className="flex items-center gap-1">
                                <GripVertical className="h-3 w-3 text-muted-foreground" />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteTask(task.id, column.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            {task.description && (
                              <p className="text-xs text-muted-foreground mb-2">
                                {task.description}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                <Badge className={`text-xs ${priorityColors[task.priority]}`}>
                                  {task.priority === 'low' ? 'Basse' : 
                                   task.priority === 'medium' ? 'Moyenne' : 'Haute'}
                                </Badge>
                                {task.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="text-xs text-muted-foreground mt-2">
                              {new Date(task.createdAt).toLocaleDateString('fr-FR')}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Guide d'utilisation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">💡 Guide LocalBoard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="font-medium mb-1">Glisser-déposer</div>
                  <div className="text-muted-foreground">Déplacez les tâches entre les colonnes en les faisant glisser</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Priorités</div>
                  <div className="text-muted-foreground">Utilisez les codes couleur pour identifier l'urgence</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Stockage local</div>
                  <div className="text-muted-foreground">Toutes vos données restent sur votre appareil</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
