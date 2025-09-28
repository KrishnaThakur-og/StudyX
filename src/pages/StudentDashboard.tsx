import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, CheckCircle2, AlertCircle, BookOpen, TrendingUp, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentAssignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  submittedAt?: Date;
}

const StudentDashboard = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<StudentAssignment[]>([
    {
      id: '1',
      title: 'React Components Assignment',
      description: 'Create a responsive dashboard using React components and Tailwind CSS',
      dueDate: new Date('2024-01-15'),
      completed: true,
      submittedAt: new Date('2024-01-14')
    },
    {
      id: '2',
      title: 'Database Design Project',
      description: 'Design and implement a normalized database schema for an e-commerce platform',
      dueDate: new Date('2024-01-20'),
      completed: false
    },
    {
      id: '3',
      title: 'API Integration Task',
      description: 'Integrate third-party APIs into the existing application',
      dueDate: new Date('2024-01-25'),
      completed: false
    }
  ]);

  const handleMarkComplete = (assignmentId: string) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, completed: true, submittedAt: new Date() }
          : assignment
      )
    );
    
    toast({
      title: "Assignment Completed",
      description: "Great job! Your assignment has been marked as complete.",
    });
  };

  const getAssignmentStats = () => {
    const total = assignments.length;
    const completed = assignments.filter(a => a.completed).length;
    const pending = total - completed;
    const overdue = assignments.filter(a => !a.completed && new Date() > a.dueDate).length;
    
    return { total, completed, pending, overdue };
  };

  const stats = getAssignmentStats();

  const getStatusBadge = (assignment: StudentAssignment) => {
    if (assignment.completed) {
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Completed
      </Badge>;
    }
    
    const isOverdue = new Date() > assignment.dueDate;
    if (isOverdue) {
      return <Badge variant="destructive">
        <AlertCircle className="w-3 h-3 mr-1" />
        Overdue
      </Badge>;
    }
    
    return <Badge variant="secondary">
      <Clock className="w-3 h-3 mr-1" />
      Pending
    </Badge>;
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your assignments and academic progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.pending}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.overdue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Overall Progress
            </CardTitle>
            <CardDescription>Your assignment completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completion Rate</span>
                <span className="font-medium">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {stats.completed} out of {stats.total} assignments completed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Assignments Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Assignments</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {assignments.map((assignment) => (
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                      </div>
                      {assignment.submittedAt && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Submitted: {assignment.submittedAt.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {!assignment.completed && (
                      <Button 
                        onClick={() => handleMarkComplete(assignment.id)}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark as Complete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {assignments.filter(a => !a.completed).map((assignment) => (
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                    </div>
                    
                    <Button 
                      onClick={() => handleMarkComplete(assignment.id)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark as Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {assignments.filter(a => a.completed).map((assignment) => (
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
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                    </div>
                    {assignment.submittedAt && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 w-4" />
                        <span>Submitted: {assignment.submittedAt.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDashboard;