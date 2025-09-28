import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Clock, Users, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  assignedStudents: number;
  completedStudents: number;
  createdAt: Date;
}

const Assignments = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'React Components Assignment',
      description: 'Create a responsive dashboard using React components and Tailwind CSS',
      dueDate: new Date('2024-01-15'),
      assignedStudents: 25,
      completedStudents: 18,
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      title: 'Database Design Project',
      description: 'Design and implement a normalized database schema for an e-commerce platform',
      dueDate: new Date('2024-01-20'),
      assignedStudents: 25,
      completedStudents: 12,
      createdAt: new Date('2024-01-05')
    }
  ]);

  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedStudents: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setNewAssignment(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAssignment.title || !newAssignment.description || !newAssignment.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const assignment: Assignment = {
      id: Date.now().toString(),
      title: newAssignment.title,
      description: newAssignment.description,
      dueDate: new Date(newAssignment.dueDate),
      assignedStudents: parseInt(newAssignment.assignedStudents) || 0,
      completedStudents: 0,
      createdAt: new Date()
    };

    setAssignments(prev => [assignment, ...prev]);
    setNewAssignment({ title: '', description: '', dueDate: '', assignedStudents: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Assignment Created",
      description: `"${assignment.title}" has been successfully created.`
    });
  };

  const getCompletionRate = (assignment: Assignment) => {
    return assignment.assignedStudents > 0 
      ? Math.round((assignment.completedStudents / assignment.assignedStudents) * 100)
      : 0;
  };

  const getStatusBadge = (assignment: Assignment) => {
    const completionRate = getCompletionRate(assignment);
    const isOverdue = new Date() > assignment.dueDate;
    
    if (isOverdue) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <XCircle className="w-3 h-3" />
        Overdue
      </Badge>;
    }
    
    if (completionRate === 100) {
      return <Badge variant="default" className="flex items-center gap-1 bg-green-500 hover:bg-green-600">
        <CheckCircle2 className="w-3 h-3" />
        Complete
      </Badge>;
    }
    
    return <Badge variant="secondary" className="flex items-center gap-1">
      <Clock className="w-3 h-3" />
      In Progress
    </Badge>;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>
            <p className="text-muted-foreground">Manage and track student assignments</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new assignment.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter assignment title"
                    value={newAssignment.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter assignment description"
                    value={newAssignment.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedStudents">Number of Students</Label>
                  <Input
                    id="assignedStudents"
                    type="number"
                    placeholder="Enter number of students"
                    value={newAssignment.assignedStudents}
                    onChange={(e) => handleInputChange('assignedStudents', e.target.value)}
                    min="0"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Assignment</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {assignments.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No assignments yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first assignment to get started with tracking student progress.
              </p>
            </Card>
          ) : (
            assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{assignment.title}</CardTitle>
                      <CardDescription>{assignment.description}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(assignment)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Students: {assignment.assignedStudents}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed: {assignment.completedStudents}/{assignment.assignedStudents} ({getCompletionRate(assignment)}%)</span>
                    </div>
                  </div>
                  
                  {assignment.assignedStudents > 0 && (
                    <div className="mt-4">
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getCompletionRate(assignment)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Assignments;