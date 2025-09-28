import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Task, Priority } from '../types';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<Date>();
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !deadline) return;

    onAddTask({
      title,
      description,
      deadline,
      priority,
      completed: false
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDeadline(undefined);
    setPriority('medium');
  };

  return (
    <Card className="p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" className="px-8">
            Add Task
          </Button>
        </div>

        <Textarea
          placeholder="Task Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] resize-none"
        />

        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, 'dd-MM-yyyy') : 'DD-MM-YYYY'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1">
            <div className="space-y-3">
              <label className="text-sm font-medium">Task Priority:</label>
              <div className="space-y-2">
                {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={priority === p}
                      onChange={(e) => setPriority(e.target.value as Priority)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="capitalize">{p}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;