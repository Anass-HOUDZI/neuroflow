import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, MoreVertical, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BoardCard {
  id: string;
  title: string;
  description: string;
  color: string;
  createdAt: Date;
}

interface Column {
  id: string;
  title: string;
  cards: BoardCard[];
}

interface Board {
  id: string;
  title: string;
  columns: Column[];
  createdAt: Date;
}

const LocalBoard = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [showNewCardForm, setShowNewCardForm] = useState<string | null>(null);
  const [showNewColumnForm, setShowNewColumnForm] = useState(false);
  const [draggedCard, setDraggedCard] = useState<{ card: BoardCard; fromColumn: string } | null>(null);
  const { toast } = useToast();

  // Couleurs pour les cartes
  const cardColors = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B",
    "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16"
  ];

  useEffect(() => {
    const savedBoards = localStorage.getItem("localboard-boards");
    if (savedBoards) {
      const parsedBoards = JSON.parse(savedBoards).map((board: any) => ({
        ...board,
        createdAt: new Date(board.createdAt),
        columns: board.columns.map((col: any) => ({
          ...col,
          cards: col.cards.map((card: any) => ({
            ...card,
            createdAt: new Date(card.createdAt)
          }))
        }))
      }));
      setBoards(parsedBoards);
    }
  }, []);

  const saveBoards = (updatedBoards: Board[]) => {
    localStorage.setItem("localboard-boards", JSON.stringify(updatedBoards));
    setBoards(updatedBoards);
  };

  const createBoard = (template: string) => {
    const newBoard: Board = {
      id: Date.now().toString(),
      title: `Nouveau ${template}`,
      columns: getTemplateColumns(template),
      createdAt: new Date()
    };
    
    const updatedBoards = [...boards, newBoard];
    saveBoards(updatedBoards);
    setSelectedBoard(newBoard);
    
    toast({
      title: "Tableau créé",
      description: `Votre tableau ${template} est prêt !`
    });
  };

  const getTemplateColumns = (template: string): Column[] => {
    switch (template) {
      case "Kanban":
        return [
          { id: "todo", title: "À faire", cards: [] },
          { id: "doing", title: "En cours", cards: [] },
          { id: "done", title: "Terminé", cards: [] }
        ];
      case "Projet":
        return [
          { id: "backlog", title: "Backlog", cards: [] },
          { id: "sprint", title: "Sprint", cards: [] },
          { id: "review", title: "Review", cards: [] },
          { id: "deploy", title: "Déployé", cards: [] }
        ];
      default:
        return [
          { id: "col1", title: "Colonne 1", cards: [] },
          { id: "col2", title: "Colonne 2", cards: [] }
        ];
    }
  };

  const addColumn = (title: string) => {
    if (!selectedBoard) return;
    
    const newColumn: Column = {
      id: Date.now().toString(),
      title,
      cards: []
    };
    
    const updatedBoard = {
      ...selectedBoard,
      columns: [...selectedBoard.columns, newColumn]
    };
    
    const updatedBoards = boards.map(b => b.id === selectedBoard.id ? updatedBoard : b);
    saveBoards(updatedBoards);
    setSelectedBoard(updatedBoard);
    setShowNewColumnForm(false);
  };

  const addCard = (columnId: string, title: string, description: string) => {
    if (!selectedBoard) return;
    
    const newCard: BoardCard = {
      id: Date.now().toString(),
      title,
      description,
      color: cardColors[Math.floor(Math.random() * cardColors.length)],
      createdAt: new Date()
    };
    
    const updatedBoard = {
      ...selectedBoard,
      columns: selectedBoard.columns.map(col =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    };
    
    const updatedBoards = boards.map(b => b.id === selectedBoard.id ? updatedBoard : b);
    saveBoards(updatedBoards);
    setSelectedBoard(updatedBoard);
    setShowNewCardForm(null);
    
    toast({
      title: "Carte ajoutée",
      description: "Votre nouvelle tâche a été créée !"
    });
  };

  const handleDragStart = (card: BoardCard, fromColumn: string) => {
    setDraggedCard({ card, fromColumn });
  };

  const handleDrop = (toColumnId: string) => {
    if (!draggedCard || !selectedBoard) return;
    
    const updatedBoard = {
      ...selectedBoard,
      columns: selectedBoard.columns.map(col => {
        if (col.id === draggedCard.fromColumn) {
          return {
            ...col,
            cards: col.cards.filter(c => c.id !== draggedCard.card.id)
          };
        }
        if (col.id === toColumnId) {
          return {
            ...col,
            cards: [...col.cards, draggedCard.card]
          };
        }
        return col;
      })
    };
    
    const updatedBoards = boards.map(b => b.id === selectedBoard.id ? updatedBoard : b);
    saveBoards(updatedBoards);
    setSelectedBoard(updatedBoard);
    setDraggedCard(null);
  };

  const deleteCard = (columnId: string, cardId: string) => {
    if (!selectedBoard) return;
    
    const updatedBoard = {
      ...selectedBoard,
      columns: selectedBoard.columns.map(col =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter(c => c.id !== cardId) }
          : col
      )
    };
    
    const updatedBoards = boards.map(b => b.id === selectedBoard.id ? updatedBoard : b);
    saveBoards(updatedBoards);
    setSelectedBoard(updatedBoard);
  };

  if (selectedBoard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setSelectedBoard(null)}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">{selectedBoard.title}</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowNewColumnForm(true)}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Colonne
              </Button>
            </div>
          </div>

          {/* Board */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {selectedBoard.columns.map((column) => (
              <div
                key={column.id}
                className="min-w-80 bg-white/80 rounded-lg p-4"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(column.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">{column.title}</h3>
                  <Badge variant="secondary">{column.cards.length}</Badge>
                </div>

                <div className="space-y-3 min-h-[200px]">
                  {column.cards.map((card) => (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={() => handleDragStart(card, column.id)}
                      className="p-3 bg-white rounded-lg shadow-sm border cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: card.color }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCard(column.id, card.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{card.title}</h4>
                      {card.description && (
                        <p className="text-xs text-gray-600">{card.description}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Card Form */}
                {showNewCardForm === column.id ? (
                  <NewCardForm
                    onSubmit={(title, description) => addCard(column.id, title, description)}
                    onCancel={() => setShowNewCardForm(null)}
                  />
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => setShowNewCardForm(column.id)}
                    className="w-full mt-3 text-gray-500 hover:text-gray-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une carte
                  </Button>
                )}
              </div>
            ))}

            {/* New Column Form */}
            {showNewColumnForm && (
              <div className="min-w-80 bg-white/80 rounded-lg p-4">
                <NewColumnForm
                  onSubmit={addColumn}
                  onCancel={() => setShowNewColumnForm(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" asChild className="p-2">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold text-gray-800">LocalBoard</h1>
            </div>
            <p className="text-gray-600">Gestion de projet Kanban fluide et hors-ligne</p>
          </div>
        </div>

        {/* Templates */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => createBoard("Kanban")}>
            <CardHeader>
              <CardTitle className="text-lg">📋 Kanban Simple</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Template classique : À faire → En cours → Terminé
              </p>
              <div className="flex gap-1">
                <div className="w-2 h-8 bg-blue-200 rounded"></div>
                <div className="w-2 h-8 bg-yellow-200 rounded"></div>
                <div className="w-2 h-8 bg-green-200 rounded"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => createBoard("Projet")}>
            <CardHeader>
              <CardTitle className="text-lg">🚀 Gestion Projet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Pour développement : Backlog → Sprint → Review → Déployé
              </p>
              <div className="flex gap-1">
                <div className="w-2 h-8 bg-gray-200 rounded"></div>
                <div className="w-2 h-8 bg-blue-200 rounded"></div>
                <div className="w-2 h-8 bg-purple-200 rounded"></div>
                <div className="w-2 h-8 bg-green-200 rounded"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => createBoard("Custom")}>
            <CardHeader>
              <CardTitle className="text-lg">⚡ Tableau Vide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Commencez avec un tableau vierge et créez vos colonnes
              </p>
              <div className="flex gap-1">
                <div className="w-2 h-8 bg-slate-200 rounded"></div>
                <div className="w-2 h-8 bg-slate-200 rounded"></div>
                <div className="w-6 h-8 bg-slate-100 rounded border-2 border-dashed border-slate-300"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Existing Boards */}
        {boards.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Vos tableaux</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {boards.map((board) => (
                <Card
                  key={board.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedBoard(board)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{board.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{board.columns.length} colonnes</span>
                      <span>
                        {board.columns.reduce((acc, col) => acc + col.cards.length, 0)} cartes
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Composants pour les formulaires
const NewCardForm = ({ onSubmit, onCancel }: { onSubmit: (title: string, description: string) => void; onCancel: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 p-3 bg-gray-50 rounded">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la carte"
        className="mb-2"
        autoFocus
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optionnelle)"
        className="mb-3"
        rows={2}
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm">Ajouter</Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

const NewColumnForm = ({ onSubmit, onCancel }: { onSubmit: (title: string) => void; onCancel: () => void }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-semibold mb-3">Nouvelle colonne</h3>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nom de la colonne"
        className="mb-3"
        autoFocus
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm">Créer</Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default LocalBoard;
