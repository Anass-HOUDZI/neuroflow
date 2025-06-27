
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export interface JournalEntryData {
  id: number;
  title: string;
  content: string;
  date: string;
  mood: string;
}

interface JournalEntryProps {
  entries: JournalEntryData[];
}

export const JournalEntry: React.FC<JournalEntryProps> = ({ entries }) => {
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

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
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
      ))}
    </div>
  );
};
