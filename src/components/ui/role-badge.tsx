
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className }) => {
  const getRoleVariant = () => {
    switch (role) {
      case 'admin':
        return 'forest';
      case 'teacher':
        return 'amber';
      case 'student':
        return 'teal';
      case 'parent':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'teacher':
        return 'Teacher';
      case 'student':
        return 'Student';
      case 'parent':
        return 'Parent';
      default:
        return role;
    }
  };

  return (
    <Badge 
      variant={getRoleVariant()} 
      className={cn("capitalize", className)}
    >
      {getRoleLabel()}
    </Badge>
  );
};

export { RoleBadge };
