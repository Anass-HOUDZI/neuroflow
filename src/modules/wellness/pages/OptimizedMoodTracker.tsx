
import React, { useState } from "react";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MoodEntryForm } from "../components/MoodEntryForm";
import { MoodHistory } from "../components/MoodHistory";

const OptimizedMoodTracker = () => {
  const [activeTab, setActiveTab] = useState<'entry' | 'history'>('entry');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">Mood Tracker</h1>
            <p className="text-gray-600">Track your emotional well-being with scientific precision</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'entry' ? 'default' : 'outline'}
            onClick={() => setActiveTab('entry')}
          >
            New Entry
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveTab('history')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            History & Insights
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'entry' ? <MoodEntryForm /> : <MoodHistory />}
      </div>
    </div>
  );
};

export default OptimizedMoodTracker;
