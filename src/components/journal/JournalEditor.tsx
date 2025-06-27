
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

interface JournalEditorProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const JournalEditor: React.FC<JournalEditorProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSave,
  onCancel
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={onCancel}
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
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
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
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    rows={15}
                    className="resize-none"
                  />
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <p className="text-sm text-gray-500">
                    {content.length} characters
                  </p>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                    <Button onClick={onSave}>
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
};
