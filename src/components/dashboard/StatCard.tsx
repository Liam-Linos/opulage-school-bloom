
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  change,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            {change && (
              <p className={cn(
                "text-xs font-medium mt-1",
                trend === 'up' && "text-green-600",
                trend === 'down' && "text-red-600",
                trend === 'neutral' && "text-amber-600"
              )}>
                {change}
              </p>
            )}
          </div>
          {icon && <div className="text-forest-500">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
