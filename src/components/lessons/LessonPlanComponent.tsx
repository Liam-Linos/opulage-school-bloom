
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Clock } from 'lucide-react';

interface LessonPlanProps {
  lessonPlan: {
    title: string;
    subject: string;
    gradeLevel: string;
    duration: string;
    objectives: string[];
    materials: string[];
    activities: {
      title: string;
      duration: string;
      description: string;
    }[];
    assessment: string;
    extensions: string[];
    createdAt: string;
    description: string;
  };
}

const LessonPlanComponent: React.FC<LessonPlanProps> = ({ lessonPlan }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{lessonPlan.title}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-forest-100 text-forest-800 text-xs px-2 py-1 rounded">
            {lessonPlan.subject}
          </span>
          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
            Grade {lessonPlan.gradeLevel}
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {lessonPlan.duration}
          </span>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Learning Objectives</h3>
        <ul className="space-y-2">
          {lessonPlan.objectives.map((objective, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-forest-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Materials Needed</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          {lessonPlan.materials.map((material, index) => (
            <li key={index}>{material}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Lesson Activities</h3>
        <div className="space-y-4">
          {lessonPlan.activities.map((activity, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{index + 1}. {activity.title}</h4>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.duration}
                  </span>
                </div>
                <p className="text-sm">{activity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Assessment</h3>
        <p>{lessonPlan.assessment}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Extensions & Differentiation</h3>
        <ul className="space-y-2">
          {lessonPlan.extensions.map((extension, index) => (
            <li key={index} className="flex items-start">
              <span className="text-forest-500 mr-2">•</span>
              <span>{extension}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonPlanComponent;
