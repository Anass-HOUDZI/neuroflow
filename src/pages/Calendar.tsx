
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Plus, Clock, MapPin, Users } from "lucide-react";
import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  category: string;
}

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: selectedDate,
    time: "",
    location: "",
    category: "Personnel"
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedEvents = localStorage.getItem('neuroflow-events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const saveEvents = (updatedEvents: Event[]) => {
    setEvents(updatedEvents);
    localStorage.setItem('neuroflow-events', JSON.stringify(updatedEvents));
  };

  const addEvent = () => {
    if (!newEvent.title.trim()) return;
    
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      category: newEvent.category
    };

    saveEvents([...events, event]);
    setNewEvent({
      title: "",
      description: "",
      date: selectedDate,
      time: "",
      location: "",
      category: "Personnel"
    });
    setShowForm(false);
  };

  const deleteEvent = (id: string) => {
    saveEvents(events.filter(event => event.id !== id));
  };

  const filteredEvents = events.filter(event => event.date === selectedDate);
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const categoryColors: Record<string, string> = {
    Personnel: "bg-blue-100 text-blue-800",
    Travail: "bg-green-100 text-green-800",
    Santé: "bg-red-100 text-red-800",
    Social: "bg-purple-100 text-purple-800"
  };

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="Calendrier"
          description="Gérez votre emploi du temps et vos événements importants"
          icon={<CalendarIcon className="h-12 w-12 text-teal-500" />}
          actions={
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nouvel événement
            </Button>
          }
        />

        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Sélecteur de date */}
            <Card>
              <CardHeader>
                <CardTitle>Sélectionner une date</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mb-4"
                />
                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    {filteredEvents.length} événement(s) ce jour
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(selectedDate).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Événements à venir */}
            <Card>
              <CardHeader>
                <CardTitle>Prochains événements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucun événement à venir</p>
                  ) : (
                    upcomingEvents.map((event) => (
                      <div key={event.id} className="p-3 border rounded-lg">
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                          <CalendarIcon className="h-3 w-3" />
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                          {event.time && (
                            <>
                              <Clock className="h-3 w-3 ml-1" />
                              {event.time}
                            </>
                          )}
                        </div>
                        <Badge className={`text-xs mt-1 ${categoryColors[event.category]}`}>
                          {event.category}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{events.length}</div>
                    <div className="text-sm text-muted-foreground">Événements totaux</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                    <div className="text-sm text-muted-foreground">À venir</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire d'ajout */}
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Nouvel événement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Titre de l'événement"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <Textarea
                  placeholder="Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  >
                    <option>Personnel</option>
                    <option>Travail</option>
                    <option>Santé</option>
                    <option>Social</option>
                  </select>
                </div>
                <Input
                  placeholder="Lieu (optionnel)"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
                <div className="flex gap-2">
                  <Button onClick={addEvent}>Créer</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Événements du jour sélectionné */}
          <Card>
            <CardHeader>
              <CardTitle>
                Événements du {new Date(selectedDate).toLocaleDateString('fr-FR')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-muted-foreground">Aucun événement ce jour</p>
                  <Button className="mt-4" onClick={() => setShowForm(true)}>
                    Ajouter un événement
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{event.title}</h3>
                            {event.description && (
                              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              {event.time && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {event.time}
                                </div>
                              )}
                              {event.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={categoryColors[event.category]}>
                              {event.category}
                            </Badge>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteEvent(event.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
