
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, BookOpen, BarChart2, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  allowedRoles: string[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    allowedRoles: ['admin', 'teacher', 'student', 'parent'],
  },
  {
    title: 'Students',
    href: '/students',
    icon: Users,
    allowedRoles: ['admin', 'teacher'],
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: Calendar,
    allowedRoles: ['admin', 'teacher'],
  },
  {
    title: 'Academic',
    href: '/academic',
    icon: BookOpen,
    allowedRoles: ['admin', 'teacher', 'student', 'parent'],
  },
  {
    title: 'SDG Initiatives',
    href: '/sdg',
    icon: BarChart2,
    allowedRoles: ['admin', 'teacher', 'student', 'parent'],
  },
  {
    title: 'Messages',
    href: '/messages',
    icon: MessageSquare,
    allowedRoles: ['admin', 'teacher', 'student', 'parent'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    allowedRoles: ['admin', 'teacher', 'student', 'parent'],
  },
];

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => 
    item.allowedRoles.includes(user.role)
  );

  return (
    <aside className="w-64 h-[calc(100vh-64px)] overflow-y-auto bg-white border-r border-gray-200 hidden md:block">
      <nav className="p-4 space-y-2">
        {filteredNavItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start py-2 px-3",
              location.pathname === item.href
                ? "bg-forest-100 text-forest-700"
                : "hover:bg-forest-50 text-gray-700"
            )}
            asChild
          >
            <Link to={item.href} className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
