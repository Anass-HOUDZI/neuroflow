
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, BookOpen, Calendar, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Journal = () => {
  const [entries, setEntries] = useState([
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

    const newEntry = {
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

  const getMoodEmoji = (mood: string) => {
    const moodEmojis = {
      happy: "😊",
      peaceful: "😌",
      thoughtful: "🤔",
      neutral: "😐",
      sad: "😢",
      excited: "🤩"
    };
    return moodEmojis[mood as keyof typeof moodEmojis] || "😐";
  };

  if (isWriting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4"
              onClick={() => setIsWriting(false)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">New Journal Entry</h1>
              <p className="text-gray-600">Express your thoughts and feelings</p>
            </div>
          </div>

          {/* Writing Interface */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Entry Title</Label>
                    <Input
                      id="title"
                      placeholder="Give your entry a title..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content">Your Thoughts</Label>
                    <Textarea
                      id="content"
                      placeholder="What's on your mind today? Share your thoughts, feelings, experiences, or reflections..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={15}
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <p className="text-sm text-gray-500">
                      {newContent.length} characters
                    </p>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsWriting(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveEntry}>
                        Save Entry
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{entries.length}</p>
              <p className="text-sm text-gray-600">Total Entries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">7</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl mb-2">📈</div>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-gray-600">Consistency</p>
            </CardContent>
          </Card>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
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
            filteredEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                        {entry.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 line-clamp-3">
                    {entry.content.length > 150 
                      ? `${entry.content.substring(0, 150)}...` 
                      : entry.content
                    }
                  </p>
                  <Button variant="ghost" className="mt-3 p-0 h-auto text-blue-600">
                    Read more
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
