import React from 'react';
import { format } from 'date-fns';
import { Task } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle, Calendar } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete }) => {
  const priorityColors = {
    high: 'bg-task-high border-l-4 border-l-priority-high',
    medium: 'bg-task-medium border-l-4 border-l-priority-medium',
    low: 'bg-task-low border-l-4 border-l-priority-low'
  };

  const priorityBadgeColors = {
    high: 'bg-priority-high text-white',
    medium: 'bg-priority-medium text-white',
    low: 'bg-priority-low text-white'
  };

  return (
    <Card className={`p-4 task-card-shadow transition-all duration-200 hover:shadow-lg ${priorityColors[task.priority]} ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-primary" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
        <Badge className={`${priorityBadgeColors[task.priority]} capitalize`}>
          {task.priority}
        </Badge>
      </div>

      <h3 className={`font-semibold text-lg mb-2 ${task.completed ? 'line-through' : ''}`}>
        {task.title}
      </h3>

      <p className="text-muted-foreground mb-4 text-sm">
        {task.description}
      </p>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>{format(task.deadline, 'dd-MM-yyyy')}</span>
      </div>
    </Card>
  );
};

export default TaskCard;