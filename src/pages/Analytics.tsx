
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Calendar, Heart, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const Analytics = () => {
  // Sample data for charts
  const moodData = [
    { date: 'Mon', mood: 4, energy: 3 },
    { date: 'Tue', mood: 3, energy: 4 },
    { date: 'Wed', mood: 5, energy: 5 },
    { date: 'Thu', mood: 3, energy: 3 },
    { date: 'Fri', mood: 4, energy: 4 },
    { date: 'Sat', mood: 5, energy: 5 },
    { date: 'Sun', mood: 4, energy: 3 },
  ];

  const activityData = [
    { activity: 'Meditation', count: 12, color: '#8B5CF6' },
    { activity: 'Journal', count: 8, color: '#3B82F6' },
    { activity: 'Goals', count: 15, color: '#10B981' },
    { activity: 'Mood Track', count: 20, color: '#F59E0B' },
  ];

  const goalProgressData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'In Progress', value: 25, color: '#3B82F6' },
    { name: 'Not Started', value: 10, color: '#6B7280' },
  ];

  const weeklyStats = [
    { day: 'Mon', sessions: 2 },
    { day: 'Tue', sessions: 1 },
    { day: 'Wed', sessions: 3 },
    { day: 'Thu', sessions: 2 },
    { day: 'Fri', sessions: 4 },
    { day: 'Sat', sessions: 3 },
    { day: 'Sun', sessions: 2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
            <p className="text-gray-600">Insights into your wellness journey</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-pink-600" />
              <p className="text-2xl font-bold">4.2</p>
              <p className="text-sm text-gray-600">Avg Mood</p>
              <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.3 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">17</p>
              <p className="text-sm text-gray-600">Day Streak</p>
              <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Personal best!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-gray-600">Goals Progress</p>
              <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl mb-2">🧘</div>
              <p className="text-2xl font-bold">147</p>
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-xs text-blue-600 flex items-center justify-center mt-1">
                23 this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Mood & Energy Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Mood & Energy Trends</CardTitle>
              <CardDescription>Your mood and energy levels over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    name="Mood"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Energy"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Breakdown</CardTitle>
              <CardDescription>Your wellness activities this month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="activity" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Goal Progress Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Progress Distribution</CardTitle>
              <CardDescription>Overview of your goal completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={goalProgressData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {goalProgressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Session Count */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Sessions</CardTitle>
              <CardDescription>Number of wellness sessions per day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Insights & Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Insights & Recommendations</CardTitle>
            <CardDescription>Personalized insights based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">🎯 Great Progress!</h4>
                  <p className="text-sm text-green-700">
                    You've maintained a 17-day streak! Your consistency is paying off with improved mood scores.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">📈 Trending Up</h4>
                  <p className="text-sm text-blue-700">
                    Your average mood has increased by 0.3 points this week. Keep up the great work!
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">💡 Suggestion</h4>
                  <p className="text-sm text-orange-700">
                    Consider adding more meditation sessions on weekdays when your energy levels tend to be lower.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">🎯 Next Goal</h4>
                  <p className="text-sm text-purple-700">
                    You're 85% through your current goals. Consider setting new challenges to maintain momentum.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
