import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { Input } from '../components/ui/input';
import { Task } from '../types';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Bio Notes',
      description: 'The animal kingdom, also known as Kingdom Animalia, is a major biological classification that includes all animals. It is one of the five kingdoms of living organisms and is...',
      deadline: new Date('2025-01-25'),
      priority: 'medium',
      completed: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Complete notes before Submission date',
      description: 'Finish all remaining course notes and prepare them for submission.',
      deadline: new Date('2025-08-21'),
      priority: 'high',
      completed: false,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Revise the Chapter after completion once',
      description: 'Review and revise the completed chapter for better understanding.',
      deadline: new Date('2025-01-30'),
      priority: 'low',
      completed: false,
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setTasks([task, ...tasks]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search the Task...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-card"
            />
          </div>
        </div>

        {/* Task Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Tasks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchTerm ? 'No tasks found matching your search.' : 'No tasks yet. Add your first task above!'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;