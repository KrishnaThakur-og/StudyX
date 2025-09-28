import React from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/ui/card';
import { CheckSquare, Calendar, BarChart3, Users, Target, BookOpen } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Create, organize, and track your tasks with deadlines and priorities.'
    },
    {
      icon: Calendar,
      title: 'Calendar & Timetable',
      description: 'Manage your schedule and create custom timetables for your classes.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your productivity and see detailed analytics of your progress.'
    },
    {
      icon: Target,
      title: 'Priority System',
      description: 'Organize tasks by priority levels to focus on what matters most.'
    }
  ];

  const team = [
    {
      name: 'Development Team',
      role: 'Full Stack Development',
      description: 'Building intuitive and powerful productivity tools for students.'
    },
    {
      name: 'Design Team',
      role: 'UX/UI Design',
      description: 'Creating beautiful and user-friendly interfaces.'
    },
    {
      name: 'Student Community',
      role: 'Feedback & Testing',
      description: 'Helping us understand what students really need.'
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold">About StudyX</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            StudyX is a comprehensive task management and productivity platform designed specifically for students.
            Our mission is to help students organize their academic life, track their progress, and achieve their goals.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="text-center">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              To empower students with the tools they need to stay organized, manage their time effectively, 
              and excel in their academic journey. We believe that with the right organization and planning, 
              every student can reach their full potential.
            </p>
          </div>
        </Card>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Email:</span> support@studyx.com
            </p>
            <p className="text-sm">
              <span className="font-medium">Community:</span> Join our Discord server for support and updates
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default About;