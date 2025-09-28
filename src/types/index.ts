export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: Date;
  subject?: string;
}

export type Priority = 'high' | 'medium' | 'low';