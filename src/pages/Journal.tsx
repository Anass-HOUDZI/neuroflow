
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, BookOpen } from "lucide-react";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { JournalEntry, JournalEntryData } from "@/components/journal/JournalEntry";
import { JournalStats } from "@/components/journal/JournalStats";
import { JournalEditor } from "@/components/journal/JournalEditor";

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntryData[]>([
    {
      id: 1,
      title: "Great day at work",
      content: "Had a productive meeting with the team and made good progress on the project...",
      date: "2024-06-14",
      mood: "happy"
    },
    {
      id: 2,
      title: "Morning reflections",
      content: "Woke up feeling grateful for all the opportunities ahead...",
      date: "2024-06-13",
      mood: "peaceful"
    },
    {
      id: 3,
      title: "Challenging day",
      content: "Today was tough but I learned a lot about myself...",
      date: "2024-06-12",
      mood: "thoughtful"
    }
  ]);
  
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleSaveEntry = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both title and content are required.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: JournalEntryData = {
      id: entries.length + 1,
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      mood: "neutral"
    };

    setEntries([newEntry, ...entries]);
    setNewTitle("");
    setNewContent("");
    setIsWriting(false);

    toast({
      title: "Entry saved!",
      description: "Your journal entry has been saved successfully.",
    });
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isWriting) {
    return (
      <JournalEditor
        title={newTitle}
        content={newContent}
        onTitleChange={setNewTitle}
        onContentChange={setNewContent}
        onSave={handleSaveEntry}
        onCancel={() => setIsWriting(false)}
      />
    );
  }

  return (
    <PageLayout className="bg-gradient-to-br from-blue-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <PageHeader
        title="Journal"
        description="Capturez vos pensées et réflexions quotidiennes"
        icon={<BookOpen className="h-12 w-12 text-blue-600" />}
        actions={
          <Button onClick={() => setIsWriting(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle entrée
          </Button>
        }
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher dans vos entrées..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <JournalStats
          totalEntries={entries.length}
          streak={7}
          consistency={85}
        />

        {/* Entries List */}
        {filteredEntries.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="pt-6 text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Aucune entrée trouvée</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Essayez avec d'autres mots-clés" : "Commencez par écrire votre première entrée"}
              </p>
              <Button onClick={() => setIsWriting(true)}>
                Écrire ma première entrée
              </Button>
            </CardContent>
          </Card>
        ) : (
          <JournalEntry entries={filteredEntries} />
        )}
      </div>
    </PageLayout>
  );
};

export default Journal;
