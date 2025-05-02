
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Announcement } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="border-l-4 border-l-forest-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{announcement.title}</CardTitle>
          <Badge className={getPriorityColor(announcement.priority)} variant="secondary">
            {announcement.priority}
          </Badge>
        </div>
        <CardDescription>
          {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{announcement.content}</p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
