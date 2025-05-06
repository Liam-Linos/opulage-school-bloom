
import React from 'react';
import { Briefcase, LineChart, Book, GraduationCap, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface CareerMatchProps {
  career: {
    title: string;
    description: string;
    matchPercentage: number;
    icon: React.FC<{ className?: string }>;
    salary: string;
    growth: string;
    education: string[];
    skills: {
      name: string;
      level: number;
    }[];
    keySubjects: string[];
  };
}

const CareerMatchComponent: React.FC<CareerMatchProps> = ({ career }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          career.matchPercentage >= 90
            ? 'bg-green-100 text-green-600'
            : career.matchPercentage >= 80
              ? 'bg-forest-100 text-forest-600'
              : 'bg-amber-100 text-amber-600'
        }`}>
          <career.icon className="h-8 w-8" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold">{career.title}</h2>
          <div className="flex items-center gap-1 mt-1">
            <div className="text-sm font-medium">Match Score:</div>
            <Progress value={career.matchPercentage} className="h-2 w-24" />
            <div className="text-sm font-medium">{career.matchPercentage}%</div>
          </div>
        </div>
      </div>
      
      <p>{career.description}</p>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-forest-500" />
            Career Overview
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Average Salary</div>
              <div className="font-medium">{career.salary}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Growth Outlook</div>
              <div className="font-medium flex items-center">
                <LineChart className="h-4 w-4 mr-1 text-forest-500" />
                {career.growth}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Education Requirements</div>
              <ul className="space-y-1 mt-1">
                {career.education.map((edu, index) => (
                  <li key={index} className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1 text-forest-500" />
                    <span className="text-sm">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-forest-500" />
            Required Skills
          </h3>
          
          <div className="space-y-3">
            {career.skills.map((skill, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {skill.level < 33 ? 'Basic' : skill.level < 66 ? 'Intermediate' : 'Advanced'}
                  </span>
                </div>
                <Progress value={skill.level} className="h-1" />
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <div className="text-sm text-muted-foreground mb-2">Key Subjects</div>
            <div className="flex flex-wrap gap-2">
              {career.keySubjects.map((subject, index) => (
                <div key={index} className="bg-forest-50 text-forest-700 text-xs px-2 py-1 rounded flex items-center">
                  <Book className="h-3 w-3 mr-1" />
                  {subject}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMatchComponent;
