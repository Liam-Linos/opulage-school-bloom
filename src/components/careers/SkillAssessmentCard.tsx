
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface SkillAssessmentCardProps {
  assessment: {
    title: string;
    description: string;
    duration: string;
    icon: React.FC<{ className?: string }>;
    completed: boolean;
  };
}

const SkillAssessmentCard: React.FC<SkillAssessmentCardProps> = ({ assessment }) => {
  return (
    <div className={`p-4 rounded-lg border ${
      assessment.completed 
        ? 'border-forest-200 bg-forest-50' 
        : 'border-gray-200'
    }`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
          <assessment.icon className="h-5 w-5 text-forest-600" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium">{assessment.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{assessment.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="text-xs flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {assessment.duration}
            </div>
            
            <Button 
              size="sm" 
              variant={assessment.completed ? "outline" : "default"}
              className={assessment.completed 
                ? "border-forest-200 text-forest-700 hover:bg-forest-100" 
                : ""}
            >
              {assessment.completed ? "Retake" : "Start"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentCard;
