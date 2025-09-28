import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Calendar, BarChart3, Info, LogOut, ClipboardList, UserPlus, LogIn } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { href: '/', icon: CheckSquare, label: "Task's", active: location.pathname === '/' },
    { href: '/calendar', icon: Calendar, label: 'Calendar', active: location.pathname === '/calendar' },
    { href: '/analytics', icon: BarChart3, label: 'Analytics', active: location.pathname === '/analytics' },
    { href: '/assignments', icon: ClipboardList, label: 'Assignments', active: location.pathname === '/assignments' },
    { href: '/student-dashboard', icon: CheckSquare, label: 'Student Dashboard', active: location.pathname === '/student-dashboard' },
    { href: '/about', icon: Info, label: 'About Us', active: location.pathname === '/about' },
  ];

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">StudyX</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg sidebar-item-hover ${
                  item.active 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-sidebar-foreground hover:text-primary'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Auth Section */}
      <div className="px-4 py-6 space-y-2 border-t border-border/50">
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg sidebar-item-hover text-sidebar-foreground hover:text-primary w-full"
        >
          <LogIn className="w-5 h-5" />
          <span className="font-medium">Sign In</span>
        </Link>
        <Link
          to="/signup"
          className="flex items-center gap-3 px-4 py-3 rounded-lg sidebar-item-hover text-sidebar-foreground hover:text-primary w-full"
        >
          <UserPlus className="w-5 h-5" />
          <span className="font-medium">Sign Up</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg sidebar-item-hover text-sidebar-foreground/60 hover:text-primary w-full opacity-50">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;