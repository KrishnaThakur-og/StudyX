import React from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/ui/card';
import { BarChart3, CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';

const Analytics = () => {
  // Mock data - in a real app, this would come from your task state
  const stats = {
    totalTasks: 15,
    completedTasks: 8,
    pendingTasks: 5,
    overdueTasks: 2,
    completionRate: 53
  };

  const priorityBreakdown = {
    high: { total: 4, completed: 1 },
    medium: { total: 7, completed: 4 },
    low: { total: 4, completed: 3 }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-3xl font-bold text-primary">{stats.totalTasks}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-green-600">{stats.completedTasks}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingTasks}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-3xl font-bold text-red-600">{stats.overdueTasks}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </div>

        {/* Progress and Priority Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Completion Progress */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Completion Progress
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{stats.completionRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {stats.completedTasks} of {stats.totalTasks} tasks completed
              </div>
            </div>
          </Card>

          {/* Priority Breakdown */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Priority Breakdown</h2>
            <div className="space-y-4">
              {Object.entries(priorityBreakdown).map(([priority, data]) => (
                <div key={priority} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{priority} Priority</span>
                    <span className="text-sm text-muted-foreground">
                      {data.completed}/{data.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        priority === 'high' ? 'bg-priority-high' :
                        priority === 'medium' ? 'bg-priority-medium' : 'bg-priority-low'
                      }`}
                      style={{ width: `${(data.completed / data.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">This Week's Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Tasks Added</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">67%</p>
              <p className="text-sm text-muted-foreground">Productivity Score</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;