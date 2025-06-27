
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Search, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100">
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
              <h1 className="text-3xl font-bold text-gray-800">Journal</h1>
              <p className="text-gray-600">Capture your thoughts and reflections</p>
            </div>
          </div>
          <Button onClick={() => setIsWriting(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Entry
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search your entries..."
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
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No entries found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "Try a different search term" : "Start writing your first journal entry"}
              </p>
              <Button onClick={() => setIsWriting(true)}>
                Write First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <JournalEntry entries={filteredEntries} />
        )}
      </div>
    </div>
  );
};

export default Journal;
