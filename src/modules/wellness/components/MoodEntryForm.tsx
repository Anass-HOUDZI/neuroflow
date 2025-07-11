
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Smile, Meh, Frown, Heart, Brain, Zap, Coffee } from 'lucide-react';
import { useWellnessStore } from '@/core/stores/wellnessStore';
import { useToast } from '@/hooks/use-toast';

const moods = [
  { id: "great", label: "Great", icon: Smile, color: "bg-green-100 text-green-600 border-green-200" },
  { id: "good", label: "Good", icon: Smile, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: "okay", label: "Okay", icon: Meh, color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
  { id: "low", label: "Low", icon: Frown, color: "bg-orange-100 text-orange-600 border-orange-200" },
  { id: "difficult", label: "Difficult", icon: Frown, color: "bg-red-100 text-red-600 border-red-200" },
];

const factors = [
  { id: "sleep", label: "Sleep", icon: Brain },
  { id: "exercise", label: "Exercise", icon: Zap },
  { id: "social", label: "Social", icon: Heart },
  { id: "work", label: "Work", icon: Coffee },
];

export const MoodEntryForm = React.memo(() => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [energy, setEnergy] = useState<number>(3);
  const [stress, setStress] = useState<number>(3);
  const [notes, setNotes] = useState<string>("");
  
  const addMoodEntry = useWellnessStore((state) => state.addMoodEntry);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today to continue.",
        variant: "destructive",
      });
      return;
    }

    const moodValue = moods.findIndex(mood => mood.id === selectedMood) + 1;
    
    addMoodEntry({
      date: new Date().toISOString().split('T')[0],
      mood: moodValue,
      energy,
      stress,
      notes
    });

    toast({
      title: "Mood logged successfully! 🌟",
      description: "Your mood has been recorded for today.",
    });

    // Reset form
    setSelectedMood("");
    setEnergy(3);
    setStress(3);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Mood Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Your Mood</CardTitle>
          <CardDescription>Choose the option that best describes how you feel right now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {moods.map((mood) => {
              const IconComponent = mood.icon;
              return (
                <Button
                  key={mood.id}
                  variant={selectedMood === mood.id ? "default" : "outline"}
                  className={`h-20 flex flex-col space-y-2 ${
                    selectedMood === mood.id ? "" : mood.color
                  }`}
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm">{mood.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Energy & Stress Levels */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Energy Level</CardTitle>
            <CardDescription>Rate your energy from 1 (low) to 5 (high)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Low</span>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Button
                    key={level}
                    variant={energy >= level ? "default" : "outline"}
                    size="sm"
                    className="w-10 h-10 rounded-full"
                    onClick={() => setEnergy(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
              <span className="text-sm text-gray-500">High</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stress Level</CardTitle>
            <CardDescription>Rate your stress from 1 (low) to 5 (high)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Low</span>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Button
                    key={level}
                    variant={stress >= level ? "default" : "outline"}
                    size="sm"
                    className="w-10 h-10 rounded-full"
                    onClick={() => setStress(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
              <span className="text-sm text-gray-500">High</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Influencing Factors */}
      <Card>
        <CardHeader>
          <CardTitle>What's influencing your mood?</CardTitle>
          <CardDescription>Select any factors that might be affecting how you feel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {factors.map((factor) => {
              const IconComponent = factor.icon;
              return (
                <Button
                  key={factor.id}
                  variant="outline"
                  className="h-16 flex flex-col space-y-2"
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-sm">{factor.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardDescription>Add any additional thoughts or details (optional)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notes">What's on your mind?</Label>
            <Textarea
              id="notes"
              placeholder="Describe what's contributing to your mood today..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="text-center">
        <Button onClick={handleSubmit} size="lg" className="w-full md:w-auto">
          Log Mood Entry
        </Button>
      </div>
    </div>
  );
});

MoodEntryForm.displayName = 'MoodEntryForm';
