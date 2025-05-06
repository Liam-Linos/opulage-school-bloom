
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  GraduationCap,
  Settings,
  Briefcase,
  BookOpen,
  BarChart2,
  Heart
} from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  // Define navigation items based on user role
  const navigationItems = () => {
    // Default navigation for all roles
    const defaultNavigation = [
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
        name: 'Settings',
        href: '/settings',
        icon: <Settings className="h-5 w-5" />
      }
    ];

    switch (user.role) {
      case 'admin':
        return [
          ...defaultNavigation.slice(0, 1),
          {
            name: 'Students',
            href: '/students',
            icon: <Users className="h-5 w-5" />
          },
          {
            name: 'Analytics',
            href: '/academic',
            icon: <BarChart2 className="h-5 w-5" />
          },
          ...defaultNavigation.slice(1)
        ];
      case 'teacher':
        return [
          ...defaultNavigation.slice(0, 1),
          {
            name: 'Lessons',
            href: '/lessons',
            icon: <GraduationCap className="h-5 w-5" />
          },
          {
            name: 'Students',
            href: '/students',
            icon: <Users className="h-5 w-5" />
          },
          ...defaultNavigation.slice(1)
        ];
      case 'student':
        return [
          ...defaultNavigation.slice(0, 1),
          {
            name: 'Careers',
            href: '/careers',
            icon: <Briefcase className="h-5 w-5" />
          },
          {
            name: 'Academic',
            href: '/academic',
            icon: <BookOpen className="h-5 w-5" />
          },
          {
            name: 'Mentors',
            href: '/careers?tab=mentors',
            icon: <Heart className="h-5 w-5" />
          },
          ...defaultNavigation.slice(1, 2)
        ];
      case 'parent':
        return [
          ...defaultNavigation.slice(0, 1),
          {
            name: 'Children',
            href: '/students',
            icon: <Users className="h-5 w-5" />
          },
          {
            name: 'Academic',
            href: '/academic',
            icon: <BookOpen className="h-5 w-5" />
          },
          ...defaultNavigation.slice(1)
        ];
      default:
        return defaultNavigation;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t border-gray-200 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {navigationItems().map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50',
              location.pathname === item.href
                ? 'text-forest-600'
                : 'text-gray-500'
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
