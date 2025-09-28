import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { CalendarEvent } from '../types';

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Mathematics',
      time: '09:00 - 10:30',
      date: new Date(),
      subject: 'Calculus'
    },
    {
      id: '2',
      title: 'Physics Lab',
      time: '11:00 - 12:30',
      date: new Date(),
      subject: 'Mechanics'
    },
    {
      id: '3',
      title: 'Chemistry',
      time: '14:00 - 15:30',
      date: new Date(),
      subject: 'Organic Chemistry'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    subject: ''
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.time) return;

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      time: newEvent.time,
      date: new Date(),
      subject: newEvent.subject
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', time: '', subject: '' });
    setShowAddForm(false);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Timetable & Calendar</h1>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </Button>
        </div>

        {/* Add Event Form */}
        {showAddForm && (
          <Card className="p-6 mb-8">
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  required
                />
                <Input
                  placeholder="Time (e.g., 09:00 - 10:30)"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  required
                />
                <Input
                  placeholder="Subject (optional)"
                  value={newEvent.subject}
                  onChange={(e) => setNewEvent({...newEvent, subject: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Add Event</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Weekly Timetable */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {daysOfWeek.map((day) => (
            <Card key={day} className="p-4">
              <h3 className="font-semibold text-lg mb-4 text-center border-b pb-2">
                {day}
              </h3>
              <div className="space-y-3">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg bg-primary/10 border-l-4 border-l-primary"
                  >
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </div>
                    {event.subject && (
                      <p className="text-xs text-muted-foreground mt-1">{event.subject}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Today's Events */}
        <Card className="mt-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg bg-card border task-card-shadow"
              >
                <h3 className="font-semibold">{event.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                {event.subject && (
                  <p className="text-sm text-muted-foreground mt-1">{event.subject}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Calendar;