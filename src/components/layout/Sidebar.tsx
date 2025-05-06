
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BookOpen,
  BarChart2,
  MessageSquare,
  Settings,
  GraduationCap,
  Briefcase,
  Heart
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  // Define navigation items based on user role
  const navigationItems = () => {
    const commonItems = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />
      },
      {
        name: 'Messages',
        href: '/messages',
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        name: 'SDG Tracking',
        href: '/sdg',
        icon: <BarChart2 className="h-5 w-5" />
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: <Settings className="h-5 w-5" />
      }
    ];

    switch (user.role) {
      case 'admin':
        return [
          ...commonItems.slice(0, 1),
          {
            name: 'Students',
            href: '/students',
            icon: <Users className="h-5 w-5" />
          },
          {
            name: 'Attendance',
            href: '/attendance',
            icon: <CalendarDays className="h-5 w-5" />
          },
          {
            name: 'Academic',
            href: '/academic',
            icon: <BookOpen className="h-5 w-5" />
          },
          ...commonItems.slice(1)
        ];
      case 'teacher':
        return [
          ...commonItems.slice(0, 1),
          {
            name: 'AI Lesson Planning',
            href: '/lessons',
            icon: <GraduationCap className="h-5 w-5" />
          },
          {
            name: 'Students',
            href: '/students',
            icon: <Users className="h-5 w-5" />
          },
          {
            name: 'Attendance',
            href: '/attendance',
            icon: <CalendarDays className="h-5 w-5" />
          },
          {
            name: 'Academic',
            href: '/academic',
            icon: <BookOpen className="h-5 w-5" />
          },
          ...commonItems.slice(1)
        ];
      case 'student':
        return [
          ...commonItems.slice(0, 1),
          {
            name: 'Career Guidance',
            href: '/careers',
            icon: <Briefcase className="h-5 w-5" />
          },
          {
            name: 'Academic',
            href: '/academic',
            icon: <BookOpen className="h-5 w-5" />
          },
          {
            name: 'Attendance',
            href: '/attendance',
            icon: <CalendarDays className="h-5 w-5" />
          },
          {
            name: 'Find Mentors',
            href: '/careers?tab=mentors',
            icon: <Heart className="h-5 w-5" />
          },
          ...commonItems.slice(1)
        ];
      case 'parent':
        return [
          ...commonItems.slice(0, 1),
          {
            name: 'My Students',
            href: '/students',
            icon: <Users className="h-5 w-5" />
          },
          {
            name: 'Academic',
            href: '/academic',
            icon: <BookOpen className="h-5 w-5" />
          },
          {
            name: 'Attendance',
            href: '/attendance',
            icon: <CalendarDays className="h-5 w-5" />
          },
          ...commonItems.slice(1)
        ];
      default:
        return commonItems;
    }
  };

  return (
    <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 h-[calc(100vh-4rem)]">
      <div className="p-6">
        <div className="text-xl font-bold text-gray-800">Opulage Bridge</div>
        <div className="text-sm text-muted-foreground">
          {user.role === 'teacher' && 'Teacher Dashboard'}
          {user.role === 'student' && 'Student Portal'}
          {user.role === 'admin' && 'Admin Console'}
          {user.role === 'parent' && 'Parent Portal'}
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navigationItems().map((item, i) => (
            <li key={i}>
              <Link
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  location.pathname === item.href
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-forest-100 flex items-center justify-center mr-3">
            <span className="text-forest-600 font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
