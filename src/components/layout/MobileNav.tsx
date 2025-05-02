
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, BookOpen, BarChart2, MessageSquare, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => 
    item.allowedRoles.includes(user.role)
  );

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex justify-around items-center h-16">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          
          {/* Quick access nav items */}
          {filteredNavItems.slice(0, 4).map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="icon"
              className={cn(
                location.pathname === item.href
                  ? "text-forest-600"
                  : "text-gray-600"
              )}
              asChild
            >
              <Link to={item.href}>
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
        
        <SheetContent side="left" className="w-3/4 pt-12">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
          
          <div className="space-y-2 mt-4">
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
                onClick={() => setIsOpen(false)}
              >
                <Link to={item.href} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
