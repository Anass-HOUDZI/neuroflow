
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Calendar as CalendarIcon, Clock, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Morning Meditation",
      time: "08:00",
      type: "meditation",
      color: "bg-purple-100 text-purple-600 border-purple-200"
    },
    {
      id: 2,
      title: "Mood Check-in",
      time: "12:00",
      type: "mood",
      color: "bg-pink-100 text-pink-600 border-pink-200"
    },
    {
      id: 3,
      title: "Journal Writing",
      time: "20:00",
      type: "journal",
      color: "bg-blue-100 text-blue-600 border-blue-200"
    }
  ];

  const upcomingEvents = [
    {
      id: 4,
      title: "Weekly Goal Review",
      date: "Tomorrow",
      time: "19:00",
      type: "goals",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 5,
      title: "Mindfulness Session",
      date: "Thu, Jun 20",
      time: "07:30",
      type: "meditation",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 6,
      title: "Self-Care Sunday",
      date: "Sun, Jun 23",
      time: "All day",
      type: "self-care",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const hasEvents = (date: Date | null) => {
    if (!date) return false;
    // For demo purposes, assume today has events
    return isToday(date);
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meditation': return '🧘';
      case 'mood': return '💭';
      case 'journal': return '📝';
      case 'goals': return '🎯';
      case 'self-care': return '💆';
      default: return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
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
              <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
              <p className="text-gray-600">Schedule and track your wellness activities</p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{formatMonth(currentDate)}</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(-1)}
                    >
                      ←
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(1)}
                    >
                      →
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {weekDays.map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {days.map((date, index) => (
                    <div
                      key={index}
                      className={`
                        relative p-2 min-h-[60px] border border-gray-100 cursor-pointer transition-colors
                        ${date ? 'hover:bg-gray-50' : ''}
                        ${isToday(date) ? 'bg-blue-50 border-blue-200' : ''}
                        ${isSelected(date) ? 'bg-blue-100 border-blue-300' : ''}
                      `}
                      onClick={() => date && setSelectedDate(date)}
                    >
                      {date && (
                        <>
                          <span className={`text-sm ${isToday(date) ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
                            {date.getDate()}
                          </span>
                          {hasEvents(date) && (
                            <div className="absolute bottom-1 left-1 right-1">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mx-auto"></div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isToday(selectedDate) ? (
                  <div className="space-y-3">
                    {events.map(event => (
                      <div key={event.id} className={`p-3 rounded-lg border ${event.color}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getEventIcon(event.type)}</span>
                            <span className="font-medium">{event.title}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No events scheduled for this day</p>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className={`p-3 rounded-lg ${event.color}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getEventIcon(event.type)}</span>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm opacity-75">{event.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  🧘 Schedule Meditation
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  📝 Plan Journal Time
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  🎯 Set Goal Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  💭 Mood Check Reminder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
